import { TrendingUp, Lightbulb, Target, DollarSign, Award, BarChart2 } from 'lucide-react'
import type { CampaignBlueprint } from '../../types/blueprint'

interface Props {
  blueprint: CampaignBlueprint
}

const metricConfig = [
  { key: 'estimatedCVR', label: 'Est. Conversion Rate', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  { key: 'estimatedCPL', label: 'Est. Cost Per Lead', icon: DollarSign, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  { key: 'leadQualityTier', label: 'Lead Quality Tier', icon: Award, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
  { key: 'expectedVolume', label: 'Expected Volume', icon: BarChart2, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
] as const

export default function OverviewTab({ blueprint }: Props) {
  const { campaignSummary, estimatedMetrics, keyInsights } = blueprint

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Summary */}
      <div className="card-inner p-5">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-semibold text-white">Campaign Summary</h3>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">{campaignSummary}</p>
      </div>

      {/* Metrics */}
      <div>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Estimated Performance Metrics
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {metricConfig.map(({ key, label, icon: Icon, color, bg }) => (
            <div key={key} className={`border rounded-xl p-4 ${bg}`}>
              <Icon className={`w-4 h-4 ${color} mb-2`} />
              <div className={`text-lg font-bold ${color} mb-0.5`}>
                {estimatedMetrics[key]}
              </div>
              <div className="text-xs text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Insights */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-white">Key Strategic Insights</h3>
        </div>
        <div className="space-y-2.5">
          {keyInsights.map((insight, i) => (
            <div key={i} className="flex gap-3 card-inner px-4 py-3">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-slate-300 leading-relaxed">{insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
