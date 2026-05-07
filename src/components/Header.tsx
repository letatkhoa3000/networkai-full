'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import BrandLogo from '@/components/BrandLogo'
import { Locale, withLocalePath } from '@/lib/site-locale'
import { siteCopy } from '@/lib/site-copy'

export default function Header({
  locale = 'vi',
  switchPath = '/',
}: {
  locale?: Locale
  switchPath?: string
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const copy = siteCopy[locale].header
  const switchHref = locale === 'vi' ? withLocalePath('en', switchPath) : switchPath

  function isActive(href: string) {
    const localizedHref = withLocalePath(locale, href)
    const localizedHome = withLocalePath(locale, '/')
    if (localizedHref === localizedHome) {
      return pathname === localizedHome
    }
    return pathname === localizedHref || pathname.startsWith(`${localizedHref}/`)
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--border-soft)] bg-white shadow-[0_12px_40px_-32px_rgba(15,23,42,0.14)]">
      <div className="page-shell flex h-[78px] items-center justify-between gap-4">
        <Link href={withLocalePath(locale, '/')} className="group flex items-center gap-3">
          <BrandLogo
            variant="header"
            className="transition-transform duration-200 group-hover:scale-[1.01]"
          />
        </Link>

        <nav className="hidden items-center gap-5 xl:gap-7 lg:flex">
          {copy.nav.map((link: { href: string; label: string }) => (
            <Link
              key={link.href}
              href={withLocalePath(locale, link.href)}
              className={`whitespace-nowrap rounded-xl px-3 py-2 text-[0.92rem] transition-colors xl:text-[0.95rem] ${
                isActive(link.href)
                  ? 'bg-[#eef4ff] font-700 text-[#0f5bff]'
                  : 'font-600 text-[color:var(--text-body)] hover:bg-[var(--bg-soft)] hover:text-[#0f5bff]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex lg:flex-shrink-0">
          <Link
            href={switchHref}
            className="whitespace-nowrap rounded-full border border-[var(--border-soft)] bg-white px-4 py-2.5 text-sm font-500 text-[color:var(--text-body)] transition-colors hover:border-[var(--border-strong)] hover:text-[color:var(--text-strong)]"
          >
            {copy.switchLabel}
          </Link>
          <Link
            href={withLocalePath(locale, '/contact')}
            className="btn-primary whitespace-nowrap px-5 py-2.5 font-display text-sm"
          >
            {copy.cta}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-soft)] bg-white text-[color:var(--text-body)] transition-colors hover:text-[color:var(--text-strong)] lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div className="border-t border-[var(--border-soft)] bg-white px-4 pb-5 pt-4 lg:hidden">
          <div className="page-shell rounded-[28px] border border-[var(--border-soft)] bg-[var(--bg-soft)] p-4 shadow-[0_24px_80px_-60px_rgba(15,91,255,0.18)]">
            <div className="grid gap-2">
              {copy.nav.map((link: { href: string; label: string }) => (
                <Link
                  key={link.href}
                  href={withLocalePath(locale, link.href)}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm transition-colors ${
                    isActive(link.href)
                      ? 'bg-white font-700 text-[#0f5bff]'
                      : 'font-500 text-[color:var(--text-body)] hover:bg-white hover:text-[#0f5bff]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Link
                href={switchHref}
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3 text-center text-sm font-500 text-[color:var(--text-body)]"
              >
                {copy.switchLabel}
              </Link>
              <Link
                href={withLocalePath(locale, '/contact')}
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-[#0f5bff] px-4 py-3 text-center text-sm font-600 text-white"
              >
                {copy.cta}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
