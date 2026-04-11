export function LoomEmbed({
  videoId,
  title = 'Product walkthrough',
}: {
  videoId: string
  title?: string
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        position: 'relative',
        paddingTop: '56.25%', // 16:9
        background: 'var(--card)',
        border: '1px solid var(--card-border)',
      }}
    >
      <iframe
        src={`https://www.loom.com/embed/${videoId}?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true`}
        title={title}
        loading="lazy"
        allow="fullscreen; clipboard-write"
        allowFullScreen
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 0,
        }}
      />
    </div>
  )
}
