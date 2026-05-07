'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import BrandLogo from '@/components/BrandLogo'
import { AdminLocale, adminCopy, getAdminLocale, withAdminLocale } from '@/lib/admin-locale'

export default function AdminSidebar({ lang }: { lang?: string }) {
  const pathname = usePathname()
  const locale = getAdminLocale(lang)
  const copy = adminCopy[locale].sidebar
  const alternateLocale: AdminLocale = locale === 'vi' ? 'en' : 'vi'

  return (
    <aside className="fixed bottom-0 left-0 top-0 flex w-72 flex-col border-r border-[var(--border-soft)] bg-[var(--bg-card)] text-[color:var(--text-strong)] shadow-[0_30px_80px_-60px_rgba(15,23,42,0.18)]">
      <div className="border-b border-[var(--border-soft)] p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <BrandLogo variant="admin" />
            <p className="mt-2 text-xs text-[color:var(--text-muted)]">{copy.title}</p>
          </div>
          <Link
            href={withAdminLocale(pathname, alternateLocale)}
            className="rounded-full border border-[var(--border-soft)] bg-white px-3 py-1.5 text-xs text-[color:var(--text-body)] transition-colors hover:border-[var(--border-strong)] hover:text-[color:var(--text-strong)]"
          >
            {copy.switchLabel}
          </Link>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {copy.nav.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={withAdminLocale(item.href, locale)}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-colors ${
                active
                  ? 'bg-[#edf4ff] text-[#0f5bff] shadow-[0_18px_40px_-28px_rgba(15,91,255,0.25)]'
                  : 'text-[color:var(--text-body)] hover:bg-[var(--bg-soft)] hover:text-[color:var(--text-strong)]'
              }`}
            >
              <span className="w-6 text-center font-mono text-xs">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-[var(--border-soft)] p-4">
        <button
          onClick={() => signOut({ callbackUrl: withAdminLocale('/admin/login', locale) })}
          className="w-full rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3 text-left text-sm text-[color:var(--text-body)] transition-colors hover:border-[var(--border-strong)] hover:text-[color:var(--text-strong)]"
        >
          {copy.logout}
        </button>
      </div>
    </aside>
  )
}
