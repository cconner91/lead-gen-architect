import express, { Request, Response } from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync } from 'fs'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const isProd = process.env.NODE_ENV === 'production'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distPath = join(__dirname, '..', 'dist')

// In dev, allow Vite origin; in prod, same-origin so no CORS needed
if (!isProd) {
  app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type'],
  }))
}

// Serve built React app in production
if (isProd && existsSync(distPath)) {
  app.use(express.static(distPath))
}
app.use(express.json({ limit: '1mb' }))

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('ERROR: ANTHROPIC_API_KEY is not set. Copy .env.example to .env and add your key.')
  process.exit(1)
}

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ─── System prompt: deep lead-gen domain knowledge ──────────────────────────
const SYSTEM_PROMPT = `You are a world-class lead generation architect with 15+ years of experience building high-converting lead funnels for performance marketing agencies, aggregators, and direct advertisers. You've helped generate millions of leads across Home Services, Financial Services, Legal, Insurance, and Healthcare verticals.

## YOUR EXPERTISE

### LANDING PAGE OPTIMIZATION (CRO)
- Above-the-fold design: value prop placement, hero image strategy, CTA positioning
- Headline frameworks: PAS (Problem-Agitate-Solution), AIDA, 4U's (Urgent, Unique, Useful, Ultra-specific)
- Trust signals: BBB rating, customer reviews, years in business, industry certifications, money-back guarantees
- Social proof: testimonials positioned above vs below fold, star ratings with review counts, case study callouts
- Page speed: < 3s load time critical for Quality Score and paid traffic conversion rates
- Mobile-first: 70%+ of paid search traffic is mobile; thumb-zone design, click-to-call CTAs critical

### MULTI-STEP FORM DESIGN
- Psychological commitment: start with easy, non-threatening questions to build foot-in-the-door commitment
- Progressive profiling: capture email/phone by step 2 to enable retargeting on abandonment
- Disqualifying questions: property ownership, income thresholds, service urgency, geographic eligibility
- Optimal step count: 3-5 steps for most verticals; more steps = higher quality, lower volume
- Form abandonment recovery: triggered email/SMS sequences on partial submission
- TCPA consent: final step only, above submit button, explicit named-company language required (post-Jan 2025 FCC ruling)

### ATTRIBUTION ARCHITECTURE
- Google Ads: gclid hidden field capture → store in cookie → pass with lead payload → offline conversion import via API
- Facebook/Meta: fbclid capture + Meta Conversion API (CAPI) for server-side event matching (requires hashed PII)
- TikTok: ttclid capture for view-through attribution
- UTM schema: utm_source / utm_medium / utm_campaign / utm_content / utm_term — store ALL in hidden fields
- Sub-ID / Publisher tracking: pub_id, creative_id, placement_id, keyword for affiliate/network traffic
- Server-side tracking: preferred over pixel-only due to ITP/ad blockers; match rate 85%+ vs 60% for pixel-only

### LEAD DISTRIBUTION
- Ping/Post architecture: PING sends minimal qualifying data (zip, state, age, property ownership) for real-time bidding; POST sends full lead to winning buyer(s)
- Exclusive leads: single buyer, CPL typically $50-$500 depending on vertical, 3-5x higher close rate than shared
- Shared leads: 2-5 buyers simultaneously, CPL $5-$75, requires speed-to-contact < 5 min to compete
- Geographic routing: state-level buyer availability maps, DNC list pre-screening, time-zone aware routing
- Cap management: daily/weekly/monthly hard caps per buyer, overflow waterfall routing to backup buyers
- Fraud prevention: IP reputation scoring, phone number validation (TCPA scrub), email syntax + domain check, duplicate suppression (24-72hr window)

### CRM INTEGRATION
- Salesforce: Lead object → FirstName, LastName, Phone, Email, LeadSource, State, PostalCode + custom fields; use Web-to-Lead or REST API
- HubSpot: Contact record with custom properties; use Forms API or Webhooks; map to deal pipeline for lifecycle tracking
- LeadConduit (ActiveProspect): real-time acceptance criteria, custom outcomes (Accept/Reject/Return), TrustedForm certificate delivery
- Velocify: auto-dialer ready, lead score field, round-robin or queue-based assignment; use HTTP POST with XML or JSON
- Total Expert: mortgage-specific; HMDA fields (purpose, loan type, property type); Loan Officer assignment automation
- Webhook delivery standard: HTTP POST, JSON or form-encoded, retry logic (3 attempts with exponential backoff at 30s/2min/10min)

### COMPLIANCE (2025 REQUIREMENTS)
- FCC One-to-One Consent (effective Jan 27, 2025): TCPA written consent must name each specific company — blanket "partner companies" language is no longer safe harbor
- CCPA/CPRA: California residents require right to opt-out of data sale/sharing; required "Do Not Sell or Share My Personal Information" link
- TCPA safe harbor requirements: prior express written consent, clear and conspicuous disclosure, not conditioned on purchase or service
- State-specific: Florida (FDUPTA), Illinois (BIPA for biometrics), Texas (TIPA), New York (SHIELD Act) — know your buyer's states
- Data retention: 7 years for financial services (RESPA/TILA), 3-5 years for most others; destruction policy required
- Lead return/dispute: maintain audit trail of consent — TrustedForm or Jornaya LeadiD for third-party verification

When generating a blueprint, be specific and deployment-ready. Reference actual CRM field names, include real TCPA language with named companies as placeholders, suggest specific form field names matching CRM standards, and give concrete routing logic. This will be handed directly to a lead generation team — not generic advice.`

