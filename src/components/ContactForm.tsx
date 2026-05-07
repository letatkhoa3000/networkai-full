'use client'

import { FormEvent, useState } from 'react'
import { ContactFormCopy, ContactLocale } from '@/lib/contact-content'

type FormState = {
  name: string
  email: string
  phone: string
  company: string
  serviceType: string
  message: string
  honeypot: string
}

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  serviceType: '',
  message: '',
  honeypot: '',
}

export default function ContactForm({
  copy,
  locale,
  serviceOptions,
}: {
  copy: ContactFormCopy
  locale: ContactLocale
  serviceOptions: string[]
}) {
  const [form, setForm] = useState<FormState>(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form, locale }),
      })

      const payload = (await response.json()) as { error?: string; message?: string }

      if (!response.ok) {
        throw new Error(payload.error ?? copy.genericError)
      }

      setSuccess(payload.message ?? copy.success)
      setForm(initialState)
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : copy.genericError
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass = 'admin-input placeholder:text-slate-400'

  return (
    <div className="surface-panel p-7 md:p-10">
      <div className="mb-8">
        <p className="text-xs font-700 uppercase tracking-[0.24em] text-[#0f5bff]">{copy.eyebrow}</p>
        <h2 className="section-heading mt-3 max-w-[13ch]">
          {copy.title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-[color:var(--text-body)]">
          {copy.description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="honeypot"
          tabIndex={-1}
          autoComplete="off"
          value={form.honeypot}
          onChange={(event) => updateField('honeypot', event.target.value)}
          className="hidden"
        />

        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">{copy.labels.name}</span>
            <input
              type="text"
              name="name"
              required
              minLength={2}
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              className={inputClass}
              placeholder={copy.placeholders.name}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">{copy.labels.email}</span>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              className={inputClass}
              placeholder={copy.placeholders.email}
            />
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">{copy.labels.phone}</span>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={(event) => updateField('phone', event.target.value)}
              className={inputClass}
              placeholder={copy.placeholders.phone}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">{copy.labels.company}</span>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={(event) => updateField('company', event.target.value)}
              className={inputClass}
              placeholder={copy.placeholders.company}
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">{copy.labels.service}</span>
          <select
            name="serviceType"
            value={form.serviceType}
            onChange={(event) => updateField('serviceType', event.target.value)}
            className={inputClass}
          >
            <option value="">{copy.placeholders.service}</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">{copy.labels.message}</span>
          <textarea
            name="message"
            required
            minLength={10}
            rows={6}
            value={form.message}
            onChange={(event) => updateField('message', event.target.value)}
            className="admin-input min-h-[170px] rounded-[26px] resize-y placeholder:text-slate-400"
            placeholder={copy.placeholders.message}
          />
        </label>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary inline-flex w-full items-center justify-center rounded-2xl px-6 py-4 font-display text-sm font-700 uppercase tracking-[0.22em] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? copy.submitLoading : copy.submitIdle}
        </button>
      </form>
    </div>
  )
}
