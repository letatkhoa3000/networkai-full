'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function HtmlLangSync() {
  const pathname = usePathname()

  useEffect(() => {
    const nextLang =
      pathname.startsWith('/en') ||
      new URLSearchParams(window.location.search).get('lang') === 'en'
        ? 'en'
        : 'vi'
    document.documentElement.lang = nextLang
  }, [pathname])

  return null
}
