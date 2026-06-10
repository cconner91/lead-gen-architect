export interface FunnelInputs {
  industry: string
  offer: string
  trafficSource: string
  crm: string
  leadBuyerType: string
  targetState: string
  additionalGoals: string
}

export interface HeroSection {
  headline: string
  subheadline: string
  cta: string
  urgencyElement: string
}

export interface PageSection {
  sectionType: string
  headline: string
  description: string
}

export interface LandingPage {
  hero: HeroSection
  trustIndicators: string[]
  sections: PageSection[]
  designNotes: string
  mobileStrategy: string
}

export interface FormField {
  name: string
  fieldType: string
  label: string
  required: boolean
  purpose: string
  validations: string[]
}

export interface FormStep {
  stepNumber: number
  headline: string
  progressLabel: string
  fields: FormField[]
}

export interface FormFlow {
  totalSteps: number
  strategy: string
  steps: FormStep[]
  qualifyingLogic: string
  tcpaDisclosure: string
}

export interface AttributionParameter {
  name: string
  description: string
  example: string
}

export interface Attribution {
  parameters: AttributionParameter[]
  pixelStrategy: string
  offlineConversionStrategy: string
  analyticsSetup: string
}

export interface RoutingRule {
  condition: string
  destination: string
  priority: number
  rationale: string
}

export interface Routing {
  distributionType: string
  strategy: string
  rules: RoutingRule[]
  qualificationCriteria: string[]
  pingPostConfig: string
}

export interface CRMField {
  formField: string
  crmField: string
  dataType: string
  required: boolean
  transformation: string
}

export interface CRMMapping {
  integrationApproach: string
  fields: CRMField[]
  automations: string[]
  leadScoringCriteria: string[]
}

export interface Compliance {
  tcpaLanguage: string
  requiredDisclosures: string[]
  stateSpecificRequirements: string[]
  dataHandling: string
  optOutMechanism: string
  riskFlags: string[]
}

export interface EstimatedMetrics {
  estimatedCVR: string
  estimatedCPL: string
  leadQualityTier: string
  expectedVolume: string
}

export interface CampaignBlueprint {
  campaignSummary: string
  landingPage: LandingPage
  formFlow: FormFlow
  attribution: Attribution
  routing: Routing
  crmMapping: CRMMapping
  compliance: Compliance
  keyInsights: string[]
  estimatedMetrics: EstimatedMetrics
}