// ─── JSON Schema (kept for reference, not sent to API) ───────────────────────
const _BLUEPRINT_SCHEMA_REF = {
  type: 'object',
  additionalProperties: false,
  required: [
    'campaignSummary', 'landingPage', 'formFlow',
    'attribution', 'routing', 'crmMapping', 'compliance',
    'keyInsights', 'estimatedMetrics',
  ],
  properties: {
    campaignSummary: {
      type: 'string',
      description: 'Executive summary of the recommended funnel strategy (3-4 sentences)',
    },
    landingPage: {
      type: 'object',
      additionalProperties: false,
      required: ['hero', 'trustIndicators', 'sections', 'designNotes', 'mobileStrategy'],
      properties: {
        hero: {
          type: 'object',
          additionalProperties: false,
          required: ['headline', 'subheadline', 'cta', 'urgencyElement'],
          properties: {
            headline: { type: 'string' },
            subheadline: { type: 'string' },
            cta: { type: 'string' },
            urgencyElement: { type: 'string' },
          },
        },
        trustIndicators: {
          type: 'array',
          items: { type: 'string' },
        },
        sections: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['sectionType', 'headline', 'description'],
            properties: {
              sectionType: { type: 'string' },
              headline: { type: 'string' },
              description: { type: 'string' },
            },
          },
        },
        designNotes: { type: 'string' },
        mobileStrategy: { type: 'string' },
      },
    },
    formFlow: {
      type: 'object',
      additionalProperties: false,
      required: ['totalSteps', 'strategy', 'steps', 'qualifyingLogic', 'tcpaDisclosure'],
      properties: {
        totalSteps: { type: 'integer' },
        strategy: { type: 'string' },
        steps: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['stepNumber', 'headline', 'progressLabel', 'fields'],
            properties: {
              stepNumber: { type: 'integer' },
              headline: { type: 'string' },
              progressLabel: { type: 'string' },
              fields: {
                type: 'array',
                items: {
                  type: 'object',
                  additionalProperties: false,
                  required: ['name', 'fieldType', 'label', 'required', 'purpose', 'validations'],
                  properties: {
                    name: { type: 'string' },
                    fieldType: { type: 'string' },
                    label: { type: 'string' },
                    required: { type: 'boolean' },
                    purpose: { type: 'string' },
                    validations: {
                      type: 'array',
                      items: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
        qualifyingLogic: { type: 'string' },
        tcpaDisclosure: { type: 'string' },
      },
    },
    attribution: {
      type: 'object',
      additionalProperties: false,
      required: ['parameters', 'pixelStrategy', 'offlineConversionStrategy', 'analyticsSetup'],
      properties: {
        parameters: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['name', 'description', 'example'],
            properties: {
              name: { type: 'string' },
              description: { type: 'string' },
              example: { type: 'string' },
            },
          },
        },
        pixelStrategy: { type: 'string' },
        offlineConversionStrategy: { type: 'string' },
        analyticsSetup: { type: 'string' },
      },
    },
    routing: {
      type: 'object',
      additionalProperties: false,
      required: ['distributionType', 'strategy', 'rules', 'qualificationCriteria', 'pingPostConfig'],
      properties: {
        distributionType: { type: 'string' },
        strategy: { type: 'string' },
        rules: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['condition', 'destination', 'priority', 'rationale'],
            properties: {
              condition: { type: 'string' },
              destination: { type: 'string' },
              priority: { type: 'integer' },
              rationale: { type: 'string' },
            },
          },
        },
        qualificationCriteria: {
          type: 'array',
          items: { type: 'string' },
        },
        pingPostConfig: { type: 'string' },
      },
    },
    crmMapping: {
      type: 'object',
      additionalProperties: false,
      required: ['integrationApproach', 'fields', 'automations', 'leadScoringCriteria'],
      properties: {
        integrationApproach: { type: 'string' },
        fields: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['formField', 'crmField', 'dataType', 'required', 'transformation'],
            properties: {
              formField: { type: 'string' },
              crmField: { type: 'string' },
              dataType: { type: 'string' },
              required: { type: 'boolean' },
              transformation: { type: 'string' },
            },
          },
        },
        automations: {
          type: 'array',
          items: { type: 'string' },
        },
        leadScoringCriteria: {
          type: 'array',
          items: { type: 'string' },
        },
      },
    },
    compliance: {
      type: 'object',
      additionalProperties: false,
      required: [
        'tcpaLanguage', 'requiredDisclosures', 'stateSpecificRequirements',
        'dataHandling', 'optOutMechanism', 'riskFlags',
      ],
      properties: {
        tcpaLanguage: { type: 'string' },
        requiredDisclosures: {
          type: 'array',
          items: { type: 'string' },
        },
        stateSpecificRequirements: {
          type: 'array',
          items: { type: 'string' },
        },
        dataHandling: { type: 'string' },
        optOutMechanism: { type: 'string' },
        riskFlags: {
          type: 'array',
          items: { type: 'string' },
        },
      },
    },
    keyInsights: {
      type: 'array',
      items: { type: 'string' },
    },
    estimatedMetrics: {
      type: 'object',
      additionalProperties: false,
      required: ['estimatedCVR', 'estimatedCPL', 'leadQualityTier', 'expectedVolume'],
      properties: {
        estimatedCVR: { type: 'string' },
        estimatedCPL: { type: 'string' },
        leadQualityTier: { type: 'string' },
        expectedVolume: { type: 'string' },
      },
    },
  },
}

