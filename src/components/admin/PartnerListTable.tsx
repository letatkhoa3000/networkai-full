'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import type { AdminLocale } from '@/lib/admin-locale'
import { adminCopy, withAdminLocale } from '@/lib/admin-locale'

type PartnerRow = {
  id: string
  name: string
  websiteUrl: string | null
  isVisible: boolean
  type: 'TECHNOLOGY' | 'HOTEL_BRAND'
  sortOrder: number
  logoUrl: string | null
}

export default function PartnerListTable({
  locale,
  label,
  items,
}: {
  locale: AdminLocale
  label: string
  items: PartnerRow[]
}) {
  const router = useRouter()
  const copy = adminCopy[locale].partners
  const orderLabel = locale === 'en' ? 'Order' : 'Thứ tự'
  const moveUpLabel = locale === 'en' ? 'Up' : 'Lên'
  const moveDownLabel = locale === 'en' ? 'Down' : 'Xuống'
  const [loadingId, setLoadingId] = useState<string | null>(null)

  async function updatePartner(id: string, payload: Record<string, unknown>) {
    const res = await fetch(`/api/admin/partners/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      throw new Error('update-failed')
    }
  }

  async function movePartner(index: number, direction: -1 | 1) {
    const current = items[index]
    const target = items[index + direction]
    if (!current || !target) return

    setLoadingId(current.id)
    try {
      await Promise.all([
        updatePartner(current.id, { sortOrder: target.sortOrder }),
        updatePartner(target.id, { sortOrder: current.sortOrder }),
      ])
      router.refresh()
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="mb-8">
      <h2 className="mb-3 text-sm font-600 uppercase tracking-wider text-slate-500">{label}</h2>
      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-[#f8fbfe]">
              {copy.headers.map((header) => (
                <th
                  key={header}
                  className="px-5 py-4 text-left text-xs font-600 uppercase tracking-wider text-slate-500"
                >
                  {header}
                </th>
              ))}
              <th className="px-5 py-4 text-left text-xs font-600 uppercase tracking-wider text-slate-500">
                {orderLabel}
              </th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {items.map((partner, i) => (
              <tr
                key={partner.id}
                className={`border-b border-slate-200 transition-colors hover:bg-[#f8fbfe] ${
                  i === items.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white px-2">
                      {partner.logoUrl ? (
                        <img
                          src={partner.logoUrl}
                          alt={partner.name}
                          className="h-8 w-full object-contain"
                        />
                      ) : (
                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-300">Logo</span>
                      )}
                    </div>
                    <span className="text-sm font-600 text-slate-950">{partner.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-sm text-slate-500">{partner.websiteUrl ?? '-'}</td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-md border px-2 py-0.5 text-xs ${
                      partner.isVisible
                        ? 'border-green-500/20 bg-green-500/10 text-green-400'
                        : 'border-slate-200 bg-slate-50 text-slate-400'
                    }`}
                  >
                    {partner.isVisible ? copy.visible : copy.hidden}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span className="min-w-8 text-sm text-slate-500">{partner.sortOrder}</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={i === 0 || loadingId === partner.id}
                        onClick={() => movePartner(i, -1)}
                        className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 transition-colors hover:border-slate-900 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        {moveUpLabel}
                      </button>
                      <button
                        type="button"
                        disabled={i === items.length - 1 || loadingId === partner.id}
                        onClick={() => movePartner(i, 1)}
                        className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 transition-colors hover:border-slate-900 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        {moveDownLabel}
                      </button>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <Link
                    href={withAdminLocale(`/admin/partners/${partner.id}/edit`, locale)}
                    className="text-sm font-500 text-[#0f5bff] transition-colors hover:text-[#0848d6]"
                  >
                    {copy.edit}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
