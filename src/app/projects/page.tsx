import type { Metadata } from 'next'
import ProjectsPageView from '@/components/public/ProjectsPageView'
import { getBackupProjects } from '@/lib/backup-content'
import { prisma } from '@/lib/prisma'
import { safeDb } from '@/lib/safe-db'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  locale: 'vi',
  path: '/projects',
  title: 'Dự án | NetworkAI',
  description:
    'Xem các dự án tiêu biểu do NetworkAI triển khai trong lĩnh vực khách sạn, nghỉ dưỡng và hạ tầng công nghệ thông minh.',
})

export default async function ProjectsPage() {
  const projects = await safeDb(
    'projects list (vi)',
    () =>
      prisma.project.findMany({
        where: { isVisible: true },
        orderBy: { sortOrder: 'asc' },
      }),
    getBackupProjects()
  )

  return <ProjectsPageView locale="vi" projects={projects} />
}
