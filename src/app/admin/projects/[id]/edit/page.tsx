import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ProjectEditForm from '@/components/admin/ProjectEditForm'
import { adminCopy, getAdminLocale } from '@/lib/admin-locale'
import { getBackupProjectById } from '@/lib/backup-content'

export default async function EditProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ lang?: string }>
}) {
  const locale = getAdminLocale((await searchParams).lang)
  const copy = adminCopy[locale].forms
  const { id } = await params
  const backupProject = getBackupProjectById(id)
  let project = backupProject

  try {
    project = await prisma.project.findUnique({ where: { id } })
  } catch {
    project = backupProject
  }

  if (!project) notFound()

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-700 text-slate-950">{copy.projectTitle}</h1>
        <p className="mt-1 text-sm text-slate-500">{project.nameVi}</p>
      </div>
      <ProjectEditForm project={project} locale={locale} />
    </div>
  )
}
