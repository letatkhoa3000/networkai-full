'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminLocale, adminCopy, withAdminLocale } from '@/lib/admin-locale'
import AdminSingleImageField from '@/components/admin/AdminSingleImageField'
import { uploadAdminAsset, validateAdminUpload } from '@/lib/admin-upload'
import { prepareAdminImage } from '@/lib/admin-image-processing'

export default function PartnerEditForm({ partner, locale }: { partner: any; locale: AdminLocale }) {
  const router = useRouter()
  const copy = adminCopy[locale].forms
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [msg, setMsg] = useState('')
  const [form, setForm] = useState({
    name: partner.name ?? '',
    logoUrl: partner.logoUrl ?? '',
    websiteUrl: partner.websiteUrl ?? '',
    type: partner.type ?? 'TECHNOLOGY',
    sortOrder: partner.sortOrder?.toString() ?? '0',
    isVisible: partner.isVisible ?? true,
  })

  function set(key: string, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function getMessageTone(message: string) {
    const successMessages: string[] = [copy.saved, copy.uploadSuccess, copy.optimizeSuccess]
    return successMessages.includes(message) ? 'success' : 'error'
  }

  async function handleLogoUpload(file: File) {
    const validation = validateAdminUpload(file)
    if (validation === 'invalid-type') {
      setMsg(copy.uploadInvalidType)
      return
    }
    if (validation === 'too-large') {
      setMsg(copy.uploadTooLarge)
      return
    }

    setUploading(true)
    setMsg('')

    try {
      const preparedFile = await prepareAdminImage(file, 'logo')
      if (preparedFile.size > 5 * 1024 * 1024) {
        setMsg(copy.uploadTooLarge)
        return
      }

      const payload = await uploadAdminAsset(preparedFile, 'logos')
      set('logoUrl', payload.url)
      setMsg(file.type === 'image/svg+xml' ? copy.uploadSuccess : copy.optimizeSuccess)
    } catch {
      setMsg(copy.uploadFailed)
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    const res = await fetch(`/api/admin/partners/${partner.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, sortOrder: parseInt(form.sortOrder) || 0 }),
    })
    if (res.ok) {
      setMsg(copy.saved)
      router.refresh()
    } else {
      setMsg(copy.failed)
    }
    setLoading(false)
  }

  async function handleDelete() {
    if (!confirm(copy.confirmDeletePartner)) return
    const res = await fetch(`/api/admin/partners/${partner.id}`, { method: 'DELETE' })
    if (res.ok) router.push(withAdminLocale('/admin/partners', locale))
  }

  const inputClass = 'admin-input'

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl">
      <div className="admin-card space-y-5 p-6">
        <div>
          <label className="mb-2 block text-sm font-500 text-slate-600">{locale === 'en' ? 'Partner name *' : 'Tên đối tác *'}</label>
          <input value={form.name} onChange={(e) => set('name', e.target.value)} required className={inputClass} />
        </div>

        <AdminSingleImageField
          label="Logo URL *"
          value={form.logoUrl}
          required
          buttonLabel={copy.uploadLogo}
          uploadingLabel={copy.uploading}
          hint={copy.uploadLogoHint}
          previewLabel={copy.currentLogo}
          uploading={uploading}
          dropLabel={copy.dropFiles}
          dropHint={copy.dropFilesHint}
          cropTitle={copy.cropTitle}
          cropHelp={copy.cropHelp}
          cropZoomLabel={copy.cropZoom}
          cropResetLabel={copy.cropReset}
          cropCancelLabel={copy.cropCancel}
          cropApplyLabel={copy.cropApply}
          cropPreset="logo"
          onValueChange={(value) => set('logoUrl', value)}
          onFileSelect={handleLogoUpload}
        />

        <div>
          <label className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">Website URL</label>
          <input value={form.websiteUrl} onChange={(e) => set('websiteUrl', e.target.value)} placeholder="https://..." className={inputClass} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">{locale === 'en' ? 'Partner type' : 'Loại đối tác'}</label>
            <select value={form.type} onChange={(e) => set('type', e.target.value)} className={inputClass}>
              <option value="TECHNOLOGY">{locale === 'en' ? 'Technology' : 'Công nghệ'}</option>
              <option value="HOTEL_BRAND">{locale === 'en' ? 'Hotel brand' : 'Chuỗi khách sạn'}</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">{locale === 'en' ? 'Sort order' : 'Thứ tự hiển thị'}</label>
            <input type="number" value={form.sortOrder} onChange={(e) => set('sortOrder', e.target.value)} className={inputClass} />
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" checked={form.isVisible} onChange={(e) => set('isVisible', e.target.checked)} className="h-4 w-4 rounded accent-[#0f5bff]" />
          <span className="text-sm text-slate-600">{locale === 'en' ? 'Publicly visible' : 'Hiển thị công khai'}</span>
        </label>

        {msg ? (
          <div className={`rounded-2xl px-4 py-3 text-sm ${getMessageTone(msg) === 'success' ? 'border border-emerald-200 bg-emerald-50 text-emerald-700' : 'border border-red-200 bg-red-50 text-red-700'}`}>
            {msg}
          </div>
        ) : null}

        <div className="flex items-center justify-between pt-2">
          <button type="button" onClick={handleDelete} className="px-4 py-2 text-sm font-500 text-red-600 transition-colors hover:text-red-700">
            {copy.deletePartner}
          </button>
          <div className="flex gap-3">
            <button type="button" onClick={() => router.push(withAdminLocale('/admin/partners', locale))} className="btn-secondary rounded-2xl px-4 py-3 text-sm font-500">
              {copy.cancel}
            </button>
            <button type="submit" disabled={loading || uploading} className="btn-primary rounded-2xl px-6 py-3 text-sm font-600 disabled:opacity-50">
              {loading ? copy.saving : copy.save}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
