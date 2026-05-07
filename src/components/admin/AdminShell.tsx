'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [lang, setLang] = useState<'vi' | 'en'>('vi')
  const isLogin = pathname === '/admin/login'

  useEffect(() => {
    const nextLang = new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'vi'
    setLang(nextLang)
  }, [pathname])

  if (isLogin) {
    return <>{children}</>
  }

  return (
    <div className="admin-page min-h-screen">
      <AdminSidebar lang={lang} />
      <div className="ml-72 min-h-screen px-8 py-8">
        <div className="admin-surface p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
