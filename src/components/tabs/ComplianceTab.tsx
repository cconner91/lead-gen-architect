import { Scale, AlertTriangle, MapPin, Database, LogOut, FileText } from 'lucide-react'
import type { Compliance } from '../../types/blueprint'

interface Props {
  compliance: Compliance
}

export default function ComplianceTab({ compliance }: Props) {
  const {
    tcpaLanguage,
    requiredDisclosures,
    stateSpecificRequirements,
    dataHandling,
    optOutMechanism,
    riskFlags,
  } = compliance

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Risk flags banner — shown only if there are flags */}
      {riskFlags.length > 0 && (
        <div className="card-inner p-4 bg-rose-500/5 border-rose-500/20">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <h3 className="text-sm font-semibold text-rose-300">Risk Flags</h3>
          </div>
          <div className="space-y-2">
            {riskFlags.map((flag, i) => (
              <div key={i} className="flex gap-3 items-start">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-rose-200/80">{flag}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TCPA Language */}
      <div className="card-inner p-5">
        <div className="flex items-center gap-2 mb-3">
          <Scale className="w-4 h-4 text-rose-400" />
          <h3 className="text-sm font-semibold text-white">TCPA Consent Language</h3>
          <span className="badge bg-rose-500/10 border border-rose-500/20 text-rose-400">One-to-One Required</span>
        </div>
        <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-4">
          <p className="text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-wrap">{tcpaLanguage}</p>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Per FCC ruling effective Jan 27, 2025 — consent must name each advertiser individually. Replace [Company Name] with actual buyer name(s).
        </p>
      </div>

      {/* Required disclosures */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-white">Required Disclosures</h3>
        </div>
        <div className="space-y-2">
          {requiredDisclosures.map((disclosure, i) => (
            <div key={i} className="flex gap-3 items-start card-inner px-4 py-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-slate-300">{disclosure}</p>
            </div>
          ))}
        </div>
      </div>

      {/* State-specific */}
      {stateSpecificRequirements.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-white">State-Specific Requirements</h3>
          </div>
          <div className="space-y-2">
            {stateSpecificRequirements.map((req, i) => (
              <div key={i} className="flex gap-3 items-start card-inner px-4 py-2.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">{req}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data handling + opt-out */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card-inner p-4">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-4 h-4 text-slate-400" />
            <p className="text-sm font-semibold text-white">Data Handling Policy</p>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">{dataHandling}</p>
        </div>
        <div className="card-inner p-4">
          <div className="flex items-center gap-2 mb-2">
            <LogOut className="w-4 h-4 text-slate-400" />
            <p className="text-sm font-semibold text-white">Opt-Out Mechanism</p>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">{optOutMechanism}</p>
        </div>
      </div>
    </div>
  )
}
