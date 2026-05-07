'use client'

import { useEffect, useMemo, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { adminCopy, getAdminLocale, withAdminLocale } from '@/lib/admin-locale'

export default function LoginPage() {
  const router = useRouter()
  const [locale, setLocale] = useState<'vi' | 'en'>('vi')
  const copy = adminCopy[locale].login
  const switchHref = useMemo(
    () => withAdminLocale('/admin/login', locale === 'vi' ? 'en' : 'vi'),
    [locale]
  )
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLocale(getAdminLocale(new URLSearchParams(window.location.search).get('lang') ?? undefined))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      setError(copy.error)
      setLoading(false)
    } else {
      router.push(withAdminLocale('/admin/dashboard', locale))
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500">
              <span className="font-display font-700 text-white">N</span>
            </div>
            <span className="font-display text-xl font-600 text-white">
              Network<span className="text-brand-400">AI</span>
            </span>
          </div>
          <div className="mb-3">
            <a href={switchHref} className="text-sm text-white/40 transition-colors hover:text-white/70">
              {locale === 'vi' ? 'English' : 'Tiếng Việt'}
            </a>
          </div>
          <h1 className="font-display text-2xl font-600 text-white">{copy.title}</h1>
          <p className="mt-2 text-sm text-white/40">{copy.subtitle}</p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-navy-800 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-white/50">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@networkai.vn"
                required
                className="w-full rounded-xl border border-white/10 bg-navy-700 px-4 py-3 text-white placeholder-white/20 transition-colors focus:border-brand-500/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/50">{copy.password}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
                className="w-full rounded-xl border border-white/10 bg-navy-700 px-4 py-3 text-white placeholder-white/20 transition-colors focus:border-brand-500/50 focus:outline-none"
              />
            </div>

            {error ? (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-brand-500 py-3 font-display font-500 text-white transition-colors hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? copy.loading : copy.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
