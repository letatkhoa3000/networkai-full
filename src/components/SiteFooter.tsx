import Link from 'next/link'
import BrandLogo from '@/components/BrandLogo'
import { Locale, withLocalePath } from '@/lib/site-locale'
import { siteCopy } from '@/lib/site-copy'

export default function SiteFooter({
  locale,
  email = 'sales@networkai.vn',
  address,
}: {
  locale: Locale
  email?: string
  address: string
}) {
  const copy = siteCopy[locale]

  return (
    <footer className="border-t border-[var(--border-soft)] bg-[var(--bg-page-alt)] py-14 text-[color:var(--text-strong)] sm:py-16">
      <div className="page-shell">
 <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.72fr)_minmax(0,0.72fr)_minmax(0,0.9fr)]">
          <div className="max-w-xl">
            <BrandLogo variant="header" className="origin-left scale-[0.96]" />
            <div className="mt-6 space-y-3">
              <p className="text-[0.96rem] leading-7 text-[color:var(--text-body)]">{address}</p>
              <p className="text-[0.96rem] font-600 text-[color:var(--text-strong)]">{email}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-700 uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
              {locale === 'en' ? 'Navigation' : 'Điều hướng'}
            </p>
            <div className="mt-5 grid gap-3 text-[0.97rem]">
              {copy.header.nav.map((link: { href: string; label: string }) => (
                <Link
                  key={link.href}
                  href={withLocalePath(locale, link.href)}
                  className="text-[color:var(--text-body)] transition-colors hover:text-[#0f5bff]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-700 uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
              {locale === 'en' ? 'Capabilities' : 'Năng lực'}
            </p>
            <div className="mt-5 grid gap-3 text-[0.97rem] text-[color:var(--text-body)]">
              <span>ICT</span>
              <span>ELV</span>
              <span>Smart Building</span>
              <span>Hospitality Technology</span>
            </div>
          </div>

          <div>
            <p className="text-xs font-700 uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
              {locale === 'en' ? 'Next step' : 'Bước tiếp theo'}
            </p>
            <p className="mt-5 text-[0.97rem] leading-8 text-[color:var(--text-body)]">
              {locale === 'en'
                ? 'If you have a project brief or opening schedule, send it and we will help shape the technical scope.'
                : 'Nếu anh có brief dự án hoặc mốc opening, hãy gửi cho chúng tôi để cùng định hình phạm vi kỹ thuật phù hợp.'}
            </p>
            <Link
              href={withLocalePath(locale, '/contact')}
              className="mt-5 inline-flex items-center gap-2 text-sm font-600 text-[#0f5bff] transition-colors hover:text-[#0848d6]"
            >
              {copy.header.cta}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} NetworkAI. {copy.footer.rights}
        </div>
      </div>
    </footer>
  )
}
