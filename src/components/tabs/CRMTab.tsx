import { Database, Zap, Star, ArrowRight } from 'lucide-react'
import type { CRMMapping } from '../../types/blueprint'

interface Props {
  crmMapping: CRMMapping
}

const DATA_TYPE_COLORS: Record<string, string> = {
  string: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  phone: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  email: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
  number: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  integer: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  boolean: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
  date: 'bg-teal-500/10 border-teal-500/20 text-teal-400',
  picklist: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
  default: 'bg-slate-700/30 border-slate-600/30 text-slate-400',
}

function getDataTypeColor(type: string) {
  const key = type.toLowerCase().split(' ')[0]
  return DATA_TYPE_COLORS[key] ?? DATA_TYPE_COLORS.default
}

export default function CRMTab({ crmMapping }: Props) {
  const { integrationApproach, fields, automations, leadScoringCriteria } = crmMapping

  const requiredFields = fields.filter((f) => f.required)
  const optionalFields = fields.filter((f) => !f.required)

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Integration approach */}
      <div className="flex items-start gap-3 card-inner p-4">
        <Database className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Integration Approach</p>
          <p className="text-sm text-slate-300 leading-relaxed">{integrationApproach}</p>
        </div>
      </div>

      {/* Field mapping table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Field Mapping</h3>
          <div className="flex gap-2 text-xs">
            <span className="badge bg-rose-500/10 border border-rose-500/20 text-rose-400">
              {requiredFields.length} required
            </span>
            <span className="badge bg-slate-700/30 border border-slate-600/30 text-slate-400">
              {optionalFields.length} optional
            </span>
          </div>
        </div>

        {/* Header row */}
        <div className="grid grid-cols-12 gap-2 px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          <div className="col-span-3">Form Field</div>
          <div className="col-span-1 text-center"></div>
          <div className="col-span-3">CRM Field</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-3">Transformation</div>
        </div>

        <div className="space-y-1.5">
          {fields.map((field, i) => (
            <div
              key={i}
              className={`grid grid-cols-12 gap-2 items-center card-inner px-3 py-2.5 ${
                !field.required ? 'opacity-70' : ''
              }`}
            >
              <div className="col-span-3">
                <code className="text-xs text-slate-300 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800">
                  {field.formField}
                </code>
              </div>
              <div className="col-span-1 flex justify-center">
                <ArrowRight className="w-3 h-3 text-slate-600" />
              </div>
              <div className="col-span-3">
                <code className="text-xs text-amber-300 bg-amber-500/5 px-1.5 py-0.5 rounded border border-amber-500/10">
                  {field.crmField}
                </code>
              </div>
              <div className="col-span-2">
                <span className={`badge border text-xs ${getDataTypeColor(field.dataType)}`}>
                  {field.dataType}
                </span>
              </div>
              <div className="col-span-3">
                <p className="text-xs text-slate-500 truncate" title={field.transformation}>
                  {field.transformation || '—'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Automations */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-white">Automation Triggers</h3>
        </div>
        <div className="space-y-2">
          {automations.map((auto, i) => (
            <div key={i} className="flex gap-3 items-start card-inner px-4 py-2.5">
              <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-300">{auto}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Lead scoring */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-white">Lead Scoring Criteria</h3>
        </div>
        <div className="space-y-2">
          {leadScoringCriteria.map((criterion, i) => (
            <div key={i} className="flex gap-3 items-start card-inner px-4 py-2.5">
              <Star className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-300">{criterion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
