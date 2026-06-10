import { Tag, Radio, RefreshCw, BarChart2 } from 'lucide-react'
import type { Attribution } from '../../types/blueprint'

interface Props {
  attribution: Attribution
}

const PARAM_COLORS: Record<string, string> = {
  gclid: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
  fbclid: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300',
  ttclid: 'bg-rose-500/10 border-rose-500/20 text-rose-300',
  msclkid: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300',
  utm_source: 'bg-purple-500/10 border-purple-500/20 text-purple-300',
  utm_medium: 'bg-purple-500/10 border-purple-500/20 text-purple-300',
  utm_campaign: 'bg-purple-500/10 border-purple-500/20 text-purple-300',
  utm_content: 'bg-purple-500/10 border-purple-500/20 text-purple-300',
  utm_term: 'bg-purple-500/10 border-purple-500/20 text-purple-300',
  default: 'bg-slate-700/30 border-slate-600/30 text-slate-300',
}

function getParamColor(name: string) {
  return PARAM_COLORS[name.toLowerCase()] ?? PARAM_COLORS.default
}

export default function AttributionTab({ attribution }: Props) {
  const { parameters, pixelStrategy, offlineConversionStrategy, analyticsSetup } = attribution

  return (
    <div className="space-y-6 animate-slide-up">
      {/* URL Parameters */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">URL Tracking Parameters</h3>
          <span className="badge bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            {parameters.length} params
          </span>
        </div>
        <div className="space-y-2">
          {parameters.map((param, i) => (
            <div key={i} className="card-inner p-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-shrink-0">
                <span className={`badge border font-mono text-xs ${getParamColor(param.name)}`}>
                  {param.name}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-300">{param.description}</p>
              </div>
              <div className="flex-shrink-0">
                <code className="text-xs bg-slate-900 px-2 py-1 rounded border border-slate-700 text-slate-400">
                  {param.example}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Three detail cards */}
      <div className="grid grid-cols-1 gap-4">
        <div className="card-inner p-5">
          <div className="flex items-center gap-2 mb-3">
            <Radio className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white">Pixel & Server-Side Strategy</h3>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">{pixelStrategy}</p>
        </div>

        <div className="card-inner p-5">
          <div className="flex items-center gap-2 mb-3">
            <RefreshCw className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Offline Conversion Strategy</h3>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">{offlineConversionStrategy}</p>
        </div>

        <div className="card-inner p-5">
          <div className="flex items-center gap-2 mb-3">
            <BarChart2 className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-semibold text-white">Analytics Setup</h3>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">{analyticsSetup}</p>
        </div>
      </div>
    </div>
  )
}
