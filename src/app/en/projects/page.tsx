import type { Metadata } from 'next'
import ProjectsPageView from '@/components/public/ProjectsPageView'
import { getBackupProjects } from '@/lib/backup-content'
import { prisma } from '@/lib/prisma'
import { safeDb } from '@/lib/safe-db'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  locale: 'en',
  path: '/projects',
  title: 'Projects | NetworkAI',
  description:
    'Review selected hospitality, resort, and smart infrastructure projects delivered by NetworkAI across Vietnam.',
})

export default async function EnglishProjectsPage() {
  const projects = await safeDb(
    'projects list (en)',
    () =>
      prisma.project.findMany({
        where: { isVisible: true },
        orderBy: { sortOrder: 'asc' },
      }),
    getBackupProjects()
  )

  return <ProjectsPageView locale="en" projects={projects} />
}
