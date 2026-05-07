'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminLocale, adminCopy, withAdminLocale } from '@/lib/admin-locale'
import AdminSingleImageField from '@/components/admin/AdminSingleImageField'
import { uploadAdminAsset, validateAdminUpload } from '@/lib/admin-upload'
import { AdminImageCrop, prepareAdminImage } from '@/lib/admin-image-processing'

function linesFromValue(value?: string[] | null) {
  return Array.isArray(value) ? value.join('\n') : ''
}

function FieldBlock({
  title,
  helper,
  valueVi,
  valueEn,
  onChangeVi,
  onChangeEn,
  inputClass,
}: {
  title: string
  helper: string
  valueVi: string
  valueEn: string
  onChangeVi: (value: string) => void
  onChangeEn: (value: string) => void
  inputClass: string
}) {
  return (
    <div className="surface-soft p-5">
      <div className="mb-4">
        <h3 className="text-sm font-700 text-[color:var(--text-strong)]">{title}</h3>
        <p className="mt-1 text-xs leading-6 text-[color:var(--text-muted)]">{helper}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-500 text-slate-600">Vietnamese</label>
          <textarea value={valueVi} onChange={(e) => onChangeVi(e.target.value)} rows={5} className={`${inputClass} min-h-[150px] resize-y`} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-500 text-slate-600">English</label>
          <textarea value={valueEn} onChange={(e) => onChangeEn(e.target.value)} rows={5} className={`${inputClass} min-h-[150px] resize-y`} />
        </div>
      </div>
    </div>
  )
}

