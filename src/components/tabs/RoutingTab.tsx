import { GitBranch, CheckCircle2, Settings, ArrowRight } from 'lucide-react'
import type { Routing } from '../../types/blueprint'

interface Props {
  routing: Routing
}

const PRIORITY_COLORS: Record<number, string> = {
  1: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
  2: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  3: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
}

function getPriorityColor(priority: number) {
  return PRIORITY_COLORS[priority] ?? 'bg-slate-700/30 border-slate-600/30 text-slate-400'
}

export default function RoutingTab({ routing }: Props) {
  const { distributionType, strategy, rules, qualificationCriteria, pingPostConfig } = routing

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Distribution type banner */}
      <div className="flex items-start gap-3 card-inner p-4">
        <GitBranch className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-white">Distribution Model</span>
            <span className="badge bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              {distributionType}
            </span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">{strategy}</p>
        </div>
      </div>

      {/* Routing rules */}
      <div>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Routing Rules (by Priority)
        </h3>
        <div className="space-y-3">
          {[...rules].sort((a, b) => a.priority - b.priority).map((rule, i) => (
            <div key={i} className="card-inner p-4">
              <div className="flex items-start gap-3">
                <span className={`badge border flex-shrink-0 ${getPriorityColor(rule.priority)}`}>
                  P{rule.priority}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <code className="text-xs bg-slate-900 px-2 py-1 rounded border border-slate-700 text-slate-300 truncate">
                        {rule.condition}
                      </code>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                      <span className="text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded truncate">
                        {rule.destination}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">{rule.rationale}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Qualification criteria */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">Lead Qualification Criteria</h3>
        </div>
        <div className="space-y-2">
          {qualificationCriteria.map((criterion, i) => (
            <div key={i} className="flex gap-3 items-start card-inner px-4 py-2.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-300">{criterion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ping/post config */}
      <div className="card-inner p-5">
        <div className="flex items-center gap-2 mb-3">
          <Settings className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-semibold text-white">Ping / Post Configuration</h3>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">{pingPostConfig}</p>
      </div>
    </div>
  )
}
