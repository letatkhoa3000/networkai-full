import type { Metadata } from 'next'
import PartnersPageView from '@/components/public/PartnersPageView'
import { prisma } from '@/lib/prisma'
import { safeDb } from '@/lib/safe-db'
import { buildMetadata } from '@/lib/seo'
import { getBackupPartners } from '@/lib/backup-content'

export const metadata: Metadata = buildMetadata({
  locale: 'en',
  path: '/partners',
  title: 'Partners | NetworkAI',
  description:
    'Meet the technology partners and hospitality brands that support NetworkAI project delivery and long-term operations.',
})

export default async function EnglishPartnersPage() {
  const backupPartners = getBackupPartners()
  const techPartners = await safeDb(
    'partners technology (en)',
    () =>
      prisma.partner.findMany({
        where: { type: 'TECHNOLOGY', isVisible: true },
        orderBy: { sortOrder: 'asc' },
      }),
    backupPartners.filter((item) => item.type === 'TECHNOLOGY')
  )
  const hotelPartners = await safeDb(
    'partners hotel (en)',
    () =>
      prisma.partner.findMany({
        where: { type: 'HOTEL_BRAND', isVisible: true },
        orderBy: { sortOrder: 'asc' },
      }),
    backupPartners.filter((item) => item.type === 'HOTEL_BRAND')
  )

  return <PartnersPageView locale="en" techPartners={techPartners} hotelPartners={hotelPartners} />
}
