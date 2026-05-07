'use client'

import { useState } from 'react'
import { AdminLocale, adminCopy } from '@/lib/admin-locale'

const statusColor: Record<string, string> = {
  NEW: 'bg-red-500/10 border-red-500/20 text-red-400',
  READ: 'bg-brand-500/10 border-brand-500/20 text-brand-400',
  REPLIED: 'bg-green-500/10 border-green-500/20 text-green-400',
  CLOSED: 'bg-white/5 border-white/10 text-white/30',
}

export default function LeadsList({ leads, locale }: { leads: any[]; locale: AdminLocale }) {
  const copy = adminCopy[locale].leads
  const [selected, setSelected] = useState<any | null>(null)
  const [updating, setUpdating] = useState(false)

  async function updateStatus(id: string, status: string) {
    setUpdating(true)
    await fetch(`/api/admin/leads/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (selected?.id === id) setSelected({ ...selected, status })
    setUpdating(false)
    window.location.reload()
  }

  if (leads.length === 0) {
    return (
      <div className="py-20 text-center text-white/30">
        <p className="text-lg">{copy.emptyTitle}</p>
        <p className="mt-2 text-sm">{copy.emptyBody}</p>
      </div>
    )
  }

  return (
    <div className="flex gap-6">
      <div className="flex-1 overflow-hidden rounded-xl border border-white/5 bg-navy-800">
        {leads.map((lead, i) => (
          <div
            key={lead.id}
            onClick={() => setSelected(lead)}
            className={`cursor-pointer border-b border-white/5 px-5 py-4 transition-colors last:border-b-0 ${selected?.id === lead.id ? 'bg-brand-500/10' : 'hover:bg-white/2'} ${i === leads.length - 1 ? 'border-b-0' : ''}`}
          >
            <div className="mb-1 flex items-center justify-between">
              <p className="text-sm font-500 text-white">{lead.name}</p>
              <span className={`rounded-md border px-2 py-0.5 text-xs ${statusColor[lead.status]}`}>
                {copy.statuses[lead.status as keyof typeof copy.statuses]}
              </span>
            </div>
            <p className="text-xs text-white/40">{lead.email}</p>
            <p className="mt-1 text-xs text-white/30">
              {new Date(lead.createdAt).toLocaleDateString(locale === 'en' ? 'en-US' : 'vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        ))}
      </div>

      {selected ? (
        <div className="sticky top-8 w-96 self-start rounded-xl border border-white/5 bg-navy-800 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display font-600 text-white">{selected.name}</h2>
            <button onClick={() => setSelected(null)} className="text-white/30 transition-colors hover:text-white">x</button>
          </div>

          <div className="mb-6 space-y-3">
            {[
              { label: 'Email', value: selected.email },
              { label: copy.fields.phone, value: selected.phone ?? '-' },
              { label: copy.fields.company, value: selected.company ?? '-' },
              { label: copy.fields.serviceType, value: selected.serviceType ?? '-' },
            ].map((item) => (
              <div key={item.label}>
                <p className="mb-1 text-xs text-white/30">{item.label}</p>
                <p className="text-sm text-white">{item.value}</p>
              </div>
            ))}
            <div>
              <p className="mb-1 text-xs text-white/30">{copy.fields.message}</p>
              <p className="rounded-lg bg-navy-700 p-3 text-sm leading-relaxed text-white/70">{selected.message}</p>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs text-white/30">{copy.fields.status}</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(copy.statuses).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => updateStatus(selected.id, key)}
                  disabled={updating || selected.status === key}
                  className={`rounded-lg border px-3 py-2 text-xs transition-colors disabled:opacity-50 ${
                    selected.status === key
                      ? statusColor[key]
                      : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-96 items-center justify-center rounded-xl border border-dashed border-white/5 bg-navy-800/50 text-sm text-white/20">
          {copy.selectPrompt}
        </div>
      )}
    </div>
  )
}
