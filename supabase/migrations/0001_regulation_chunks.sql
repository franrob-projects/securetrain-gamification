-- Regulation RAG: store Gibraltar regulation excerpts and their embeddings
-- Run this in the Supabase SQL Editor after enabling the pgvector extension.

-- 1. Enable pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Table
CREATE TABLE IF NOT EXISTS regulation_chunks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source          TEXT NOT NULL,           -- e.g. 'POCA 2015', 'GFSC DLT Principles'
  document_title  TEXT NOT NULL,           -- full title of the document
  section         TEXT,                    -- e.g. 'Section 28', 'Principle 7'
  content         TEXT NOT NULL,           -- the actual chunked text
  embedding       VECTOR(1536),            -- text-embedding-3-small dimensions
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Cosine similarity index
CREATE INDEX IF NOT EXISTS regulation_chunks_embedding_idx
  ON regulation_chunks
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- 4. Similarity search RPC — called from src/lib/retrieval.ts
CREATE OR REPLACE FUNCTION match_regulation_chunks(
  query_embedding VECTOR(1536),
  match_count     INT     DEFAULT 5,
  match_threshold FLOAT   DEFAULT 0.3
)
RETURNS TABLE (
  id              UUID,
  source          TEXT,
  document_title  TEXT,
  section         TEXT,
  content         TEXT,
  similarity      FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    rc.id,
    rc.source,
    rc.document_title,
    rc.section,
    rc.content,
    1 - (rc.embedding <=> query_embedding) AS similarity
  FROM regulation_chunks rc
  WHERE rc.embedding IS NOT NULL
    AND 1 - (rc.embedding <=> query_embedding) > match_threshold
  ORDER BY rc.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
