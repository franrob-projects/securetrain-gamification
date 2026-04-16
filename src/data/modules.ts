import { Sector } from '@/types'

export interface TrainingModule {
  id: string
  title: string
  description: string
  sector: Sector | 'both'
  threatLevel: 'low' | 'medium' | 'high' | 'critical'
  topics: string[]
  durationMins: number
  status: 'available' | 'completed' | 'locked'
}

export const MODULES: TrainingModule[] = [
  {
    id: 'aml-financial-crime',
    title: 'AML & Financial Crime Prevention',
    description: 'Comprehensive anti-money laundering training covering Gibraltar\'s POCA 2015 regime, the three-step SAR reporting process to the GFIU, tipping-off restrictions, and money laundering offences under Gibraltar statute.',
    sector: 'both',
    threatLevel: 'critical',
    topics: [
      'POCA 2015: the three principal money laundering offences',
      'SAR reporting process to the GFIU',
      'Tipping-off restrictions and when they apply',
      'Risk-based approach to AML controls',
      'Red flags and suspicious activity indicators',
    ],
    durationMins: 15,
    status: 'available',
  },
  {
    id: 'dlt-regulatory-principles',
    title: 'DLT Regulatory Principles',
    description: 'Tailored for GFSC DLT licence holders. Covers all nine DLT Regulatory Principles, the DLT Provider Regulations 2020, token classification, VASP Travel Rule obligations, and GFSC supervisory expectations.',
    sector: 'crypto',
    threatLevel: 'critical',
    topics: [
      'All nine DLT Regulatory Principles',
      'DLT Provider Regulations 2020',
      'Token classification: security vs utility vs e-money',
      'VASP Travel Rule obligations',
      'GFSC supervisory expectations and reporting',
    ],
    durationMins: 20,
    status: 'available',
  },
  {
    id: 'responsible-gambling',
    title: 'Responsible Gambling & Social Responsibility',
    description: 'Mapped to the Gibraltar Gambling Commissioner\'s Social Responsibility Codes of Practice. Covers player protection, self-exclusion, affordability obligations, and responsible advertising under the Gambling Act 2005.',
    sector: 'gambling',
    threatLevel: 'high',
    topics: [
      'Social Responsibility Codes of Practice',
      'Player protection and harm minimisation',
      'Self-exclusion: implementation and record-keeping',
      'Affordability checks and source of funds',
      'Responsible advertising standards',
    ],
    durationMins: 12,
    status: 'available',
  },
  {
    id: 'senior-manager-responsibilities',
    title: 'Senior Manager & Director Responsibilities',
    description: 'Personal accountability frameworks for those exercising senior management functions. Covers the fit and proper test, governance obligations, board-level risk oversight, material change notifications, and SMF regime duties.',
    sector: 'both',
    threatLevel: 'high',
    topics: [
      'The GFSC fit and proper three-part test',
      'Senior Management Functions (SMF) regime',
      'Board-level risk oversight obligations',
      'Material change notifications to the GFSC',
      'Personal liability and regulatory accountability',
    ],
    durationMins: 12,
    status: 'available',
  },
  {
    id: 'sanctions-poca',
    title: 'Sanctions Screening & POCA Compliance',
    description: 'Practical training on HM Treasury financial sanctions, OFSI obligations, and Gibraltar-specific POCA 2015 requirements. Includes designation evasion typologies, screening programme design, and handling suspected breaches.',
    sector: 'both',
    threatLevel: 'critical',
    topics: [
      'HM Treasury financial sanctions and OFSI obligations',
      'Gibraltar POCA 2015 sanctions provisions',
      'Designation evasion typologies',
      'Designing an effective screening programme',
      'Handling and reporting suspected sanctions breaches',
    ],
    durationMins: 12,
    status: 'available',
  },
  {
    id: 'market-integrity',
    title: 'Market Integrity & Market Abuse',
    description: 'Insider dealing and market manipulation obligations for firms dealing in financial instruments and DLT tokens. Mapped to GFSC market conduct guidance and EU MAR equivalents applicable in Gibraltar.',
    sector: 'crypto',
    threatLevel: 'high',
    topics: [
      'Insider dealing: definition and prohibitions',
      'Market manipulation in token markets',
      'GFSC market conduct guidance',
      'EU MAR equivalents in Gibraltar',
      'Suspicious transaction reporting (STORs)',
    ],
    durationMins: 10,
    status: 'available',
  },
  {
    id: 'kyc-cdd',
    title: 'KYC & Customer Due Diligence',
    description: 'In-depth training on CDD, enhanced due diligence, and simplified due diligence under Gibraltar\'s AML/CFT framework. Covers beneficial ownership, PEP screening, ongoing monitoring, and higher-risk jurisdictions.',
    sector: 'both',
    threatLevel: 'high',
    topics: [
      'Standard, simplified, and enhanced CDD',
      'Beneficial ownership verification',
      'PEP and adverse media screening',
      'Ongoing monitoring obligations',
      'Higher-risk jurisdictions and source of wealth',
    ],
    durationMins: 15,
    status: 'available',
  },
  {
    id: 'data-protection-gdpr',
    title: 'Data Protection & GDPR',
    description: 'Covers Gibraltar\'s Data Protection Act 2004 (as amended) and its relationship to UK GDPR post-2020. Key topics include lawful processing bases, data subject rights, personal data breach notification to the GRA, and DPO obligations.',
    sector: 'both',
    threatLevel: 'medium',
    topics: [
      'Gibraltar Data Protection Act 2004 and UK GDPR',
      'Lawful bases for processing personal data',
      'Data subject rights in practice',
      'Personal data breach notification to the GRA',
      'DPO obligations and data protection by design',
    ],
    durationMins: 10,
    status: 'available',
  },
]
