'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminLocale, adminCopy, withAdminLocale } from '@/lib/admin-locale'
import type { ProductRecord } from '@/lib/products'
import AdminSingleImageField from '@/components/admin/AdminSingleImageField'
import { uploadAdminAsset, validateAdminUpload } from '@/lib/admin-upload'
import { AdminImageCrop, prepareAdminImage } from '@/lib/admin-image-processing'

function linesFromValue(value?: string[] | null) {
  return Array.isArray(value) ? value.join('\n') : ''
}

function structuredFromValue(
  value: Array<{ titleVi: string; titleEn: string; bodyVi: string; bodyEn: string }> | undefined,
  locale: 'vi' | 'en',
) {
  return (value ?? [])
    .map((item) => `${locale === 'en' ? item.titleEn : item.titleVi} || ${locale === 'en' ? item.bodyEn : item.bodyVi}`)
    .join('\n')
}

function parseLines(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

function parseStructured(vi: string, en: string) {
  const viLines = parseLines(vi)
  const enLines = parseLines(en)
  const total = Math.max(viLines.length, enLines.length)

  return Array.from({ length: total }, (_, index) => {
    const [titleVi = '', bodyVi = ''] = viLines[index]?.split('||').map((part) => part.trim()) ?? []
    const [titleEn = '', bodyEn = ''] = enLines[index]?.split('||').map((part) => part.trim()) ?? []
    return { titleVi, titleEn, bodyVi, bodyEn }
  }).filter((item) => item.titleVi || item.titleEn || item.bodyVi || item.bodyEn)
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

export default function ProductEditForm({ product, locale }: { product: ProductRecord; locale: AdminLocale }) {
  const router = useRouter()
  const copy = adminCopy[locale].forms
  const [loading, setLoading] = useState(false)
  const [uploadingPreview, setUploadingPreview] = useState(false)
  const [uploadingSecondary, setUploadingSecondary] = useState(false)
  const [msg, setMsg] = useState('')
  const [form, setForm] = useState({
    slug: product.slug,
    nameVi: product.nameVi,
    nameEn: product.nameEn,
    categoryVi: product.categoryVi,
    categoryEn: product.categoryEn,
    shortDescVi: product.shortDescVi,
    shortDescEn: product.shortDescEn,
    descriptionVi: product.descriptionVi,
    descriptionEn: product.descriptionEn,
    metaTitleVi: product.metaTitleVi,
    metaTitleEn: product.metaTitleEn,
    metaDescVi: product.metaDescVi,
    metaDescEn: product.metaDescEn,
    primaryCtaVi: product.primaryCtaVi,
    primaryCtaEn: product.primaryCtaEn,
    secondaryCtaVi: product.secondaryCtaVi,
    secondaryCtaEn: product.secondaryCtaEn,
    demoBlurbVi: product.demoBlurbVi,
    demoBlurbEn: product.demoBlurbEn,
    previewImageUrl: product.previewImageUrl,
    secondaryImageUrl: product.secondaryImageUrl,
    capabilitiesVi: linesFromValue(product.capabilitiesVi),
    capabilitiesEn: linesFromValue(product.capabilitiesEn),
    problemAreasVi: linesFromValue(product.problemAreasVi),
    problemAreasEn: linesFromValue(product.problemAreasEn),
    featuresVi: structuredFromValue(product.features, 'vi'),
    featuresEn: structuredFromValue(product.features, 'en'),
    workflowVi: structuredFromValue(product.workflow, 'vi'),
    workflowEn: structuredFromValue(product.workflow, 'en'),
    useCasesVi: structuredFromValue(product.useCases, 'vi'),
    useCasesEn: structuredFromValue(product.useCases, 'en'),
  })

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function getMessageTone(message: string) {
    const successMessages: string[] = [copy.saved, copy.uploadSuccess, copy.optimizeSuccess]
    return successMessages.includes(message) ? 'success' : 'error'
  }

  async function handleUpload(
    file: File,
    field: 'previewImageUrl' | 'secondaryImageUrl',
    setUploading: (value: boolean) => void,
    crop?: AdminImageCrop,
  ) {
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
      const payload = await uploadAdminAsset(preparedFile, 'products')
      set(field, payload.url)
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

    const payload = {
      ...form,
      capabilitiesVi: parseLines(form.capabilitiesVi),
      capabilitiesEn: parseLines(form.capabilitiesEn),
      problemAreasVi: parseLines(form.problemAreasVi),
      problemAreasEn: parseLines(form.problemAreasEn),
      features: parseStructured(form.featuresVi, form.featuresEn),
      workflow: parseStructured(form.workflowVi, form.workflowEn),
      useCases: parseStructured(form.useCasesVi, form.useCasesEn),
    }

    const res = await fetch(`/api/admin/products/${product.slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      setMsg(copy.saved)
      if (form.slug !== product.slug) {
        router.push(withAdminLocale(`/admin/products/${form.slug}/edit`, locale))
      }
      router.refresh()
    } else {
      setMsg(copy.failed)
    }

    setLoading(false)
  }

  const inputClass = 'admin-input'
  const lineHelper = locale === 'en' ? 'One item per line.' : 'Mỗi dòng là một ý.'
  const structuredHelper = locale === 'en' ? 'One item per line. Use `Title || Body`.' : 'Mỗi dòng là một ý. Nhập dạng `Tiêu đề || Nội dung`.'

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl">
      <div className="admin-card space-y-5 p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Slug *</label>
            <input value={form.slug} onChange={(e) => set('slug', e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Product name (Vietnamese) *</label>
            <input value={form.nameVi} onChange={(e) => set('nameVi', e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Product name (English) *</label>
            <input value={form.nameEn} onChange={(e) => set('nameEn', e.target.value)} required className={inputClass} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Category (Vietnamese)</label>
            <input value={form.categoryVi} onChange={(e) => set('categoryVi', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Category (English)</label>
            <input value={form.categoryEn} onChange={(e) => set('categoryEn', e.target.value)} className={inputClass} />
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

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Description (Vietnamese)</label>
            <textarea value={form.descriptionVi} onChange={(e) => set('descriptionVi', e.target.value)} rows={4} className={`${inputClass} resize-y`} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Description (English)</label>
            <textarea value={form.descriptionEn} onChange={(e) => set('descriptionEn', e.target.value)} rows={4} className={`${inputClass} resize-y`} />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <AdminSingleImageField
            label="Preview image"
            value={form.previewImageUrl}
            buttonLabel={copy.uploadImage}
            uploadingLabel={copy.uploading}
            hint={copy.uploadImageHint}
            previewLabel={copy.currentImage}
            uploading={uploadingPreview}
            dropLabel={copy.dropFiles}
            dropHint={copy.dropFilesHint}
            cropTitle={copy.cropTitle}
            cropHelp={copy.cropHelp}
            cropZoomLabel={copy.cropZoom}
            cropResetLabel={copy.cropReset}
            cropCancelLabel={copy.cropCancel}
            cropApplyLabel={copy.cropApply}
            cropPreset="hero"
            onValueChange={(value) => set('previewImageUrl', value)}
            onFileSelect={(file, crop) => handleUpload(file, 'previewImageUrl', setUploadingPreview, crop)}
          />

          <AdminSingleImageField
            label="Secondary image"
            value={form.secondaryImageUrl}
            buttonLabel={copy.uploadImage}
            uploadingLabel={copy.uploading}
            hint={copy.uploadImageHint}
            previewLabel={copy.currentImage}
            uploading={uploadingSecondary}
            dropLabel={copy.dropFiles}
            dropHint={copy.dropFilesHint}
            cropTitle={copy.cropTitle}
            cropHelp={copy.cropHelp}
            cropZoomLabel={copy.cropZoom}
            cropResetLabel={copy.cropReset}
            cropCancelLabel={copy.cropCancel}
            cropApplyLabel={copy.cropApply}
            cropPreset="hero"
            onValueChange={(value) => set('secondaryImageUrl', value)}
            onFileSelect={(file, crop) => handleUpload(file, 'secondaryImageUrl', setUploadingSecondary, crop)}
          />
        </div>

        <FieldBlock
          title="Capabilities"
          helper={lineHelper}
          valueVi={form.capabilitiesVi}
          valueEn={form.capabilitiesEn}
          onChangeVi={(value) => set('capabilitiesVi', value)}
          onChangeEn={(value) => set('capabilitiesEn', value)}
          inputClass={inputClass}
        />

        <FieldBlock
          title={locale === 'en' ? 'Problem areas' : 'Điểm nghẽn vận hành'}
          helper={lineHelper}
          valueVi={form.problemAreasVi}
          valueEn={form.problemAreasEn}
          onChangeVi={(value) => set('problemAreasVi', value)}
          onChangeEn={(value) => set('problemAreasEn', value)}
          inputClass={inputClass}
        />

        <FieldBlock
          title="Features"
          helper={structuredHelper}
          valueVi={form.featuresVi}
          valueEn={form.featuresEn}
          onChangeVi={(value) => set('featuresVi', value)}
          onChangeEn={(value) => set('featuresEn', value)}
          inputClass={inputClass}
        />

        <FieldBlock
          title={locale === 'en' ? 'Workflow' : 'Luồng vận hành'}
          helper={structuredHelper}
          valueVi={form.workflowVi}
          valueEn={form.workflowEn}
          onChangeVi={(value) => set('workflowVi', value)}
          onChangeEn={(value) => set('workflowEn', value)}
          inputClass={inputClass}
        />

        <FieldBlock
          title={locale === 'en' ? 'Use cases' : 'Môi trường phù hợp'}
          helper={structuredHelper}
          valueVi={form.useCasesVi}
          valueEn={form.useCasesEn}
          onChangeVi={(value) => set('useCasesVi', value)}
          onChangeEn={(value) => set('useCasesEn', value)}
          inputClass={inputClass}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Primary CTA (Vietnamese)</label>
            <input value={form.primaryCtaVi} onChange={(e) => set('primaryCtaVi', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Primary CTA (English)</label>
            <input value={form.primaryCtaEn} onChange={(e) => set('primaryCtaEn', e.target.value)} className={inputClass} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Secondary CTA (Vietnamese)</label>
            <input value={form.secondaryCtaVi} onChange={(e) => set('secondaryCtaVi', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Secondary CTA (English)</label>
            <input value={form.secondaryCtaEn} onChange={(e) => set('secondaryCtaEn', e.target.value)} className={inputClass} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Demo blurb (Vietnamese)</label>
            <textarea value={form.demoBlurbVi} onChange={(e) => set('demoBlurbVi', e.target.value)} rows={4} className={`${inputClass} resize-y`} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Demo blurb (English)</label>
            <textarea value={form.demoBlurbEn} onChange={(e) => set('demoBlurbEn', e.target.value)} rows={4} className={`${inputClass} resize-y`} />
          </div>
        </div>

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

        {msg ? (
          <div className={`rounded-2xl px-4 py-3 text-sm ${getMessageTone(msg) === 'success' ? 'border border-emerald-200 bg-emerald-50 text-emerald-700' : 'border border-red-200 bg-red-50 text-red-700'}`}>
            {msg}
          </div>
        ) : null}

        <div className="flex items-center justify-end gap-3 pt-2">
          <button type="button" onClick={() => router.push(withAdminLocale('/admin/products', locale))} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-500 text-slate-600 transition-colors hover:border-slate-900 hover:text-slate-950">
            {copy.cancel}
          </button>
          <button type="submit" disabled={loading || uploadingPreview || uploadingSecondary} className="rounded-2xl bg-[#0f5bff] px-6 py-3 text-sm font-600 text-white transition-colors hover:bg-[#0848d6] disabled:opacity-50">
            {loading ? copy.saving : copy.save}
          </button>
        </div>
      </div>
    </form>
  )
}
