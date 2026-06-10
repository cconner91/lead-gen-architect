import { CheckCircle2, AlertCircle, ChevronRight, FileText } from 'lucide-react'
import type { FormFlow } from '../../types/blueprint'

interface Props {
  formFlow: FormFlow
}

const FIELD_TYPE_COLORS: Record<string, string> = {
  text: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  phone: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  email: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  select: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  number: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  zip: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  radio: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  checkbox: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  date: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  default: 'bg-slate-700/30 text-slate-400 border-slate-600/30',
}

function getFieldTypeColor(type: string) {
  return FIELD_TYPE_COLORS[type.toLowerCase()] ?? FIELD_TYPE_COLORS.default
}

export default function FormFlowTab({ formFlow }: Props) {
  const { totalSteps, strategy, steps, qualifyingLogic, tcpaDisclosure } = formFlow

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Strategy banner */}
      <div className="flex items-start gap-3 card-inner p-4">
        <FileText className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
            {totalSteps}-Step Form Strategy
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">{strategy}</p>
        </div>
      </div>

      {/* Form steps */}
      <div>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Form Step Breakdown
        </h3>
        <div className="space-y-4">
          {steps.map((step, stepIdx) => (
            <div key={step.stepNumber} className="card-inner overflow-hidden">
              {/* Step header */}
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/60 border-b border-slate-700/50">
                <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {step.stepNumber}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{step.headline}</p>
                  <p className="text-xs text-slate-500">{step.progressLabel}</p>
                </div>
                {stepIdx < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                )}
              </div>

              {/* Fields */}
              <div className="p-4 space-y-3">
                {step.fields.map((field, fi) => (
                  <div key={fi} className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800/50">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-sm font-medium text-white">{field.label}</span>
                        <span className={`badge border text-xs ${getFieldTypeColor(field.fieldType)}`}>
                          {field.fieldType}
                        </span>
                        {field.required ? (
                          <span className="badge bg-rose-500/10 border border-rose-500/20 text-rose-400">required</span>
                        ) : (
                          <span className="badge bg-slate-700/30 border border-slate-600/30 text-slate-500">optional</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-mono mb-1">name="{field.name}"</p>
                      <p className="text-xs text-slate-400">{field.purpose}</p>
                      {field.validations.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {field.validations.map((v, vi) => (
                            <span key={vi} className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-500 border border-slate-700/50">
                              {v}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Qualifying logic */}
      <div className="card-inner p-4">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <p className="text-sm font-semibold text-white">Qualifying Logic</p>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">{qualifyingLogic}</p>
      </div>

      {/* TCPA */}
      <div className="card-inner p-4 border-amber-500/20 bg-amber-500/5">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <p className="text-sm font-semibold text-amber-300">TCPA Consent Disclosure</p>
          <span className="badge bg-amber-500/10 border border-amber-500/20 text-amber-400">Appears on Final Step</span>
        </div>
        <p className="text-xs text-amber-200/70 leading-relaxed font-mono bg-slate-900/50 p-3 rounded-lg border border-amber-500/10">
          {tcpaDisclosure}
        </p>
      </div>
    </div>
  )
}
