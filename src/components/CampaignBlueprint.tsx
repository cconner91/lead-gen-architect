import { useState } from 'react'
import { Download, Copy, Check, Monitor } from 'lucide-react'
import type { CampaignBlueprint as Blueprint, FunnelInputs } from '../types/blueprint'
import OverviewTab from './tabs/OverviewTab'
import LandingPageTab from './tabs/LandingPageTab'
import FormFlowTab from './tabs/FormFlowTab'
import AttributionTab from './tabs/AttributionTab'
import RoutingTab from './tabs/RoutingTab'
import CRMTab from './tabs/CRMTab'
import ComplianceTab from './tabs/ComplianceTab'
import LinkTrackingTab from './tabs/LinkTrackingTab'
import PreviewLandingPage from './PreviewLandingPage'

interface Props {
  blueprint: Blueprint
  inputs: FunnelInputs
}

const TABS = [
  { id: 'overview', label: 'Overview', color: 'text-indigo-400 border-indigo-400', dot: 'bg-indigo-400' },
  { id: 'landing', label: 'Landing Page', color: 'text-indigo-400 border-indigo-400', dot: 'bg-indigo-400' },
  { id: 'form', label: 'Form Flow', color: 'text-blue-400 border-blue-400', dot: 'bg-blue-400' },
  { id: 'attribution', label: 'Attribution', color: 'text-cyan-400 border-cyan-400', dot: 'bg-cyan-400' },
  { id: 'routing', label: 'Routing', color: 'text-emerald-400 border-emerald-400', dot: 'bg-emerald-400' },
  { id: 'crm', label: 'CRM Mapping', color: 'text-amber-400 border-amber-400', dot: 'bg-amber-400' },
  { id: 'compliance', label: 'Compliance', color: 'text-rose-400 border-rose-400', dot: 'bg-rose-400' },
  { id: 'linktracking', label: 'Link Tracking', color: 'text-teal-400 border-teal-400', dot: 'bg-teal-400' },
  { id: 'preview', label: 'Page Preview', color: 'text-purple-400 border-purple-400', dot: 'bg-purple-400' },
] as const

type TabId = typeof TABS[number]['id']

export default function CampaignBlueprint({ blueprint, inputs }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>('overview')
  const [copied, setCopied] = useState(false)

  function handleCopyJSON() {
    navigator.clipboard.writeText(JSON.stringify(blueprint, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleExportJSON() {
    const blob = new Blob([JSON.stringify(blueprint, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `blueprint-${inputs.industry.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const activeTabConfig = TABS.find((t) => t.id === activeTab)!

  return (
    <div className="max-w-5xl mx-auto">
      {/* Blueprint header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Campaign Blueprint</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            {inputs.industry} · {inputs.trafficSource} · {inputs.crm}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopyJSON}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm text-slate-300
              bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600
              transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy JSON'}
          </button>
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm text-slate-300
              bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600
              transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="card mb-6 overflow-x-auto">
        <div className="flex min-w-max">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3.5 text-sm font-medium whitespace-nowrap transition-all duration-150
                  border-b-2 ${
                    isActive
                      ? `${tab.color} bg-slate-800/60`
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 border-transparent'
                  }`}
              >
                {tab.id === 'preview' ? (
                  <Monitor className="w-3.5 h-3.5" />
                ) : (
                  <span className={`w-2 h-2 rounded-full ${isActive ? tab.dot : 'bg-slate-600'}`} />
                )}
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="card p-6">
        {activeTab !== 'overview' && activeTab !== 'preview' && (
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800">
            <span className={`w-2.5 h-2.5 rounded-full ${activeTabConfig.dot}`} />
            <h3 className={`text-base font-semibold ${activeTabConfig.color}`}>
              {activeTabConfig.label}
            </h3>
          </div>
        )}

        {activeTab === 'overview' && <OverviewTab blueprint={blueprint} />}
        {activeTab === 'landing' && <LandingPageTab landingPage={blueprint.landingPage} />}
        {activeTab === 'form' && <FormFlowTab formFlow={blueprint.formFlow} />}
        {activeTab === 'attribution' && <AttributionTab attribution={blueprint.attribution} />}
        {activeTab === 'routing' && <RoutingTab routing={blueprint.routing} />}
        {activeTab === 'crm' && <CRMTab crmMapping={blueprint.crmMapping} />}
        {activeTab === 'compliance' && <ComplianceTab compliance={blueprint.compliance} />}
        {activeTab === 'linktracking' && blueprint.linkTracking && (
          <LinkTrackingTab linkTracking={blueprint.linkTracking} />
        )}
        {activeTab === 'preview' && (
          <PreviewLandingPage
            landingPage={blueprint.landingPage}
            industry={inputs.industry}
            offer={inputs.offer}
          />
        )}
      </div>
    </div>
  )
}
