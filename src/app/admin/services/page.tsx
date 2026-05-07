import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { adminCopy, getAdminLocale, withAdminLocale } from '@/lib/admin-locale'
import { safeDb } from '@/lib/safe-db'
import { getBackupServices } from '@/lib/backup-content'

export default async function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const locale = getAdminLocale((await searchParams).lang)
  const copy = adminCopy[locale].services
  const services = await safeDb(
    'admin services list',
    () =>
      prisma.service.findMany({
        orderBy: { sortOrder: 'asc' },
      }),
    getBackupServices()
  )

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-700 text-slate-950">{copy.title}</h1>
          <p className="mt-1 text-sm text-slate-500">{services.length} {copy.countSuffix}</p>
        </div>
        <Link
          href={withAdminLocale('/admin/services/new', locale)}
          className="rounded-2xl bg-[#0f5bff] px-4 py-2.5 text-sm font-600 text-white transition-colors hover:bg-[#0848d6]"
        >
          {copy.add}
        </Link>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-[#f8fbfe]">
              {copy.headers.map((label) => (
                <th key={label} className="px-5 py-4 text-left text-xs font-600 uppercase tracking-wider text-slate-500">
                  {label}
                </th>
              ))}
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {services.map((service, i) => (
              <tr key={service.id} className={`border-b border-slate-200 transition-colors hover:bg-[#f8fbfe] ${i === services.length - 1 ? 'border-b-0' : ''}`}>
                <td className="px-5 py-3">
                  <p className="text-sm font-600 text-slate-950">{service.titleVi}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{service.titleEn}</p>
                </td>
                <td className="px-5 py-3 font-mono text-xs text-slate-500">{service.slug}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs ${service.featured ? 'text-brand-500' : 'text-slate-300'}`}>
                    {service.featured ? '★ Featured' : '-'}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className={`rounded-md border px-2 py-0.5 text-xs ${
                    service.isVisible
                      ? 'border-green-500/20 bg-green-500/10 text-green-400'
                      : 'border-slate-200 bg-slate-50 text-slate-400'
                  }`}>
                    {service.isVisible ? copy.visible : copy.hidden}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <Link href={withAdminLocale(`/admin/services/${service.id}/edit`, locale)} className="text-sm font-500 text-[#0f5bff] transition-colors hover:text-[#0848d6]">
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
