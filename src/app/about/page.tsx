import type { Metadata } from 'next'
import AboutPageView from '@/components/public/AboutPageView'
import { prisma } from '@/lib/prisma'
import { safeDb } from '@/lib/safe-db'
import { buildMetadata } from '@/lib/seo'
import { getBackupCoreValues, getBackupHomepageSection } from '@/lib/backup-content'

export const metadata: Metadata = buildMetadata({
  locale: 'vi',
  path: '/about',
  title: 'Giới thiệu | NetworkAI',
  description:
    'Tìm hiểu về NetworkAI, kinh nghiệm triển khai hệ thống ICT, ELV và Smart Building cho khách sạn và doanh nghiệp.',
})

export default async function AboutPage() {
  const [aboutFull, aboutShort, coreValues] = await Promise.all([
    safeDb(
      'about_full (vi)',
      () => prisma.homepageSection.findUnique({ where: { key: 'about_full' } }),
      getBackupHomepageSection('about_full')
    ),
    safeDb(
      'about_short (vi)',
      () => prisma.homepageSection.findUnique({ where: { key: 'about_short' } }),
      getBackupHomepageSection('about_short')
    ),
    safeDb(
      'about core values (vi)',
      () => prisma.coreValue.findMany({ where: { isVisible: true }, orderBy: { sortOrder: 'asc' } }),
      getBackupCoreValues()
    ),
  ])

  return <AboutPageView locale="vi" aboutSection={aboutFull ?? aboutShort} coreValues={coreValues} />
}
