import { Link, Send, Code2, Zap, CheckCircle2 } from 'lucide-react'
import type { LinkTracking } from '../../types/blueprint'

interface Props {
  linkTracking: LinkTracking
}

export default function LinkTrackingTab({ linkTracking }: Props) {
  const { platform, trackingLinkStructure, clickParameters, postbackUrl, apiPosting, conversionEvents, integrationNotes } = linkTracking

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Platform + Tracking Link Structure */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card-inner p-5">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-teal-400" />
            <h3 className="text-sm font-semibold text-white">Tracking Platform</h3>
          </div>
          <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-300 text-sm font-medium">
            {platform}
          </span>
        </div>

        <div className="card-inner p-5">
          <div className="flex items-center gap-2 mb-3">
            <Link className="w-4 h-4 text-teal-400" />
            <h3 className="text-sm font-semibold text-white">Tracking Link Structure</h3>
          </div>
          <code className="block text-xs bg-slate-900 rounded border border-slate-700 p-3 text-teal-300 break-all leading-relaxed font-mono">
            {trackingLinkStructure}
          </code>
        </div>
      </div>

      {/* Click Parameters */}
      {clickParameters && clickParameters.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-4 h-4 text-teal-400" />
            <h3 className="text-sm font-semibold text-white">Click Parameters</h3>
            <span className="badge bg-teal-500/10 border border-teal-500/20 text-teal-400">
              {clickParameters.length} params
            </span>
          </div>
          <div className="space-y-2">
            {clickParameters.map((param, i) => (
              <div key={i} className="card-inner p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-shrink-0">
                  <span className="badge border font-mono text-xs bg-teal-500/10 border-teal-500/20 text-teal-300">
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
      )}

      {/* Postback URL */}
      <div className="card-inner p-5">
        <div className="flex items-center gap-2 mb-3">
          <Send className="w-4 h-4 text-violet-400" />
          <h3 className="text-sm font-semibold text-white">Postback URL (S2S)</h3>
        </div>
        <code className="block text-xs bg-slate-900 rounded border border-slate-700 p-3 text-violet-300 break-all leading-relaxed font-mono mb-3">
          {postbackUrl}
        </code>
        <p className="text-xs text-slate-500 leading-relaxed">
          Fire this server-side on lead acceptance. Passes click_id and payout back to the publisher's tracking platform for real-time reporting.
        </p>
      </div>

      {/* API Posting */}
      <div className="card-inner p-5">
        <div className="flex items-center gap-2 mb-3">
          <Code2 className="w-4 h-4 text-violet-400" />
          <h3 className="text-sm font-semibold text-white">API Lead Posting</h3>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">{apiPosting}</p>
      </div>

      {/* Conversion Events */}
      {conversionEvents && conversionEvents.length > 0 && (
        <div className="card-inner p-5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            <h3 className="text-sm font-semibold text-white">Conversion Events to Track</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {conversionEvents.map((event, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                {event}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Integration Notes */}
      {integrationNotes && (
        <div className="card-inner p-5">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-slate-400" />
            <h3 className="text-sm font-semibold text-white">Integration Notes</h3>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">{integrationNotes}</p>
        </div>
      )}
    </div>
  )
}
