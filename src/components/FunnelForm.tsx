import { useState } from 'react'
import { Sparkles, ChevronDown } from 'lucide-react'
import type { FunnelInputs } from '../types/blueprint'

const INDUSTRIES = [
  'Roofing', 'HVAC', 'Solar Energy', 'Plumbing', 'Windows & Doors', 'Electrical',
  'Pest Control', 'Painting', 'Flooring', 'Home Security',
  'Mortgage / Refinance', 'Debt Settlement', 'Personal Loans', 'Tax Relief',
  'Auto Insurance', 'Life Insurance', 'Health Insurance', 'Medicare / ACA',
  'Personal Injury', 'Mass Tort', 'Social Security Disability',
  'Moving Services', 'Senior Living', 'Addiction Treatment',
]

const TRAFFIC_SOURCES = [
  'Google Ads (Search)', 'Google Ads (Display / PMax)', 'Facebook / Meta Ads',
  'TikTok Ads', 'YouTube Ads', 'Native Ads (Taboola / Outbrain)',
  'Email Marketing', 'Direct Mail', 'Affiliate / Publisher Network',
  'TV / Radio (OTT)', 'SEO / Organic',
]

const CRM_OPTIONS = [
  'Salesforce', 'HubSpot', 'LeadConduit (ActiveProspect)',
  'Velocify', 'Total Expert', 'ActiveCampaign',
  'Zoho CRM', 'Pipedrive', 'Custom Webhook / API',
]

const LEAD_BUYER_TYPES = [
  'Internal Call Center / Sales Team',
  'Ping / Post Aggregator Network',
  'Exclusive Lead Buyers',
  'Shared Lead Buyers (2-5x)',
  'Affiliate Network Resale',
  'Direct Advertiser (Single Buyer)',
]

interface Props {
  onGenerate: (inputs: FunnelInputs) => void
  isLoading: boolean
  initialValues?: FunnelInputs
}

const DEFAULT_FORM: FunnelInputs = {
  industry: '',
  offer: '',
  trafficSource: '',
  crm: '',
  leadBuyerType: '',
  targetState: '',
  additionalGoals: '',
}

function SelectField({
  label, name, value, onChange, options, required,
}: {
  label: string
  name: keyof FunnelInputs
  value: string
  onChange: (name: keyof FunnelInputs, value: string) => void
  options: string[]
  required?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-300">
        {label}
        {required && <span className="text-indigo-400 ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          required={required}
          className="w-full appearance-none bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white
            focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500
            hover:border-slate-600 transition-colors cursor-pointer
            [&>option]:bg-slate-800"
        >
          <option value="" disabled>Select {label.toLowerCase()}…</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
    </div>
  )
}

export default function FunnelForm({ onGenerate, isLoading, initialValues }: Props) {
  const [form, setForm] = useState<FunnelInputs>(initialValues ?? DEFAULT_FORM)

  function handleChange(name: keyof FunnelInputs, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onGenerate(form)
  }

  const isValid = form.industry && form.offer.trim() && form.trafficSource && form.crm && form.leadBuyerType

  return (
    <form onSubmit={handleSubmit} className="card p-6 sm:p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">Campaign Inputs</h3>
        <p className="text-sm text-slate-400 mt-1">
          Five inputs. One click. A complete funnel blueprint tailored to your vertical.
        </p>
      </div>

      {/* Required fields grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <SelectField
          label="Industry / Vertical"
          name="industry"
          value={form.industry}
          onChange={handleChange}
          options={INDUSTRIES}
          required
        />

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-300">
            Offer / Service <span className="text-indigo-400">*</span>
          </label>
          <input
            type="text"
            value={form.offer}
            onChange={(e) => handleChange('offer', e.target.value)}
            placeholder="e.g. Free roof inspection + estimate"
            required
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white
              placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60
              focus:border-indigo-500 hover:border-slate-600 transition-colors"
          />
        </div>

        <SelectField
          label="Primary Traffic Source"
          name="trafficSource"
          value={form.trafficSource}
          onChange={handleChange}
          options={TRAFFIC_SOURCES}
          required
        />

        <SelectField
          label="CRM Platform"
          name="crm"
          value={form.crm}
          onChange={handleChange}
          options={CRM_OPTIONS}
          required
        />

        <SelectField
          label="Lead Buyer Type"
          name="leadBuyerType"
          value={form.leadBuyerType}
          onChange={handleChange}
          options={LEAD_BUYER_TYPES}
          required
        />

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-300">
            Target State(s)
            <span className="text-slate-500 text-xs font-normal ml-1.5">optional</span>
          </label>
          <input
            type="text"
            value={form.targetState}
            onChange={(e) => handleChange('targetState', e.target.value)}
            placeholder="e.g. FL, TX, CA or National"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white
              placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60
              focus:border-indigo-500 hover:border-slate-600 transition-colors"
          />
        </div>
      </div>

      {/* Additional goals */}
      <div className="space-y-1.5 mb-6">
        <label className="block text-sm font-medium text-slate-300">
          Additional Goals or Context
          <span className="text-slate-500 text-xs font-normal ml-1.5">optional</span>
        </label>
        <textarea
          value={form.additionalGoals}
          onChange={(e) => handleChange('additionalGoals', e.target.value)}
          placeholder="e.g. Focus on high-intent homeowners, target $150 CPL, need 200 leads/week, emphasize speed-to-contact…"
          rows={3}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white
            placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60
            focus:border-indigo-500 hover:border-slate-600 transition-colors resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid || isLoading}
        className="w-full flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm
          bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500
          text-white transition-all duration-200 shadow-lg shadow-indigo-900/40
          disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
          active:scale-[0.99]"
      >
        <Sparkles className="w-4 h-4" />
        Generate Campaign Blueprint
      </button>

      <p className="text-center text-xs text-slate-500 mt-3">
        Generates landing page copy, form flow, attribution setup, routing rules, CRM mapping &amp; compliance guidance.
        Takes ~20–40 seconds.
      </p>
    </form>
  )
}
