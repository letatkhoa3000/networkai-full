import { prisma } from '@/lib/prisma'
import LeadsList from '@/components/admin/LeadsList'
import { adminCopy, getAdminLocale } from '@/lib/admin-locale'
import { safeDb } from '@/lib/safe-db'

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const locale = getAdminLocale((await searchParams).lang)
  const copy = adminCopy[locale].leads
  const leads = await safeDb(
    'admin leads list',
    () =>
      prisma.contactSubmission.findMany({
        orderBy: { createdAt: 'desc' },
      }),
    []
  )

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-700 text-slate-950">{copy.title}</h1>
          <p className="mt-1 text-sm text-slate-500">{leads.length} {copy.countSuffix}</p>
        </div>
        <div className="flex gap-2">
          {copy.filters.map((label) => (
            <span key={label} className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-800">
              {label}
            </span>
          ))}
        </div>
      </div>
      <LeadsList leads={leads} locale={locale} />
    </div>
  )
}
