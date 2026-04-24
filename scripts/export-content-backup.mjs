import 'dotenv/config'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function stamp() {
  const now = new Date()
  const parts = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
    '-',
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
    String(now.getSeconds()).padStart(2, '0'),
  ]
  return parts.join('')
}

async function main() {
  const backupDir = join(process.cwd(), 'backups')
  await mkdir(backupDir, { recursive: true })

  const data = {
    exportedAt: new Date().toISOString(),
    settings: await prisma.setting.findMany({ orderBy: { key: 'asc' } }),
    homepageSections: await prisma.homepageSection.findMany({ orderBy: { sortOrder: 'asc' } }),
    coreValues: await prisma.coreValue.findMany({ orderBy: { sortOrder: 'asc' } }),
    services: await prisma.service.findMany({ orderBy: [{ sortOrder: 'asc' }, { titleVi: 'asc' }] }),
    projects: await prisma.project.findMany({ orderBy: [{ featured: 'desc' }, { sortOrder: 'asc' }] }),
    partners: await prisma.partner.findMany({ orderBy: [{ type: 'asc' }, { sortOrder: 'asc' }] }),
    teamMembers: await prisma.teamMember.findMany({ orderBy: { sortOrder: 'asc' } }),
    contactSubmissions: await prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } }),
  }

  const filePath = join(backupDir, `content-backup-${stamp()}.json`)
  await writeFile(filePath, JSON.stringify(data, null, 2), 'utf8')
  console.log(filePath)
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
