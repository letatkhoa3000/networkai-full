import Link from 'next/link'
import ProjectListTable from '@/components/admin/ProjectListTable'
import { prisma } from '@/lib/prisma'
import { adminCopy, getAdminLocale, withAdminLocale } from '@/lib/admin-locale'
import { safeDb } from '@/lib/safe-db'
import { getBackupProjects } from '@/lib/backup-content'

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const locale = getAdminLocale((await searchParams).lang)
  const copy = adminCopy[locale].projects
  const projects = await safeDb(
    'admin projects list',
    () =>
      prisma.project.findMany({
        orderBy: [{ featured: 'desc' }, { sortOrder: 'asc' }, { year: 'desc' }],
      }),
    getBackupProjects()
  )

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-700 text-slate-950">{copy.title}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {projects.length} {copy.countSuffix}
          </p>
        </div>
        <Link
          href={withAdminLocale('/admin/projects/new', locale)}
          className="rounded-2xl bg-[#0f5bff] px-4 py-2.5 text-sm font-600 text-white transition-colors hover:bg-[#0848d6]"
        >
          {copy.add}
        </Link>
      </div>

      <ProjectListTable locale={locale} projects={projects} />
    </div>
  )
}
