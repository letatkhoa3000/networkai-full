import type { Metadata } from 'next'
import PartnersPageView from '@/components/public/PartnersPageView'
import { prisma } from '@/lib/prisma'
import { safeDb } from '@/lib/safe-db'
import { buildMetadata } from '@/lib/seo'
import { getBackupPartners } from '@/lib/backup-content'

export const metadata: Metadata = buildMetadata({
  locale: 'vi',
  path: '/partners',
  title: 'Đối tác | NetworkAI',
  description:
    'Danh sách đối tác công nghệ và thương hiệu khách sạn đồng hành cùng NetworkAI trong các dự án hạ tầng thông minh.',
})

export default async function PartnersPage() {
  const backupPartners = getBackupPartners()
  const techPartners = await safeDb(
    'partners technology (vi)',
    () =>
      prisma.partner.findMany({
        where: { type: 'TECHNOLOGY', isVisible: true },
        orderBy: { sortOrder: 'asc' },
      }),
    backupPartners.filter((item) => item.type === 'TECHNOLOGY')
  )
  const hotelPartners = await safeDb(
    'partners hotel (vi)',
    () =>
      prisma.partner.findMany({
        where: { type: 'HOTEL_BRAND', isVisible: true },
        orderBy: { sortOrder: 'asc' },
      }),
    backupPartners.filter((item) => item.type === 'HOTEL_BRAND')
  )

  return <PartnersPageView locale="vi" techPartners={techPartners} hotelPartners={hotelPartners} />
}
