import type { Metadata } from 'next'
import ServicesPageView from '@/components/public/ServicesPageView'
import { prisma } from '@/lib/prisma'
import { safeDb } from '@/lib/safe-db'
import { buildMetadata } from '@/lib/seo'
import { getBackupServices } from '@/lib/backup-content'

export const metadata: Metadata = buildMetadata({
  locale: 'vi',
  path: '/services',
  title: 'Dịch vụ | NetworkAI',
  description:
    'Khám phá các dịch vụ ICT, ELV, Smart Home và Smart Building của NetworkAI dành cho dự án khách sạn và doanh nghiệp hiện đại.',
})

export default async function ServicesPage() {
  const services = await safeDb(
    'services list (vi)',
    () =>
      prisma.service.findMany({
        where: { isVisible: true },
        orderBy: { sortOrder: 'asc' },
      }),
    getBackupServices()
  )

  return <ServicesPageView locale="vi" services={services} />
}
