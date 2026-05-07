'use client'

import { useState } from 'react'
import AdminSingleImageField from '@/components/admin/AdminSingleImageField'
import { AdminLocale, adminCopy } from '@/lib/admin-locale'
import { uploadAdminAsset, validateAdminUpload } from '@/lib/admin-upload'
import { AdminImageCrop, prepareAdminImage } from '@/lib/admin-image-processing'

type SectionInput = {
  key: string
  titleVi: string
  titleEn: string
  titleSize: string
  subtitleVi: string
  subtitleEn: string
  bodyVi: string
  bodyEn: string
  bodySize: string
  ctaLabelVi: string
  ctaLabelEn: string
  ctaUrl: string
  imageUrl: string
  sortOrder: string
  isVisible: boolean
}

function mapSection(section: any, key: string): SectionInput {
  return {
    key,
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

function fontSizeOptions(locale: AdminLocale) {
  return [
    { value: 'sm', label: locale === 'en' ? 'Small' : 'Nhỏ' },
    { value: 'md', label: locale === 'en' ? 'Default' : 'Mặc định' },
    { value: 'lg', label: locale === 'en' ? 'Large' : 'Lớn' },
  ]
}

function SectionEditor({
  title,
  section,
  onChange,
  locale,
  uploading,
  onImageUpload,
}: {
  title: string
  section: SectionInput
  onChange: (next: SectionInput) => void
  locale: AdminLocale
  uploading: boolean
  onImageUpload: (file: File, crop?: AdminImageCrop) => void | Promise<void>
}) {
  const copy = adminCopy[locale].forms
  const sizeOptions = fontSizeOptions(locale)

  function set<K extends keyof SectionInput>(key: K, value: SectionInput[K]) {
    onChange({ ...section, [key]: value })
  }

  const inputClass = 'admin-input'

  return (
    <div className="admin-card p-6">
      <h2 className="font-display text-xl font-700 text-[color:var(--text-strong)]">{title}</h2>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-[color:var(--text-body)]">Title (Vietnamese)</label>
          <input
            value={section.titleVi}
            onChange={(e) => set('titleVi', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-[color:var(--text-body)]">Title (English)</label>
          <input
            value={section.titleEn}
            onChange={(e) => set('titleEn', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-[color:var(--text-body)]">
            {locale === 'en' ? 'Title size' : 'Cỡ chữ tiêu đề'}
          </label>
          <select
            value={section.titleSize}
            onChange={(e) => set('titleSize', e.target.value)}
            className={inputClass}
          >
            {sizeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-[color:var(--text-body)]">
            {locale === 'en' ? 'Body size' : 'Cỡ chữ nội dung'}
          </label>
          <select
            value={section.bodySize}
            onChange={(e) => set('bodySize', e.target.value)}
            className={inputClass}
          >
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
          <label className="mb-2 block text-sm text-[color:var(--text-body)]">Subtitle (Vietnamese)</label>
          <input
            value={section.subtitleVi}
            onChange={(e) => set('subtitleVi', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-[color:var(--text-body)]">Subtitle (English)</label>
          <input
            value={section.subtitleEn}
            onChange={(e) => set('subtitleEn', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-[color:var(--text-body)]">Body (Vietnamese)</label>
          <textarea
            value={section.bodyVi}
            onChange={(e) => set('bodyVi', e.target.value)}
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-[color:var(--text-body)]">Body (English)</label>
          <textarea
            value={section.bodyEn}
            onChange={(e) => set('bodyEn', e.target.value)}
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-[color:var(--text-body)]">CTA label (Vietnamese)</label>
          <input
            value={section.ctaLabelVi}
            onChange={(e) => set('ctaLabelVi', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-[color:var(--text-body)]">CTA label (English)</label>
          <input
            value={section.ctaLabelEn}
            onChange={(e) => set('ctaLabelEn', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_120px]">
        <div>
          <label className="mb-2 block text-sm text-[color:var(--text-body)]">CTA URL</label>
          <input
            value={section.ctaUrl}
            onChange={(e) => set('ctaUrl', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-[color:var(--text-body)]">
            {locale === 'en' ? 'Order' : 'Thứ tự'}
          </label>
          <input
            type="number"
            value={section.sortOrder}
            onChange={(e) => set('sortOrder', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-4">
        <AdminSingleImageField
          label={locale === 'en' ? 'Image' : 'Hình ảnh'}
          value={section.imageUrl}
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
          onFileSelect={onImageUpload}
        />
      </div>

      <label className="mt-4 flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          checked={section.isVisible}
          onChange={(e) => set('isVisible', e.target.checked)}
          className="h-4 w-4 rounded accent-brand-500"
        />
        <span className="text-sm text-[color:var(--text-body)]">
          {locale === 'en' ? 'Publicly visible' : 'Hiển thị công khai'}
        </span>
      </label>
    </div>
  )
}

export default function HomeContentForm({
  locale,
  hero,
  intro,
}: {
  locale: AdminLocale
  hero: any
  intro: any
}) {
  const copy = adminCopy[locale].home
  const formCopy = adminCopy[locale].forms
  const [loading, setLoading] = useState(false)
  const [uploadingKey, setUploadingKey] = useState<string | null>(null)
  const [msg, setMsg] = useState('')
  const [heroSection, setHeroSection] = useState(() => mapSection(hero, 'hero'))
  const [introSection, setIntroSection] = useState(() => mapSection(intro, 'about_short'))

  async function handleImageUpload(sectionKey: 'hero' | 'about_short', file: File, crop?: AdminImageCrop) {
    const validation = validateAdminUpload(file)
    if (validation === 'invalid-type') {
      setMsg(formCopy.uploadInvalidType)
      return
    }
    if (validation === 'too-large') {
      setMsg(formCopy.uploadTooLarge)
      return
    }

    setUploadingKey(sectionKey)
    setMsg('')

    try {
      const preparedFile = await prepareAdminImage(file, 'hero', crop)
      if (preparedFile.size > 5 * 1024 * 1024) {
        setMsg(formCopy.uploadTooLarge)
        return
      }

      const payload = await uploadAdminAsset(preparedFile, 'site-content')
      if (sectionKey === 'hero') {
        setHeroSection((prev) => ({ ...prev, imageUrl: payload.url }))
      } else {
        setIntroSection((prev) => ({ ...prev, imageUrl: payload.url }))
      }
      setMsg(file.type === 'image/svg+xml' ? formCopy.uploadSuccess : formCopy.optimizeSuccess)
    } catch {
      setMsg(formCopy.uploadFailed)
    } finally {
      setUploadingKey(null)
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
        sections: [heroSection, introSection].map((section) => ({
          ...section,
          sortOrder: parseInt(section.sortOrder) || 0,
        })),
      }),
    })

    setMsg(res.ok ? copy.saved : copy.failed)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <SectionEditor
        title={copy.heroTitle}
        section={heroSection}
        onChange={setHeroSection}
        locale={locale}
        uploading={uploadingKey === 'hero'}
        onImageUpload={(file, crop) => handleImageUpload('hero', file, crop)}
      />
      <SectionEditor
        title={copy.introTitle}
        section={introSection}
        onChange={setIntroSection}
        locale={locale}
        uploading={uploadingKey === 'about_short'}
        onImageUpload={(file, crop) => handleImageUpload('about_short', file, crop)}
      />

      {msg ? (
        <div className={`rounded-lg px-4 py-2.5 text-sm ${msg === copy.saved || msg === formCopy.uploadSuccess || msg === formCopy.optimizeSuccess ? 'border border-green-500/20 bg-green-500/10 text-green-400' : 'border border-red-500/20 bg-red-500/10 text-red-400'}`}>
          {msg}
        </div>
      ) : null}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary rounded-lg px-6 py-2.5 text-sm font-500 disabled:opacity-50"
        >
          {loading ? copy.saving : copy.save}
        </button>
      </div>
    </form>
  )
}
