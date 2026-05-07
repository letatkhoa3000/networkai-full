import type { Metadata } from 'next'
import ServicesPageView from '@/components/public/ServicesPageView'
import { prisma } from '@/lib/prisma'
import { safeDb } from '@/lib/safe-db'
import { buildMetadata } from '@/lib/seo'
import { getBackupServices } from '@/lib/backup-content'

export const metadata: Metadata = buildMetadata({
  locale: 'en',
  path: '/services',
  title: 'Services | NetworkAI',
  description:
    'Explore NetworkAI services across ICT, ELV, smart home, and smart building systems for hospitality and enterprise environments.',
})

export default async function EnglishServicesPage() {
  const services = await safeDb(
    'services list (en)',
    () =>
      prisma.service.findMany({
        where: { isVisible: true },
        orderBy: { sortOrder: 'asc' },
      }),
    getBackupServices()
  )

  return <ServicesPageView locale="en" services={services} />
}
