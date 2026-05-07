'use client'

import { useState } from 'react'
import { AdminLocale, adminCopy } from '@/lib/admin-locale'

type SettingsField =
  | { key: string; label: string; type: 'text' | 'textarea' }
  | { key: string; label: string; type: 'select'; options: { value: string; label: string }[] }

export default function SettingsForm({ data, locale }: { data: Record<string, string>; locale: AdminLocale }) {
  const copy = adminCopy[locale].settings
  const typographyGroup = locale === 'en' ? 'Typography' : 'Kiểu chữ'
  const fields: { group: string; items: SettingsField[] }[] = [
    {
      group: copy.groups.contact,
      items: [
        { key: 'contact.email', label: locale === 'en' ? 'Contact email' : 'Email liên hệ', type: 'text' },
        { key: 'contact.phone', label: locale === 'en' ? 'Phone number' : 'Số điện thoại', type: 'text' },
        { key: 'contact.addressVi', label: locale === 'en' ? 'Address (Vietnamese)' : 'Địa chỉ (Tiếng Việt)', type: 'textarea' },
        { key: 'contact.addressEn', label: locale === 'en' ? 'Address (English)' : 'Địa chỉ (English)', type: 'textarea' },
      ],
    },
    {
      group: copy.groups.social,
      items: [
        { key: 'social.linkedin', label: 'LinkedIn URL', type: 'text' },
        { key: 'social.facebook', label: 'Facebook URL', type: 'text' },
      ],
    },
    {
      group: copy.groups.seo,
      items: [
        { key: 'seo.defaultTitleVi', label: locale === 'en' ? 'SEO Title (Vietnamese)' : 'SEO Title (Tiếng Việt)', type: 'text' },
        { key: 'seo.defaultTitleEn', label: 'SEO Title (English)', type: 'text' },
        { key: 'seo.defaultDescVi', label: locale === 'en' ? 'SEO Description (Vietnamese)' : 'SEO Description (Tiếng Việt)', type: 'textarea' },
        { key: 'seo.defaultDescEn', label: 'SEO Description (English)', type: 'textarea' },
      ],
    },
    {
      group: typographyGroup,
      items: [
        {
          key: 'theme.fontFamily',
          label: locale === 'en' ? 'Site font family' : 'Font chữ toàn site',
          type: 'select',
          options: [
            { value: 'aptos', label: 'Aptos' },
            { value: 'segoe', label: 'Segoe UI' },
            { value: 'helvetica', label: 'Helvetica Neue' },
            { value: 'system', label: locale === 'en' ? 'System UI' : 'Hệ thống' },
          ],
        },
        {
          key: 'theme.headingScale',
          label: locale === 'en' ? 'Heading size scale' : 'Tỷ lệ cỡ chữ tiêu đề',
          type: 'select',
          options: [
            { value: '0.9', label: locale === 'en' ? 'Small' : 'Nhỏ' },
            { value: '1', label: locale === 'en' ? 'Default' : 'Mặc định' },
            { value: '1.08', label: locale === 'en' ? 'Large' : 'Lớn' },
            { value: '1.15', label: locale === 'en' ? 'Extra large' : 'Rất lớn' },
          ],
        },
        {
          key: 'theme.bodyScale',
          label: locale === 'en' ? 'Body text scale' : 'Tỷ lệ cỡ chữ nội dung',
          type: 'select',
          options: [
            { value: '0.95', label: locale === 'en' ? 'Compact' : 'Gọn' },
            { value: '1', label: locale === 'en' ? 'Default' : 'Mặc định' },
            { value: '1.05', label: locale === 'en' ? 'Comfortable' : 'Thoáng' },
            { value: '1.1', label: locale === 'en' ? 'Large' : 'Lớn' },
          ],
        },
      ],
    },
    {
      group: copy.groups.company,
      items: [
        { key: 'company.foundedYear', label: locale === 'en' ? 'Founded year' : 'Năm thành lập', type: 'text' },
        { key: 'company.experienceYears', label: locale === 'en' ? 'Years of experience' : 'Số năm kinh nghiệm', type: 'text' },
      ],
    },
  ]

  const [form, setForm] = useState<Record<string, string>>(data)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  function set(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMsg('')

    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      setMsg(copy.saveSuccess)
    } else {
      setMsg(copy.saveError)
    }
    setLoading(false)
  }

  const inputClass = 'admin-input'

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
      {fields.map((group) => (
        <div key={group.group}>
          <h2 className="mb-4 text-sm font-600 uppercase tracking-wider text-[color:var(--text-muted)]">{group.group}</h2>
          <div className="admin-card space-y-4 p-6">
            {group.items.map((field) => (
              <div key={field.key}>
                <label className="mb-2 block text-sm font-500 text-slate-600">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={form[field.key] ?? ''}
                    onChange={(e) => set(field.key, e.target.value)}
                    rows={2}
                    className={`${inputClass} resize-none`}
                  />
                ) : field.type === 'select' ? (
                  <select
                    value={form[field.key] ?? field.options[0]?.value ?? ''}
                    onChange={(e) => set(field.key, e.target.value)}
                    className={inputClass}
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    value={form[field.key] ?? ''}
                    onChange={(e) => set(field.key, e.target.value)}
                    className={inputClass}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {msg ? (
        <div className={`rounded-2xl px-4 py-3 text-sm ${msg === copy.saveSuccess ? 'border border-emerald-200 bg-emerald-50 text-emerald-700' : 'border border-red-200 bg-red-50 text-red-700'}`}>
          {msg}
        </div>
      ) : null}

      <button type="submit" disabled={loading} className="btn-primary rounded-2xl px-6 py-3 font-display text-sm font-600 disabled:opacity-50">
        {loading ? copy.saveLoading : copy.saveIdle}
      </button>
    </form>
  )
}
