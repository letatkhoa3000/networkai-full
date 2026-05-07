import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'

type LocalContentPayload = {
  homepageSections?: any[]
  coreValues?: any[]
  settings?: any[]
  services?: any[]
  projects?: any[]
}

function getLocalContentPath() {
  return path.join(process.cwd(), 'src', 'content', 'cms-local.json')
}

function ensureDir() {
  const filePath = getLocalContentPath()
  mkdirSync(path.dirname(filePath), { recursive: true })
  return filePath
}

export function readLocalContent(): LocalContentPayload {
  const filePath = getLocalContentPath()
  if (!existsSync(filePath)) return {}

  try {
    return JSON.parse(readFileSync(filePath, 'utf8')) as LocalContentPayload
  } catch {
    return {}
  }
}

export function writeLocalContent(patch: LocalContentPayload) {
  const filePath = ensureDir()
  const current = readLocalContent()
  const next = { ...current, ...patch }
  writeFileSync(filePath, JSON.stringify(next, null, 2), 'utf8')
  return next
}

export function upsertLocalSettings(entries: { key: string; value: string; label?: string | null }[]) {
  const current = readLocalContent()
  const base = Array.isArray(current.settings) ? current.settings : []
  const map = new Map(base.map((item) => [item.key, item]))

  for (const entry of entries) {
    map.set(entry.key, {
      ...(map.get(entry.key) ?? {}),
      ...entry,
    })
  }

  return writeLocalContent({
    settings: Array.from(map.values()),
  })
}

export function upsertLocalService(service: any) {
  const current = readLocalContent()
  const base = Array.isArray(current.services) ? current.services : []
  const next = [...base]
  const index = next.findIndex((item) => item.id === service.id || item.slug === service.slug)

  if (index >= 0) {
    next[index] = { ...next[index], ...service }
  } else {
    next.push(service)
  }

  return writeLocalContent({
    services: next,
  })
}

export function upsertLocalProject(project: any) {
  const current = readLocalContent()
  const base = Array.isArray(current.projects) ? current.projects : []
  const next = [...base]
  const index = next.findIndex((item) => item.id === project.id || item.slug === project.slug)

  if (index >= 0) {
    next[index] = { ...next[index], ...project }
  } else {
    next.push(project)
  }

  return writeLocalContent({
    projects: next,
  })
}
