import Link from 'next/link'
import PartnerListTable from '@/components/admin/PartnerListTable'
import { prisma } from '@/lib/prisma'
import { adminCopy, getAdminLocale, withAdminLocale } from '@/lib/admin-locale'
import { safeDb } from '@/lib/safe-db'
import { getBackupPartners } from '@/lib/backup-content'

export default async function AdminPartnersPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const locale = getAdminLocale((await searchParams).lang)
  const copy = adminCopy[locale].partners
  const partners = await safeDb(
    'admin partners list',
    () =>
      prisma.partner.findMany({
        orderBy: [{ type: 'asc' }, { sortOrder: 'asc' }, { name: 'asc' }],
      }),
    getBackupPartners()
  )

  const tech = partners.filter((partner) => partner.type === 'TECHNOLOGY')
  const hotel = partners.filter((partner) => partner.type === 'HOTEL_BRAND')

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-700 text-slate-950">{copy.title}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {partners.length} {copy.countSuffix}
          </p>
        </div>
        <Link
          href={withAdminLocale('/admin/partners/new', locale)}
          className="rounded-2xl bg-[#0f5bff] px-4 py-2.5 text-sm font-600 text-white transition-colors hover:bg-[#0848d6]"
        >
          {copy.add}
        </Link>
      </div>

      <PartnerListTable locale={locale} label={copy.groups[0]} items={tech} />
      <PartnerListTable locale={locale} label={copy.groups[1]} items={hotel} />
    </div>
  )
}
