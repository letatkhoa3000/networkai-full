import type { Metadata } from 'next'
import AboutPageView from '@/components/public/AboutPageView'
import { prisma } from '@/lib/prisma'
import { safeDb } from '@/lib/safe-db'
import { buildMetadata } from '@/lib/seo'
import { getBackupCoreValues, getBackupHomepageSection } from '@/lib/backup-content'

export const metadata: Metadata = buildMetadata({
  locale: 'en',
  path: '/about',
  title: 'About | NetworkAI',
  description:
    'Learn about NetworkAI and our experience delivering ICT, ELV, and smart building systems for hospitality and enterprise projects.',
})

export default async function EnglishAboutPage() {
  const [aboutFull, aboutShort, coreValues] = await Promise.all([
    safeDb(
      'about_full (en)',
      () => prisma.homepageSection.findUnique({ where: { key: 'about_full' } }),
      getBackupHomepageSection('about_full')
    ),
    safeDb(
      'about_short (en)',
      () => prisma.homepageSection.findUnique({ where: { key: 'about_short' } }),
      getBackupHomepageSection('about_short')
    ),
    safeDb(
      'about core values (en)',
      () => prisma.coreValue.findMany({ where: { isVisible: true }, orderBy: { sortOrder: 'asc' } }),
      getBackupCoreValues()
    ),
  ])

  return <AboutPageView locale="en" aboutSection={aboutFull ?? aboutShort} coreValues={coreValues} />
}
