export type Locale = 'vi' | 'en'

export function withLocalePath(locale: Locale, path: string) {
  if (locale === 'vi') {
    return path
  }

  if (path === '/') {
    return '/en'
  }

  return `/en${path}`
}

export function localizeField(locale: Locale, vi?: string | null, en?: string | null, fallback = '') {
  const preferred = locale === 'en' ? en : vi
  const secondary = locale === 'en' ? vi : en

  return preferred || secondary || fallback
}

export function localizeStatus(locale: Locale, status: string) {
  if (status === 'IN_PROGRESS') {
    return locale === 'en' ? 'In progress' : 'Đang triển khai'
  }

  if (status === 'UPCOMING') {
    return locale === 'en' ? 'Upcoming' : 'Sắp tới'
  }

  return locale === 'en' ? 'Completed' : 'Hoàn thành'
}
