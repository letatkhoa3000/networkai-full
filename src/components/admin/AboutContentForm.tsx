'use client'

import { useState } from 'react'
import AdminSingleImageField from '@/components/admin/AdminSingleImageField'
import { AdminLocale, adminCopy } from '@/lib/admin-locale'
import { uploadAdminAsset, validateAdminUpload } from '@/lib/admin-upload'
import { AdminImageCrop, prepareAdminImage } from '@/lib/admin-image-processing'

function fontSizeOptions(locale: AdminLocale) {
  return [
    { value: 'sm', label: locale === 'en' ? 'Small' : 'Nhỏ' },
    { value: 'md', label: locale === 'en' ? 'Default' : 'Mặc định' },
    { value: 'lg', label: locale === 'en' ? 'Large' : 'Lớn' },
  ]
}

function mapSection(section: any) {
  return {
    key: 'about_full',
    titleVi: section?.titleVi ?? '',
    titleEn: section?.titleEn ?? '',
    titleSize: section?.titleSize ?? 'md',
    subtitleVi: section?.subtitleVi ?? '',
    subtitleEn: section?.subtitleEn ?? '',
    bodyVi: section?.bodyVi ?? '',
    bodyEn: section?.bodyEn ?? '',
    bodySize: section?.bodySize ?? 'md',
    ctaLabelVi: section?.ctaLabelVi ?? '',
    ctaLabelEn: section?.ctaLabelEn ?? '',
    ctaUrl: section?.ctaUrl ?? '',
    imageUrl: section?.imageUrl ?? '',
    sortOrder: section?.sortOrder?.toString() ?? '0',
    isVisible: section?.isVisible ?? true,
  }
}

function mapValue(value: any, index: number) {
  return {
    id: value?.id ?? '',
    titleVi: value?.titleVi ?? '',
    titleEn: value?.titleEn ?? '',
    titleSize: value?.titleSize ?? 'md',
    descriptionVi: value?.descriptionVi ?? '',
    descriptionEn: value?.descriptionEn ?? '',
    bodySize: value?.bodySize ?? 'md',
    sortOrder: value?.sortOrder?.toString() ?? String(index),
    isVisible: value?.isVisible ?? true,
  }
}

