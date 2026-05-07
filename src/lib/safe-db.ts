let dbUnavailable = false

export function isDbUnavailable() {
  return dbUnavailable
}

export async function safeDb<T>(label: string, query: () => Promise<T>, fallback: T): Promise<T> {
  if (dbUnavailable) {
    return fallback
  }

  try {
    return await query()
  } catch {
    dbUnavailable = true
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`Database query failed for ${label}. Falling back.`)
    }
    return fallback
  }
}
