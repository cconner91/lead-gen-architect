import { useEffect, useState } from 'react'
import { Brain, Loader2 } from 'lucide-react'

const STATUS_MESSAGES = [
  'Analyzing your vertical and traffic source…',
  'Crafting high-converting headline variations…',
  'Architecting multi-step form sequence…',
  'Mapping attribution parameters…',
  'Designing lead routing and distribution rules…',
  'Mapping CRM fields and automations…',
  'Reviewing TCPA compliance requirements…',
  'Finalizing deployment-ready blueprint…',
]

const SECTIONS = [
  { label: 'Landing Page', color: 'bg-indigo-500' },
  { label: 'Form Flow', color: 'bg-blue-500' },
  { label: 'Attribution', color: 'bg-cyan-500' },
  { label: 'Lead Routing', color: 'bg-emerald-500' },
  { label: 'CRM Mapping', color: 'bg-amber-500' },
  { label: 'Compliance', color: 'bg-rose-500' },
]

export default function LoadingBlueprint() {
  const [msgIndex, setMsgIndex] = useState(0)
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % STATUS_MESSAGES.length)
    }, 3500)

    const sectionInterval = setInterval(() => {
      setActiveSection((i) => (i + 1) % SECTIONS.length)
    }, 4500)

    return () => {
      clearInterval(msgInterval)
      clearInterval(sectionInterval)
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Status card */}
      <div className="card p-8 mb-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
            <Brain className="w-5 h-5 text-indigo-400 animate-pulse" />
          </div>
          <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
        </div>

        <h3 className="text-lg font-semibold text-white mb-1">AI Architect at Work</h3>
        <p className="text-sm text-slate-400 mb-6 h-5 transition-all duration-500">
          {STATUS_MESSAGES[msgIndex]}
        </p>

        {/* Section progress pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {SECTIONS.map((section, i) => (
            <div
              key={section.label}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-700 ${
                i === activeSection
                  ? 'bg-slate-800 border-slate-600 text-white scale-105'
                  : i < activeSection
                  ? 'border-slate-800 text-slate-500'
                  : 'border-slate-800/50 text-slate-600'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${section.color} ${
                  i === activeSection ? 'animate-pulse' : i < activeSection ? 'opacity-40' : 'opacity-20'
                }`}
              />
              {section.label}
            </div>
          ))}
        </div>
      </div>

      {/* Skeleton cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { title: 'Landing Page Hero', lines: [80, 60, 40] },
          { title: 'Form Flow', lines: [70, 50, 70, 50] },
          { title: 'Attribution Parameters', lines: [90, 65, 90, 65] },
          { title: 'Routing Rules', lines: [75, 55, 80] },
          { title: 'CRM Field Mapping', lines: [85, 60, 85, 60] },
          { title: 'TCPA Compliance', lines: [70, 70, 50, 70] },
        ].map((skeleton) => (
          <div key={skeleton.title} className="card p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-sm shimmer-bg" />
              <div className="h-3.5 w-32 rounded shimmer-bg" />
            </div>
            <div className="space-y-2.5">
              {skeleton.lines.map((width, i) => (
                <div
                  key={i}
                  className="h-2.5 rounded shimmer-bg"
                  style={{ width: `${width}%` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-slate-500 mt-6">
        Claude is generating a complete, deployment-ready blueprint. This typically takes 20–40 seconds.
      </p>
    </div>
  )
}