export default function ServiceEditForm({ service, locale }: { service: any; locale: AdminLocale }) {
  const router = useRouter()
  const copy = adminCopy[locale].forms
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [msg, setMsg] = useState('')
  const [form, setForm] = useState({
    slug: service.slug ?? '',
    titleVi: service.titleVi ?? '',
    titleEn: service.titleEn ?? '',
    shortDescVi: service.shortDescVi ?? '',
    shortDescEn: service.shortDescEn ?? '',
    descriptionVi: service.descriptionVi ?? '',
    descriptionEn: service.descriptionEn ?? '',
    imageUrl: service.imageUrl ?? '',
    problemPointsVi: linesFromValue(service.problemPointsVi),
    problemPointsEn: linesFromValue(service.problemPointsEn),
    scopeItemsVi: linesFromValue(service.scopeItemsVi),
    scopeItemsEn: linesFromValue(service.scopeItemsEn),
    deliverablesVi: linesFromValue(service.deliverablesVi),
    deliverablesEn: linesFromValue(service.deliverablesEn),
    processStepsVi: linesFromValue(service.processStepsVi),
    processStepsEn: linesFromValue(service.processStepsEn),
    fitForVi: linesFromValue(service.fitForVi),
    fitForEn: linesFromValue(service.fitForEn),
    systemTagsVi: linesFromValue(service.systemTagsVi),
    systemTagsEn: linesFromValue(service.systemTagsEn),
    benefitsVi: linesFromValue(service.benefitsVi),
    benefitsEn: linesFromValue(service.benefitsEn),
    faqItemsVi: linesFromValue(service.faqItemsVi),
    faqItemsEn: linesFromValue(service.faqItemsEn),
    metaTitleVi: service.metaTitleVi ?? '',
    metaTitleEn: service.metaTitleEn ?? '',
    metaDescVi: service.metaDescVi ?? '',
    metaDescEn: service.metaDescEn ?? '',
    featured: service.featured ?? false,
    isVisible: service.isVisible ?? true,
  })

  function set(key: string, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function getMessageTone(message: string) {
    const successMessages: string[] = [copy.saved, copy.uploadSuccess, copy.optimizeSuccess]
    return successMessages.includes(message) ? 'success' : 'error'
  }

  async function handleImageUpload(file: File, crop?: AdminImageCrop) {
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
      const preparedFile = await prepareAdminImage(file, 'hero', crop)
      if (preparedFile.size > 5 * 1024 * 1024) {
        setMsg(copy.uploadTooLarge)
        return
      }

      const payload = await uploadAdminAsset(preparedFile, 'services')
      set('imageUrl', payload.url)
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
    const res = await fetch(`/api/admin/services/${service.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setMsg(copy.saved)
      router.refresh()
    } else {
      setMsg(copy.failed)
    }
    setLoading(false)
  }

  const inputClass = 'admin-input'

  const blockHelper =
    locale === 'en'
      ? 'One item per line. For FAQ, use `Question || Answer` on each line.'
      : 'Mỗi dòng là một ý. Với FAQ, nhập theo dạng `Câu hỏi || Câu trả lời` trên từng dòng.'

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl">
      <div className="admin-card space-y-5 p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Slug *</label>
            <input value={form.slug} onChange={(e) => set('slug', e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Service name (Vietnamese) *</label>
            <input value={form.titleVi} onChange={(e) => set('titleVi', e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Service name (English) *</label>
            <input value={form.titleEn} onChange={(e) => set('titleEn', e.target.value)} required className={inputClass} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Short description (Vietnamese)</label>
            <textarea value={form.shortDescVi} onChange={(e) => set('shortDescVi', e.target.value)} rows={3} className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Short description (English)</label>
            <textarea value={form.shortDescEn} onChange={(e) => set('shortDescEn', e.target.value)} rows={3} className={`${inputClass} resize-none`} />
          </div>
        </div>

        <AdminSingleImageField
          label="Hero image URL"
          value={form.imageUrl}
          buttonLabel={copy.uploadImage}
          uploadingLabel={copy.uploading}
          hint={copy.uploadImageHint}
          previewLabel={copy.currentImage}
          uploading={uploading}
          dropLabel={copy.dropFiles}
          dropHint={copy.dropFilesHint}
          cropTitle={copy.cropTitle}
          cropHelp={copy.cropHelp}
          cropZoomLabel={copy.cropZoom}
          cropResetLabel={copy.cropReset}
          cropCancelLabel={copy.cropCancel}
          cropApplyLabel={copy.cropApply}
          cropPreset="hero"
          onValueChange={(value) => set('imageUrl', value)}
          onFileSelect={handleImageUpload}
        />

        <FieldBlock
          title={locale === 'en' ? 'Problems solved' : 'Vấn đề dịch vụ giải quyết'}
          helper={blockHelper}
          valueVi={form.problemPointsVi}
          valueEn={form.problemPointsEn}
          onChangeVi={(value) => set('problemPointsVi', value)}
          onChangeEn={(value) => set('problemPointsEn', value)}
          inputClass={inputClass}
        />

        <FieldBlock
          title={locale === 'en' ? 'Scope of work' : 'Phạm vi công việc'}
          helper={blockHelper}
          valueVi={form.scopeItemsVi}
          valueEn={form.scopeItemsEn}
          onChangeVi={(value) => set('scopeItemsVi', value)}
          onChangeEn={(value) => set('scopeItemsEn', value)}
          inputClass={inputClass}
        />

        <FieldBlock
          title={locale === 'en' ? 'Deliverables' : 'Deliverables bàn giao'}
          helper={blockHelper}
          valueVi={form.deliverablesVi}
          valueEn={form.deliverablesEn}
          onChangeVi={(value) => set('deliverablesVi', value)}
          onChangeEn={(value) => set('deliverablesEn', value)}
          inputClass={inputClass}
        />

        <FieldBlock
          title={locale === 'en' ? 'Process steps' : 'Quy trình triển khai'}
          helper={blockHelper}
          valueVi={form.processStepsVi}
          valueEn={form.processStepsEn}
          onChangeVi={(value) => set('processStepsVi', value)}
          onChangeEn={(value) => set('processStepsEn', value)}
          inputClass={inputClass}
        />

        <FieldBlock
          title={locale === 'en' ? 'Best-fit project types' : 'Loại công trình phù hợp'}
          helper={blockHelper}
          valueVi={form.fitForVi}
          valueEn={form.fitForEn}
          onChangeVi={(value) => set('fitForVi', value)}
          onChangeEn={(value) => set('fitForEn', value)}
          inputClass={inputClass}
        />

        <FieldBlock
          title={locale === 'en' ? 'Related systems and technologies' : 'Hệ thống và công nghệ liên quan'}
          helper={blockHelper}
          valueVi={form.systemTagsVi}
          valueEn={form.systemTagsEn}
          onChangeVi={(value) => set('systemTagsVi', value)}
          onChangeEn={(value) => set('systemTagsEn', value)}
          inputClass={inputClass}
        />

        <FieldBlock
          title={locale === 'en' ? 'Expected outcomes' : 'Kết quả kỳ vọng'}
          helper={blockHelper}
          valueVi={form.benefitsVi}
          valueEn={form.benefitsEn}
          onChangeVi={(value) => set('benefitsVi', value)}
          onChangeEn={(value) => set('benefitsEn', value)}
          inputClass={inputClass}
        />

        <FieldBlock
          title="FAQ"
          helper={blockHelper}
          valueVi={form.faqItemsVi}
          valueEn={form.faqItemsEn}
          onChangeVi={(value) => set('faqItemsVi', value)}
          onChangeEn={(value) => set('faqItemsEn', value)}
          inputClass={inputClass}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Meta title (Vietnamese)</label>
            <input value={form.metaTitleVi} onChange={(e) => set('metaTitleVi', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Meta title (English)</label>
            <input value={form.metaTitleEn} onChange={(e) => set('metaTitleEn', e.target.value)} className={inputClass} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Meta description (Vietnamese)</label>
            <textarea value={form.metaDescVi} onChange={(e) => set('metaDescVi', e.target.value)} rows={3} className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Meta description (English)</label>
            <textarea value={form.metaDescEn} onChange={(e) => set('metaDescEn', e.target.value)} rows={3} className={`${inputClass} resize-none`} />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} className="h-4 w-4 rounded accent-[#0f5bff]" />
            <span className="text-sm text-slate-600">{locale === 'en' ? 'Featured on homepage' : 'Featured (hiển thị trang chủ)'}</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" checked={form.isVisible} onChange={(e) => set('isVisible', e.target.checked)} className="h-4 w-4 rounded accent-[#0f5bff]" />
            <span className="text-sm text-slate-600">{locale === 'en' ? 'Publicly visible' : 'Hiển thị công khai'}</span>
          </label>
        </div>

        {msg ? (
          <div className={`rounded-2xl px-4 py-3 text-sm ${getMessageTone(msg) === 'success' ? 'border border-emerald-200 bg-emerald-50 text-emerald-700' : 'border border-red-200 bg-red-50 text-red-700'}`}>
            {msg}
          </div>
        ) : null}

        <div className="flex items-center justify-end gap-3 pt-2">
          <button type="button" onClick={() => router.push(withAdminLocale('/admin/services', locale))} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-500 text-slate-600 transition-colors hover:border-slate-900 hover:text-slate-950">
            {copy.cancel}
          </button>
          <button type="submit" disabled={loading || uploading} className="rounded-2xl bg-[#0f5bff] px-6 py-3 text-sm font-600 text-white transition-colors hover:bg-[#0848d6] disabled:opacity-50">
            {loading ? copy.saving : copy.save}
          </button>
        </div>
      </div>
    </form>
  )
}
