import { useState } from 'react'
import { Zap } from 'lucide-react'
import FunnelForm from './components/FunnelForm'
import CampaignBlueprint from './components/CampaignBlueprint'
import LoadingBlueprint from './components/LoadingBlueprint'
import type { FunnelInputs, CampaignBlueprint as Blueprint } from './types/blueprint'

type AppStatus = 'idle' | 'loading' | 'success' | 'error'

export default function App() {
  const [status, setStatus] = useState<AppStatus>('idle')
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [lastInputs, setLastInputs] = useState<FunnelInputs | null>(null)

  async function handleGenerate(inputs: FunnelInputs) {
    setStatus('loading')
    setErrorMsg('')
    setLastInputs(inputs)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
        signal: AbortSignal.timeout(120_000),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || `Server error ${res.status}`)
      }

      const data: Blueprint = await res.json()
      setBlueprint(data)
      setStatus('success')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error occurred'
      setErrorMsg(msg)
      setStatus('error')
    }
  }

  function handleReset() {
    setStatus('idle')
    setBlueprint(null)
    setErrorMsg('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Header */}
      <header className="border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-white leading-none">
                AI Lead Funnel Architect
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">Powered by Claude Opus 4.8</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-full border border-slate-700/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Structured Output · Adaptive Thinking
            </span>
            {status === 'success' && (
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800"
              >
                New Blueprint
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero text — only shown on idle */}
        {status === 'idle' && (
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Generate a{' '}
              <span className="gradient-text">Deployment-Ready</span>
              <br />Campaign Blueprint
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto">
              Describe your offer and goals. Claude analyzes your vertical, traffic source, and CRM
              to produce a complete funnel playbook — landing page copy, form logic, attribution setup,
              routing rules, CRM mapping, and TCPA compliance guidance.
            </p>
          </div>
        )}

        {/* Main content */}
        {(status === 'idle' || status === 'error') && (
          <div className="animate-slide-up">
            <FunnelForm
              onGenerate={handleGenerate}
              isLoading={false}
              initialValues={lastInputs ?? undefined}
            />
            {status === 'error' && (
              <div className="mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
                <strong className="font-semibold">Error:</strong> {errorMsg}
              </div>
            )}
          </div>
        )}

        {status === 'loading' && <LoadingBlueprint />}

        {status === 'success' && blueprint && (
          <div className="animate-fade-in">
            <CampaignBlueprint blueprint={blueprint} inputs={lastInputs!} />
          </div>
        )}
      </main>
    </div>
  )
}
