import {
  Sparkles, ArrowRight, FileText, Tag, GitBranch,
  Database, Scale, MousePointerClick, CheckCircle2, Zap
} from 'lucide-react'

interface Props {
  onStart: () => void
}

const BLUEPRINT_SECTIONS = [
  {
    icon: MousePointerClick,
    label: 'Landing Page',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10 border-indigo-500/20',
    dot: 'bg-indigo-400',
    description: 'Hero copy, trust indicators, page sections, CTA strategy, and mobile-first design notes.',
  },
  {
    icon: FileText,
    label: 'Form Flow',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    dot: 'bg-blue-400',
    description: 'Multi-step form architecture with field names, types, qualifying logic, and TCPA disclosure language.',
  },
  {
    icon: Tag,
    label: 'Attribution',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
    dot: 'bg-cyan-400',
    description: 'URL parameter schema, pixel strategy, offline conversion setup, and analytics configuration.',
  },
  {
    icon: GitBranch,
    label: 'Lead Routing',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    dot: 'bg-emerald-400',
    description: 'Distribution model, ping/post config, routing rules by priority, and qualification criteria.',
  },
  {
    icon: Database,
    label: 'CRM Mapping',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    dot: 'bg-amber-400',
    description: 'Field-by-field form-to-CRM mapping, data transformations, automation triggers, and lead scoring.',
  },
  {
    icon: Scale,
    label: 'Compliance',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10 border-rose-500/20',
    dot: 'bg-rose-400',
    description: 'TCPA consent language, required disclosures, state-specific requirements, and risk flags.',
  },
]

const STEPS = [
  {
    number: '01',
    headline: 'Describe Your Campaign',
    body: 'Select your industry, offer, primary traffic source, CRM platform, and lead buyer type. Add optional context like target states or volume goals.',
  },
  {
    number: '02',
    headline: 'Claude Architects Your Funnel',
    body: 'Our AI draws on deep lead gen domain knowledge — CRO best practices, TCPA regulations, CRM field standards, and attribution architecture — to build your blueprint.',
  },
  {
    number: '03',
    headline: 'Deploy With Confidence',
    body: 'Export the complete JSON blueprint or work through each section. Every recommendation is specific and actionable — not generic advice.',
  },
]

const STATS = [
  { value: '6', label: 'Blueprint Sections' },
  { value: '~30s', label: 'Generation Time' },
  { value: '20+', label: 'Industries Covered' },
  { value: '0', label: 'Guesswork' },
]

export default function LandingPage({ onStart }: Props) {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="text-center pt-8 pb-16 px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Powered by Claude Sonnet 4.6 · Structured AI Output
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
          Generate a{' '}
          <span className="gradient-text">Deployment-Ready</span>
          <br />Lead Funnel Blueprint
        </h2>

        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Describe your offer and goals. Claude analyzes your vertical, traffic source, and CRM
          to produce a complete campaign playbook — landing page copy, form logic, attribution
          setup, routing rules, CRM mapping, and TCPA compliance — in under a minute.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <button
            onClick={onStart}
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-base
              bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500
              text-white transition-all duration-200 shadow-lg shadow-indigo-900/40 active:scale-[0.99]"
          >
            <Sparkles className="w-4 h-4" />
            Generate Your Blueprint
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {STATS.map((stat) => (
            <div key={stat.label} className="card p-4 text-center">
              <div className="text-2xl font-extrabold gradient-text mb-1">{stat.value}</div>
              <div className="text-xs text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What's in the blueprint */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Everything in Your Blueprint
          </h3>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            Six sections covering the full lifecycle of a lead generation campaign.
            Specific, actionable, and ready to hand to your team.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BLUEPRINT_SECTIONS.map((section) => {
            const Icon = section.icon
            return (
              <div key={section.label} className={`card border ${section.bg} p-5 hover:scale-[1.02] transition-transform duration-200`}>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`w-8 h-8 rounded-lg ${section.bg} border flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${section.color}`} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${section.dot}`} />
                    <span className={`text-sm font-semibold ${section.color}`}>{section.label}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{section.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">How It Works</h3>
          <p className="text-slate-400 text-sm">Three inputs. One click. A complete campaign architecture.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative">
              <div className="card p-6">
                <div className="text-4xl font-black gradient-text mb-4 leading-none">{step.number}</div>
                <h4 className="text-base font-semibold text-white mb-2">{step.headline}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{step.body}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="hidden sm:flex absolute top-1/2 -right-3 z-10 -translate-y-1/2">
                  <ArrowRight className="w-5 h-5 text-slate-700" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Domain expertise callout */}
      <section className="py-8 px-4 max-w-4xl mx-auto">
        <div className="card p-6 sm:p-8 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border-indigo-500/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-white mb-2">
                Built on Real Lead Gen Domain Knowledge
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                The AI is grounded in actual industry expertise — TCPA one-to-one consent requirements,
                ping/post architecture, CRM field standards, Google/Meta offline conversion setup, and
                vertical-specific best practices across Home Services, Financial, Legal, and Insurance.
                Not generic marketing advice.
              </p>
              <div className="flex flex-wrap gap-2">
                {['FCC One-to-One Consent', 'Ping/Post Architecture', 'GCLID / FBCLID Tracking',
                  'Salesforce · HubSpot · LeadConduit', 'State-Level Compliance', 'CRO Best Practices'].map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                    <CheckCircle2 className="w-3 h-3 text-indigo-400" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 max-w-2xl mx-auto text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Ready to Build Your Funnel?
        </h3>
        <p className="text-slate-400 text-sm mb-8">
          Free to use. No account required. Generates in ~30 seconds.
        </p>
        <button
          onClick={onStart}
          className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-base
            bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500
            text-white transition-all duration-200 shadow-lg shadow-indigo-900/40 active:scale-[0.99]"
        >
          <Sparkles className="w-4 h-4" />
          Generate Your Blueprint
        </button>
      </section>
    </div>
  )
}
