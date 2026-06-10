import { MousePointerClick, Shield, Layout, Smartphone, ExternalLink } from 'lucide-react'
import type { LandingPage } from '../../types/blueprint'

interface Props {
  landingPage: LandingPage
}

const SECTION_TYPE_COLORS: Record<string, string> = {
  benefits: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
  testimonials: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  faq: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
  stats: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  process: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
  guarantee: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
  default: 'bg-slate-700/30 border-slate-600/30 text-slate-400',
}

function getSectionColor(type: string) {
  const key = type.toLowerCase()
  return SECTION_TYPE_COLORS[key] ?? SECTION_TYPE_COLORS.default
}

export default function LandingPageTab({ landingPage }: Props) {
  const { hero, trustIndicators, sections, designNotes, mobileStrategy } = landingPage

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Hero section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <MousePointerClick className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-semibold text-white">Hero Section</h3>
          <span className="badge bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">Above the Fold</span>
        </div>
        <div className="card-inner p-5 space-y-4">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Headline</p>
            <p className="text-lg font-bold text-white leading-snug">{hero.headline}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Subheadline</p>
            <p className="text-slate-300 text-sm leading-relaxed">{hero.subheadline}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">CTA Button</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold">
                {hero.cta}
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Urgency Element</p>
              <p className="text-amber-300 text-sm font-medium">{hero.urgencyElement}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust indicators */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">Trust Indicators</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {trustIndicators.map((indicator, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              {indicator}
            </span>
          ))}
        </div>
      </div>

      {/* Page sections */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Layout className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-semibold text-white">Recommended Page Sections</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sections.map((section, i) => (
            <div key={i} className="card-inner p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`badge border ${getSectionColor(section.sectionType)}`}>
                  {section.sectionType}
                </span>
              </div>
              <p className="text-sm font-semibold text-white mb-1">{section.headline}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{section.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Design notes + mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card-inner p-4">
          <div className="flex items-center gap-2 mb-2">
            <Layout className="w-4 h-4 text-slate-400" />
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Design Notes</p>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">{designNotes}</p>
        </div>
        <div className="card-inner p-4">
          <div className="flex items-center gap-2 mb-2">
            <Smartphone className="w-4 h-4 text-slate-400" />
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Mobile Strategy</p>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">{mobileStrategy}</p>
        </div>
      </div>
    </div>
  )
}
