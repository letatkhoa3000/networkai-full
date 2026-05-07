import { existsSync, readFileSync } from 'fs'
import path from 'path'
import { readLocalContent } from '@/lib/local-content-store'

type BackupPayload = {
  homepageSections?: any[]
  coreValues?: any[]
  services?: any[]
  projects?: any[]
  partners?: any[]
  settings?: any[]
}

let cached: BackupPayload | null = null

function getBackupFilePath() {
  return path.join(process.cwd(), 'backups', 'content-backup-20260422-200022.json')
}

function readBackupPayload(): BackupPayload {
  if (cached) return cached

  const filePath = getBackupFilePath()
  if (!existsSync(filePath)) {
    cached = {}
    return cached
  }

  const raw = readFileSync(filePath, 'utf8')
  cached = JSON.parse(raw) as BackupPayload
  return cached
}

export function getBackupHomepageSection(key: string) {
  const local = readLocalContent().homepageSections?.find((section) => section.key === key)
  if (local) return local
  return readBackupPayload().homepageSections?.find((section) => section.key === key) ?? null
}

export function getBackupCoreValues() {
  const local = readLocalContent().coreValues
  if (Array.isArray(local) && local.length) {
    return local.filter((item) => item.isVisible !== false)
  }
  return (readBackupPayload().coreValues ?? []).filter((item) => item.isVisible !== false)
}

export function getBackupServices() {
  const backup = (readBackupPayload().services ?? []).filter((item) => item.isVisible !== false)
  const local = (readLocalContent().services ?? []).filter((item) => item.isVisible !== false)
  const map = new Map(backup.map((item) => [item.slug ?? item.id, item]))
  for (const item of local) {
    map.set(item.slug ?? item.id, item)
  }
  return Array.from(map.values())
}

export function getBackupServiceBySlug(slug: string) {
  const service = getBackupServices().find((item) => item.slug === slug)
  if (!service) return null

  return {
    ...service,
    projects: [],
  }
}

export function getBackupProjects() {
  const backup = (readBackupPayload().projects ?? []).filter((item) => item.isVisible !== false)
  const local = (readLocalContent().projects ?? []).filter((item) => item.isVisible !== false)
  const map = new Map(backup.map((item) => [item.slug ?? item.id, item]))
  for (const item of local) {
    map.set(item.slug ?? item.id, item)
  }
  return Array.from(map.values())
}

export function getBackupProjectById(id: string) {
  const local = (readLocalContent().projects ?? []).find((item) => item.id === id)
  if (local && local.isVisible !== false) return local

  const backup = (readBackupPayload().projects ?? []).find((item) => item.id === id)
  if (backup && backup.isVisible !== false) return backup

  return null
}

export function getBackupProjectBySlug(slug: string) {
  const project = getBackupProjects().find((item) => item.slug === slug)
  if (!project) return null

  return {
    ...project,
    services: [],
  }
}

export function getBackupPartners() {
  return (readBackupPayload().partners ?? []).filter((item) => item.isVisible !== false)
}

export function getBackupSettings(keys: string[]) {
  const backup = (readBackupPayload().settings ?? []).filter((item) => keys.includes(item.key))
  const local = (readLocalContent().settings ?? []).filter((item) => keys.includes(item.key))
  const map = new Map(backup.map((item) => [item.key, item]))
  for (const item of local) map.set(item.key, item)
  return Array.from(map.values())
}
