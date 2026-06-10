import { Shield, Star, CheckCircle2 } from 'lucide-react'
import type { LandingPage } from '../types/blueprint'

interface Props {
  landingPage: LandingPage
  industry: string
  offer: string
}

const SECTION_BG: Record<string, string> = {
  benefits: 'bg-slate-900',
  testimonials: 'bg-indigo-950/50',
  stats: 'bg-emerald-950/30',
  faq: 'bg-slate-900',
  process: 'bg-blue-950/30',
  guarantee: 'bg-amber-950/30',
}

function getSectionBg(type: string) {
  return SECTION_BG[type.toLowerCase()] ?? 'bg-slate-900'
}

export default function PreviewLandingPage({ landingPage, industry }: Props) {
  const { hero, trustIndicators, sections } = landingPage

  return (
    <div className="animate-slide-up">
      {/* Browser chrome */}
      <div className="card overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border-b border-slate-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/70" />
            <div className="w-3 h-3 rounded-full bg-amber-500/70" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
          </div>
          <div className="flex-1 mx-2">
            <div className="bg-slate-900 rounded-md px-3 py-1 text-xs text-slate-400 font-mono truncate">
              https://your-domain.com/{industry.toLowerCase().replace(/\s+/g, '-')}
            </div>
          </div>
          <span className="text-xs text-slate-500 hidden sm:block">Preview</span>
        </div>

        {/* Page content */}
        <div className="overflow-y-auto max-h-[600px] bg-white text-slate-900">
          {/* Hero */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white px-8 py-12 text-center">
            {/* Trust bar */}
            <div className="flex flex-wrap gap-3 justify-center mb-6">
              {trustIndicators.slice(0, 3).map((ti, i) => (
                <span key={i} className="flex items-center gap-1.5 text-xs text-slate-300 bg-white/10 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {ti}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-3 max-w-2xl mx-auto">
              {hero.headline}
            </h1>
            <p className="text-slate-300 text-base max-w-xl mx-auto mb-6">
              {hero.subheadline}
            </p>

            {/* CTA */}
            <div className="flex flex-col items-center gap-2">
              <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold text-base rounded-xl shadow-lg hover:opacity-90 transition-opacity">
                {hero.cta}
              </button>
              <p className="text-amber-300 text-sm font-medium">{hero.urgencyElement}</p>
            </div>
          </div>

          {/* Trust row */}
          <div className="bg-slate-100 border-y border-slate-200 px-6 py-4">
            <div className="flex flex-wrap gap-4 justify-center">
              {trustIndicators.map((ti, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-700">
                  <Shield className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-medium">{ti}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Page sections */}
          {sections.map((section, i) => (
            <div key={i} className={`px-8 py-10 ${getSectionBg(section.sectionType)} ${
              section.sectionType.toLowerCase() === 'testimonials' ? 'text-white' : 'text-slate-800'
            }`}>
              {section.sectionType.toLowerCase() === 'testimonials' ? (
                <div className="text-center max-w-2xl mx-auto">
                  <div className="flex justify-center mb-3">
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">{section.headline}</h2>
                  <p className="text-slate-300 text-sm">{section.description}</p>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto">
                  <h2 className={`text-xl font-bold mb-3 ${
                    section.sectionType.toLowerCase() === 'testimonials' ? 'text-white' : 'text-slate-900'
                  }`}>
                    {section.headline}
                  </h2>
                  <p className={`text-sm leading-relaxed ${
                    section.sectionType.toLowerCase() === 'testimonials' ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {section.description}
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* CTA footer */}
          <div className="bg-slate-900 text-white px-8 py-10 text-center">
            <h2 className="text-xl font-bold mb-2">{hero.headline}</h2>
            <button className="mt-4 px-8 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold text-base rounded-xl">
              {hero.cta}
            </button>
          </div>
        </div>
      </div>

      <p className="text-xs text-center text-slate-500 mt-3">
        Live preview rendered from blueprint data — all copy and sections generated by Claude
      </p>
    </div>
  )
}