// ─── Generate blueprint endpoint ─────────────────────────────────────────────
app.post('/api/generate', async (req: Request, res: Response) => {
  const { industry, offer, trafficSource, crm, leadBuyerType, targetState, additionalGoals } = req.body as {
    industry: string
    offer: string
    trafficSource: string
    crm: string
    leadBuyerType: string
    targetState?: string
    additionalGoals?: string
  }

  if (!industry || !offer || !trafficSource || !crm || !leadBuyerType) {
    return res.status(400).json({ error: 'Missing required fields: industry, offer, trafficSource, crm, leadBuyerType' })
  }

  const userPrompt = `Generate a complete, deployment-ready lead funnel blueprint for:

Industry/Vertical: ${industry}
Offer/Service: ${offer}
Primary Traffic Source: ${trafficSource}
CRM Platform: ${crm}
Lead Buyer Type: ${leadBuyerType}
${targetState ? `Target State(s): ${targetState}` : 'Geographic Target: National (all states)'}
${additionalGoals ? `Additional Goals/Context: ${additionalGoals}` : ''}

Be specific and actionable — reference real CRM field names, include actual TCPA language with "[Company Name]" as a placeholder, suggest concrete field names matching CRM standards, and give explicit routing logic. This is handed directly to a lead generation team to build from.

Respond with ONLY a valid JSON object matching this exact structure (no markdown, no explanation):
{
  "campaignSummary": "string",
  "landingPage": {
    "hero": { "headline": "string", "subheadline": "string", "cta": "string", "urgencyElement": "string" },
    "trustIndicators": ["string"],
    "sections": [{ "sectionType": "string", "headline": "string", "description": "string" }],
    "designNotes": "string",
    "mobileStrategy": "string"
  },
  "formFlow": {
    "totalSteps": 0,
    "strategy": "string",
    "steps": [{ "stepNumber": 0, "headline": "string", "progressLabel": "string", "fields": [{ "name": "string", "fieldType": "string", "label": "string", "required": true, "purpose": "string", "validations": ["string"] }] }],
    "qualifyingLogic": "string",
    "tcpaDisclosure": "string"
  },
  "attribution": {
    "parameters": [{ "name": "string", "description": "string", "example": "string" }],
    "pixelStrategy": "string",
    "offlineConversionStrategy": "string",
    "analyticsSetup": "string"
  },
  "routing": {
    "distributionType": "string",
    "strategy": "string",
    "rules": [{ "condition": "string", "destination": "string", "priority": 1, "rationale": "string" }],
    "qualificationCriteria": ["string"],
    "pingPostConfig": "string"
  },
  "crmMapping": {
    "integrationApproach": "string",
    "fields": [{ "formField": "string", "crmField": "string", "dataType": "string", "required": true, "transformation": "string" }],
    "automations": ["string"],
    "leadScoringCriteria": ["string"]
  },
  "compliance": {
    "tcpaLanguage": "string",
    "requiredDisclosures": ["string"],
    "stateSpecificRequirements": ["string"],
    "dataHandling": "string",
    "optOutMechanism": "string",
    "riskFlags": ["string"]
  },
  "keyInsights": ["string"],
  "estimatedMetrics": { "estimatedCVR": "string", "estimatedCPL": "string", "leadQualityTier": "string", "expectedVolume": "string" }
}`

  // SSE headers — keeps Railway's proxy from cutting the connection during generation
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders()

  const send = (event: string, data: unknown) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
  }

  // Heartbeat every 8s so Railway knows the connection is alive
  const heartbeat = setInterval(() => send('heartbeat', {}), 8000)

  try {
    const stream = anthropic.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 6000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    })

    const response = await stream.finalMessage()
    const textBlock = response.content.find((b) => b.type === 'text')

    if (!textBlock || textBlock.type !== 'text') {
      clearInterval(heartbeat)
      send('error', { error: 'No structured response generated from AI' })
      return res.end()
    }

    const raw = textBlock.text.trim().replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim()
    const blueprint = JSON.parse(raw)
    clearInterval(heartbeat)
    send('done', blueprint)
    res.end()
  } catch (err) {
    console.error('Blueprint generation error:', err)
    clearInterval(heartbeat)
    const message = err instanceof Error ? err.message : 'Failed to generate blueprint.'
    send('error', { error: message })
    res.end()
  }
})

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

// Catch-all: serve React app for any non-API route in production
if (isProd && existsSync(distPath)) {
  app.get('*', (_req, res) => {
    res.sendFile(join(distPath, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`\n🚀  Lead Gen Architect  →  http://localhost:${PORT}`)
  console.log(`    Health check: http://localhost:${PORT}/api/health\n`)
})