export default function AboutContentForm({
  locale,
  aboutSection,
  coreValues,
}: {
  locale: AdminLocale
  aboutSection: any
  coreValues: any[]
}) {
  const copy = adminCopy[locale].aboutPage
  const formCopy = adminCopy[locale].forms
  const sizeOptions = fontSizeOptions(locale)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [msg, setMsg] = useState('')
  const [section, setSection] = useState(() => mapSection(aboutSection))
  const [values, setValues] = useState(() => coreValues.map(mapValue))

  function updateValue(index: number, key: string, value: any) {
    setValues((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)))
  }

  function addValue() {
    setValues((prev) => [...prev, mapValue(null, prev.length + 1)])
  }

  function removeValue(index: number) {
    setValues((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleImageUpload(file: File, crop?: AdminImageCrop) {
    const validation = validateAdminUpload(file)
    if (validation === 'invalid-type') {
      setMsg(formCopy.uploadInvalidType)
      return
    }
    if (validation === 'too-large') {
      setMsg(formCopy.uploadTooLarge)
      return
    }

    setUploading(true)
    setMsg('')
    try {
      const preparedFile = await prepareAdminImage(file, 'hero', crop)
      if (preparedFile.size > 5 * 1024 * 1024) {
        setMsg(formCopy.uploadTooLarge)
        return
      }
      const payload = await uploadAdminAsset(preparedFile, 'site-content')
      setSection((prev) => ({ ...prev, imageUrl: payload.url }))
      setMsg(file.type === 'image/svg+xml' ? formCopy.uploadSuccess : formCopy.optimizeSuccess)
    } catch {
      setMsg(formCopy.uploadFailed)
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMsg('')

    const res = await fetch('/api/admin/site-content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sections: [
          {
            ...section,
            sortOrder: parseInt(section.sortOrder) || 0,
          },
        ],
        coreValues: values.map((value, index) => ({
          ...value,
          sortOrder: parseInt(value.sortOrder) || index,
        })),
      }),
    })

    setMsg(res.ok ? copy.saved : copy.failed)
    setLoading(false)
  }

  const inputClass = 'admin-input'
  const textareaClass = 'admin-input resize-none'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="admin-card p-6 sm:p-8">
        <h2 className="font-display text-2xl font-700 text-[color:var(--text-strong)]">{copy.sectionTitle}</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">Title (Vietnamese)</label>
            <input value={section.titleVi} onChange={(e) => setSection({ ...section, titleVi: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">Title (English)</label>
            <input value={section.titleEn} onChange={(e) => setSection({ ...section, titleEn: e.target.value })} className={inputClass} />
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">
              {locale === 'en' ? 'Title size' : 'Cỡ chữ tiêu đề'}
            </label>
            <select value={section.titleSize} onChange={(e) => setSection({ ...section, titleSize: e.target.value })} className={inputClass}>
              {sizeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">
              {locale === 'en' ? 'Body size' : 'Cỡ chữ nội dung'}
            </label>
            <select value={section.bodySize} onChange={(e) => setSection({ ...section, bodySize: e.target.value })} className={inputClass}>
              {sizeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">Subtitle (Vietnamese)</label>
            <input value={section.subtitleVi} onChange={(e) => setSection({ ...section, subtitleVi: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">Subtitle (English)</label>
            <input value={section.subtitleEn} onChange={(e) => setSection({ ...section, subtitleEn: e.target.value })} className={inputClass} />
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">Body (Vietnamese)</label>
            <textarea value={section.bodyVi} onChange={(e) => setSection({ ...section, bodyVi: e.target.value })} rows={6} className={textareaClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">Body (English)</label>
            <textarea value={section.bodyEn} onChange={(e) => setSection({ ...section, bodyEn: e.target.value })} rows={6} className={textareaClass} />
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">CTA Label (Vietnamese)</label>
            <input value={section.ctaLabelVi} onChange={(e) => setSection({ ...section, ctaLabelVi: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">CTA Label (English)</label>
            <input value={section.ctaLabelEn} onChange={(e) => setSection({ ...section, ctaLabelEn: e.target.value })} className={inputClass} />
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_160px]">
          <div>
            <label className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">CTA URL</label>
            <input value={section.ctaUrl} onChange={(e) => setSection({ ...section, ctaUrl: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">{locale === 'en' ? 'Order' : 'Thứ tự'}</label>
            <input type="number" value={section.sortOrder} onChange={(e) => setSection({ ...section, sortOrder: e.target.value })} className={inputClass} />
          </div>
        </div>

        <div className="mt-4">
          <AdminSingleImageField
            label={locale === 'en' ? 'Image' : 'Hình ảnh'}
            value={section.imageUrl}
            buttonLabel={formCopy.uploadImage}
            uploadingLabel={formCopy.uploading}
            hint={formCopy.uploadImageHint}
            previewLabel={formCopy.currentImage}
            uploading={uploading}
            dropLabel={formCopy.dropFiles}
            dropHint={formCopy.dropFilesHint}
            cropTitle={formCopy.cropTitle}
            cropHelp={formCopy.cropHelp}
            cropZoomLabel={formCopy.cropZoom}
            cropResetLabel={formCopy.cropReset}
            cropCancelLabel={formCopy.cropCancel}
            cropApplyLabel={formCopy.cropApply}
            cropPreset="hero"
            onValueChange={(value) => setSection({ ...section, imageUrl: value })}
            onFileSelect={handleImageUpload}
          />
        </div>

        <label className="mt-5 flex cursor-pointer items-center gap-2">
          <input type="checkbox" checked={section.isVisible} onChange={(e) => setSection({ ...section, isVisible: e.target.checked })} className="h-4 w-4 rounded accent-[#0f5bff]" />
          <span className="text-sm text-[color:var(--text-body)]">{locale === 'en' ? 'Publicly visible' : 'Hiển thị công khai'}</span>
        </label>
      </div>

      <div className="admin-card p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-700 text-[color:var(--text-strong)]">{copy.valuesTitle}</h2>
          <button
            type="button"
            onClick={addValue}
            className="btn-secondary rounded-2xl px-4 py-2 text-sm font-500"
          >
            {copy.addValue}
          </button>
        </div>

        <div className="mt-6 space-y-5">
          {values.map((value, index) => (
            <div key={value.id || `new-${index}`} className="surface-soft p-5">
              <div className="grid gap-4 md:grid-cols-[1fr_1fr_120px_auto]">
                <div>
                  <label className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">Title (Vietnamese)</label>
                  <input value={value.titleVi} onChange={(e) => updateValue(index, 'titleVi', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">Title (English)</label>
                  <input value={value.titleEn} onChange={(e) => updateValue(index, 'titleEn', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">{locale === 'en' ? 'Order' : 'Thứ tự'}</label>
                  <input type="number" value={value.sortOrder} onChange={(e) => updateValue(index, 'sortOrder', e.target.value)} className={inputClass} />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeValue(index)}
                    className="rounded-2xl px-4 py-3 text-sm font-500 text-red-500 transition-colors hover:text-red-600"
                  >
                    {copy.remove}
                  </button>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">
                    {locale === 'en' ? 'Title size' : 'Cỡ chữ tiêu đề'}
                  </label>
                  <select value={value.titleSize} onChange={(e) => updateValue(index, 'titleSize', e.target.value)} className={inputClass}>
                    {sizeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">
                    {locale === 'en' ? 'Body size' : 'Cỡ chữ nội dung'}
                  </label>
                  <select value={value.bodySize} onChange={(e) => updateValue(index, 'bodySize', e.target.value)} className={inputClass}>
                    {sizeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">Description (Vietnamese)</label>
                  <textarea value={value.descriptionVi} onChange={(e) => updateValue(index, 'descriptionVi', e.target.value)} rows={3} className={textareaClass} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-500 text-[color:var(--text-body)]">Description (English)</label>
                  <textarea value={value.descriptionEn} onChange={(e) => updateValue(index, 'descriptionEn', e.target.value)} rows={3} className={textareaClass} />
                </div>
              </div>

              <label className="mt-4 flex cursor-pointer items-center gap-2">
                <input type="checkbox" checked={value.isVisible} onChange={(e) => updateValue(index, 'isVisible', e.target.checked)} className="h-4 w-4 rounded accent-[#0f5bff]" />
                <span className="text-sm text-[color:var(--text-body)]">{locale === 'en' ? 'Publicly visible' : 'Hiển thị công khai'}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {msg ? (
        <div
          className={`rounded-2xl px-4 py-3 text-sm ${
            msg === copy.saved || msg === formCopy.uploadSuccess || msg === formCopy.optimizeSuccess
              ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
              : 'border border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {msg}
        </div>
      ) : null}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary rounded-2xl px-6 py-3 text-sm font-600 disabled:opacity-50"
        >
          {loading ? copy.saving : copy.save}
        </button>
      </div>
    </form>
  )
}
