// Seed regulation chunks for the RAG system.
// These are paraphrased summaries with accurate references to real Gibraltar
// regulation. Replace or supplement with verbatim text from official sources
// before relying on this in production.

export interface RegulationChunk {
  source:         string
  document_title: string
  section:        string | null
  content:        string
}

export const REGULATION_SEED: RegulationChunk[] = [
  // ─── POCA 2015 ─────────────────────────────────────────────────────────
  {
    source:         'POCA 2015',
    document_title: 'Proceeds of Crime Act 2015 (Gibraltar)',
    section:        'Section 7 — Concealing',
    content:
      'A person commits an offence under section 7 of the Proceeds of Crime Act 2015 if they conceal, disguise, convert, transfer, or remove from Gibraltar criminal property. The offence is one of the three principal money laundering offences and carries a maximum penalty of 14 years imprisonment on indictment. The mens rea requires knowledge or suspicion that the property constitutes a person\'s benefit from criminal conduct.',
  },
  {
    source:         'POCA 2015',
    document_title: 'Proceeds of Crime Act 2015 (Gibraltar)',
    section:        'Section 8 — Arrangements',
    content:
      'Section 8 of POCA 2015 makes it an offence to enter into or become concerned in an arrangement which a person knows or suspects facilitates the acquisition, retention, use, or control of criminal property by or on behalf of another person. This is the offence most commonly engaged where a regulated firm processes a transaction on behalf of a customer whose funds may derive from criminal conduct.',
  },
  {
    source:         'POCA 2015',
    document_title: 'Proceeds of Crime Act 2015 (Gibraltar)',
    section:        'Section 9 — Acquisition, use and possession',
    content:
      'Under section 9 of POCA 2015 it is an offence for a person to acquire, use, or have possession of criminal property. This is the third of the three principal money laundering offences and is most relevant where a firm or individual takes ownership or control of property that they know or suspect derives from criminal conduct.',
  },
  {
    source:         'POCA 2015',
    document_title: 'Proceeds of Crime Act 2015 (Gibraltar)',
    section:        'Section 28 — Nominated officer and reporting obligations',
    content:
      'Section 28 of POCA 2015 requires a relevant business to nominate an officer (the Money Laundering Reporting Officer, MLRO) to receive internal disclosures. The nominated officer is responsible for determining whether information received gives rise to knowledge or suspicion of money laundering and, if so, for making an authorised disclosure to the Gibraltar Financial Intelligence Unit (GFIU). Subsection (4) places personal responsibility on the nominated officer for ensuring relevant employees receive appropriate training on the identification of money laundering and on the firm\'s reporting procedures.',
  },
  {
    source:         'POCA 2015',
    document_title: 'Proceeds of Crime Act 2015 (Gibraltar)',
    section:        'Section 35 — Failure to disclose',
    content:
      'Section 35 of POCA 2015 creates an offence of failure to disclose where a person in the regulated sector knows, suspects, or has reasonable grounds for knowing or suspecting that another person is engaged in money laundering, but fails to make the required disclosure to a nominated officer or to the GFIU as soon as practicable. The offence carries a maximum penalty of 5 years imprisonment.',
  },
  {
    source:         'POCA 2015',
    document_title: 'Proceeds of Crime Act 2015 (Gibraltar)',
    section:        'Section 37 — Tipping off',
    content:
      'Section 37 of POCA 2015 makes it an offence to disclose information to a third party which is likely to prejudice an investigation into money laundering, where the disclosing person knows or suspects that an authorised disclosure has been made to a nominated officer or to the GFIU. The tipping-off offence applies regardless of intent and is one of the most operationally significant restrictions for front-line staff in regulated firms.',
  },

  // ─── GFSC DLT Regulatory Principles ────────────────────────────────────
  {
    source:         'GFSC DLT Regulatory Principles',
    document_title: 'GFSC DLT Provider Regulations 2020 — Regulatory Principles',
    section:        'Principle 1 — Honesty and integrity',
    content:
      'A DLT provider must conduct its business with honesty and integrity. This principle applies to all dealings with customers, counterparties, and the GFSC, and underpins the firm\'s licence to operate as a DLT provider in Gibraltar.',
  },
  {
    source:         'GFSC DLT Regulatory Principles',
    document_title: 'GFSC DLT Provider Regulations 2020 — Regulatory Principles',
    section:        'Principle 2 — Customer care',
    content:
      'A DLT provider must pay due regard to the interests of its customers and treat them fairly. This includes providing clear and accurate information about the products and services offered, and ensuring complaints are handled in a timely and effective manner.',
  },
  {
    source:         'GFSC DLT Regulatory Principles',
    document_title: 'GFSC DLT Provider Regulations 2020 — Regulatory Principles',
    section:        'Principle 7 — Systems and security',
    content:
      'A DLT provider must maintain effective systems and controls to ensure compliance with all applicable laws and regulations and to protect the integrity, confidentiality, and availability of data and assets under its control. This includes both technical infrastructure and the human resources required to operate that infrastructure safely. Staff must be trained to a competence standard appropriate to their role, and the firm must be able to demonstrate this competence to the GFSC on request. Human error remains the leading cause of security incidents in DLT firms; training is therefore treated as a control in its own right.',
  },
  {
    source:         'GFSC DLT Regulatory Principles',
    document_title: 'GFSC DLT Provider Regulations 2020 — Regulatory Principles',
    section:        'Principle 8 — Financial crime',
    content:
      'A DLT provider must have systems in place to prevent, detect, and disclose financial crime risks such as money laundering and terrorist financing. The firm must apply a risk-based approach proportionate to the nature, scale, and complexity of its business, and must ensure that staff in customer-facing and high-risk roles receive ongoing training on money laundering typologies relevant to crypto-asset businesses, including those published by the FATF.',
  },
  {
    source:         'GFSC DLT Regulatory Principles',
    document_title: 'GFSC DLT Provider Regulations 2020 — Regulatory Principles',
    section:        'Principle 9 — Resilience',
    content:
      'A DLT provider must be financially and operationally resilient. This includes maintaining adequate capital and liquidity, and having business continuity arrangements in place to deal with operational disruptions, including cyber incidents and key person dependencies.',
  },

  // ─── GFSC AML/CFT Guidance Notes ───────────────────────────────────────
  {
    source:         'GFSC AML/CFT Guidance Notes',
    document_title: 'GFSC AML/CFT Guidance Notes (7th edition)',
    section:        'Chapter 6 — Training',
    content:
      'Chapter 6 of the GFSC AML/CFT Guidance Notes elaborates on the training requirements set out in section 28 of POCA 2015. Adequate training must cover the nature of money laundering and terrorist financing, the firm\'s specific risk factors, the internal SAR reporting process including tipping-off restrictions under section 37, and must be refreshed at intervals of no longer than 12 months for staff in customer-facing or high-risk roles. The Guidance Notes specify that completion records alone do not satisfy the adequacy standard — there must also be a means of verifying comprehension.',
  },
  {
    source:         'GFSC AML/CFT Guidance Notes',
    document_title: 'GFSC AML/CFT Guidance Notes (7th edition)',
    section:        'Chapter 4 — Customer Due Diligence',
    content:
      'Standard customer due diligence (CDD) requires firms to identify the customer and verify their identity using reliable, independent source documents. Where the customer is a legal person, the firm must also identify the beneficial owner. Enhanced due diligence (EDD) is required where the customer is established in a higher-risk third country, is a politically exposed person (PEP), or where the firm has identified a higher money laundering risk.',
  },

  // ─── Gibraltar Gambling Act 2025 & Commissioner Codes ─────────────────
  {
    source:         'Gibraltar Gambling Act 2025',
    document_title: 'Gibraltar Gambling Act 2025',
    section:        'Section 42 — Staff training',
    content:
      'Section 42 of the Gibraltar Gambling Act 2025 introduces a statutory duty for licensed operators to ensure that all staff who interact with customers, handle complaints, or have access to player account data are trained to a defined competence standard. Training must be completed on appointment and refreshed at intervals of no more than 12 months. A designated director must sign off the firm\'s annual training plan and attest to its adequacy in the annual compliance return to the Gibraltar Gambling Commissioner.',
  },
  {
    source:         'Gibraltar Gambling Commissioner',
    document_title: 'Social Responsibility Codes of Practice (Gibraltar)',
    section:        'Player protection and self-exclusion',
    content:
      'Operators must have effective procedures for identifying customers exhibiting at-risk gambling behaviour, applying interventions where appropriate, and implementing self-exclusion requests. Self-exclusion must be honoured for the period requested, with a minimum of 6 months, and the operator must take all reasonable steps to ensure that excluded customers are unable to re-register or access their accounts during the exclusion period. Records of all interventions and self-exclusions must be maintained and produced to the Commissioner on request.',
  },
  {
    source:         'Gibraltar Gambling Commissioner',
    document_title: 'Social Responsibility Codes of Practice (Gibraltar)',
    section:        'Affordability and source of funds',
    content:
      'Operators must conduct affordability assessments and source of funds verification at customer activity levels prescribed by the Commissioner. Where a customer\'s activity exceeds the relevant threshold, the operator must obtain and verify documentary evidence of the source of funds before permitting further deposits. Failure to apply affordability checks at the prescribed thresholds is treated as a material breach of the operator\'s licence conditions.',
  },

  // ─── Data Protection ───────────────────────────────────────────────────
  {
    source:         'Gibraltar Data Protection Act',
    document_title: 'Data Protection Act 2004 (as amended) and UK GDPR (as applied in Gibraltar)',
    section:        'Lawful bases for processing',
    content:
      'Personal data may only be processed where one of the lawful bases under Article 6 of the UK GDPR (as applied in Gibraltar) is satisfied. The lawful bases are: consent, contract, legal obligation, vital interests, public task, and legitimate interests. Special category data (including health, biometric, and political opinion data) requires an additional condition under Article 9. The data controller must document the lawful basis relied upon and provide it to the data subject in the privacy notice.',
  },
  {
    source:         'Gibraltar Data Protection Act',
    document_title: 'Data Protection Act 2004 (as amended) and UK GDPR (as applied in Gibraltar)',
    section:        'Personal data breach notification',
    content:
      'A personal data breach which is likely to result in a risk to the rights and freedoms of natural persons must be notified to the Gibraltar Regulatory Authority (GRA) without undue delay and, where feasible, not later than 72 hours after the controller becomes aware of it. Where the breach is likely to result in a high risk, the affected data subjects must also be notified directly. Records of all breaches, regardless of whether they are notifiable, must be maintained.',
  },
]
