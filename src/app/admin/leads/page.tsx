import { prisma } from '@/lib/prisma'
import LeadsList from '@/components/admin/LeadsList'
import { adminCopy, getAdminLocale } from '@/lib/admin-locale'

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const locale = getAdminLocale((await searchParams).lang)
  const copy = adminCopy[locale].leads
  const leads = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-600 text-white">Leads</h1>
          <p className="mt-1 text-sm text-white/40">{leads.length} {copy.countSuffix}</p>
        </div>
        <div className="flex gap-2">
          {copy.filters.map((label) => (
            <span key={label} className="cursor-pointer rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/50 transition-colors hover:border-white/20 hover:text-white">
              {label}
            </span>
          ))}
        </div>
      </div>
      <LeadsList leads={leads} locale={locale} />
    </div>
  )
}
