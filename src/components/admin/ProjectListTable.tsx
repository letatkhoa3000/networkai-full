'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import type { AdminLocale } from '@/lib/admin-locale'
import { adminCopy, withAdminLocale } from '@/lib/admin-locale'

type ProjectRow = {
  id: string
  slug: string
  nameVi: string
  nameEn: string
  location: string | null
  hotelBrand: string | null
  status: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING'
  featured: boolean
  isVisible: boolean
  sortOrder: number
  year: number | null
  thumbnailUrl: string | null
}

export default function ProjectListTable({
  locale,
  projects,
}: {
  locale: AdminLocale
  projects: ProjectRow[]
}) {
  const router = useRouter()
  const copy = adminCopy[locale].projects
  const orderLabel = locale === 'en' ? 'Order' : 'Thứ tự'
  const moveUpLabel = locale === 'en' ? 'Up' : 'Lên'
  const moveDownLabel = locale === 'en' ? 'Down' : 'Xuống'
  const featuredLabel = locale === 'en' ? '★ Featured' : '★ Nổi bật'
  const [loadingId, setLoadingId] = useState<string | null>(null)

  async function updateProject(id: string, payload: Record<string, unknown>) {
    const res = await fetch(`/api/admin/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      throw new Error('update-failed')
    }
  }

  async function moveProject(index: number, direction: -1 | 1) {
    const current = projects[index]
    const target = projects[index + direction]
    if (!current || !target) return

    setLoadingId(current.id)
    try {
      await Promise.all([
        updateProject(current.id, { sortOrder: target.sortOrder }),
        updateProject(target.id, { sortOrder: current.sortOrder }),
      ])
      router.refresh()
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="admin-card overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[var(--border-soft)] bg-[var(--bg-soft)]">
            {copy.headers.map((label) => (
              <th
                key={label}
                className="px-5 py-4 text-left text-xs font-600 uppercase tracking-wider text-[color:var(--text-muted)]"
              >
                {label}
              </th>
            ))}
            <th className="px-5 py-4 text-left text-xs font-600 uppercase tracking-wider text-[color:var(--text-muted)]">
              {orderLabel}
            </th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody>
          {projects.map((project, i) => (
            <tr
              key={project.id}
              className={`border-b border-[var(--border-soft)] transition-colors hover:bg-[var(--bg-soft)] ${
                i === projects.length - 1 ? 'border-b-0' : ''
              }`}
            >
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--border-soft)] bg-[var(--bg-soft)]">
                    {project.thumbnailUrl ? (
                      <img
                        src={project.thumbnailUrl}
                        alt={project.nameVi}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-[10px] uppercase tracking-[0.2em] text-slate-300">No image</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-600 text-[color:var(--text-strong)]">{project.nameVi}</p>
                    <p className="mt-0.5 text-xs text-[color:var(--text-muted)]">{project.nameEn}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-3 text-sm text-[color:var(--text-body)]">{project.location ?? '-'}</td>
              <td className="px-5 py-3">
                {project.hotelBrand ? (
                  <span className="rounded-md border border-brand-500/20 bg-brand-500/10 px-2 py-0.5 text-xs text-brand-400">
                    {project.hotelBrand}
                  </span>
                ) : (
                  <span className="text-sm text-[color:var(--text-muted)]">-</span>
                )}
              </td>
              <td className="px-5 py-3">
                <span
                  className={`rounded-md border px-2 py-0.5 text-xs ${
                    project.status === 'COMPLETED'
                      ? 'border-green-500/20 bg-green-500/10 text-green-400'
                      : project.status === 'IN_PROGRESS'
                        ? 'border-amber-500/20 bg-amber-500/10 text-amber-400'
                        : 'border-blue-500/20 bg-blue-500/10 text-blue-400'
                  }`}
                >
                  {copy.status[project.status]}
                </span>
              </td>
              <td className="px-5 py-3">
                <span className={`text-xs ${project.featured ? 'text-[#0f5bff]' : 'text-[color:var(--text-muted)]'}`}>
                  {project.featured ? featuredLabel : '-'}
                </span>
              </td>
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className="min-w-8 text-sm text-[color:var(--text-body)]">{project.sortOrder}</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={i === 0 || loadingId === project.id}
                      onClick={() => moveProject(i, -1)}
                      className="rounded-md border border-[var(--border-soft)] bg-white px-2 py-1 text-xs text-[color:var(--text-body)] transition-colors hover:border-[var(--border-strong)] hover:text-[color:var(--text-strong)] disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      {moveUpLabel}
                    </button>
                    <button
                      type="button"
                      disabled={i === projects.length - 1 || loadingId === project.id}
                      onClick={() => moveProject(i, 1)}
                      className="rounded-md border border-[var(--border-soft)] bg-white px-2 py-1 text-xs text-[color:var(--text-body)] transition-colors hover:border-[var(--border-strong)] hover:text-[color:var(--text-strong)] disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      {moveDownLabel}
                    </button>
                  </div>
                </div>
              </td>
              <td className="px-5 py-3">
                <Link
                  href={withAdminLocale(`/admin/projects/${project.id}/edit`, locale)}
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
  )
}
