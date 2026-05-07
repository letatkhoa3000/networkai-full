'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminLocale, adminCopy, withAdminLocale } from '@/lib/admin-locale'
import AdminSingleImageField from '@/components/admin/AdminSingleImageField'
import AdminGalleryField from '@/components/admin/AdminGalleryField'
import { uploadAdminAsset, validateAdminUpload } from '@/lib/admin-upload'
import { AdminImageCrop, prepareAdminImage } from '@/lib/admin-image-processing'

export default function ProjectEditForm({ project, locale }: { project: any; locale: AdminLocale }) {
  const router = useRouter()
  const copy = adminCopy[locale].forms
  const statusCopy = adminCopy[locale].projects.status
  const [loading, setLoading] = useState(false)
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false)
  const [uploadingGallery, setUploadingGallery] = useState(false)
  const [msg, setMsg] = useState('')
  const [form, setForm] = useState({
    sortOrder: project.sortOrder?.toString() ?? '0',
    slug: project.slug ?? '',
    nameVi: project.nameVi ?? '',
    nameEn: project.nameEn ?? '',
    shortDescVi: project.shortDescVi ?? '',
    shortDescEn: project.shortDescEn ?? '',
    thumbnailUrl: project.thumbnailUrl ?? '',
    imageUrlsText: Array.isArray(project.imageUrls) ? project.imageUrls.join('\n') : '',
    location: project.location ?? '',
    year: project.year?.toString() ?? '',
    hotelBrand: project.hotelBrand ?? '',
    status: project.status ?? 'COMPLETED',
    featured: project.featured ?? false,
    isVisible: project.isVisible ?? true,
    descriptionVi: project.descriptionVi ?? '',
    descriptionEn: project.descriptionEn ?? '',
    metaTitleVi: project.metaTitleVi ?? '',
    metaTitleEn: project.metaTitleEn ?? '',
    metaDescVi: project.metaDescVi ?? '',
    metaDescEn: project.metaDescEn ?? '',
  })

  function set(key: string, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function getMessageTone(message: string) {
    const successMessages: string[] = [copy.saved, copy.uploadSuccess, copy.optimizeSuccess]
    return successMessages.includes(message) ? 'success' : 'error'
  }

  async function handleThumbnailUpload(file: File, crop?: AdminImageCrop) {
    const validation = validateAdminUpload(file)
    if (validation === 'invalid-type') {
      setMsg(copy.uploadInvalidType)
      return
    }
    if (validation === 'too-large') {
      setMsg(copy.uploadTooLarge)
      return
    }

    setUploadingThumbnail(true)
    setMsg('')

    try {
      const preparedFile = await prepareAdminImage(file, 'thumbnail', crop)
      if (preparedFile.size > 5 * 1024 * 1024) {
        setMsg(copy.uploadTooLarge)
        return
      }

      const payload = await uploadAdminAsset(preparedFile, 'projects')
      set('thumbnailUrl', payload.url)
      setMsg(file.type === 'image/svg+xml' ? copy.uploadSuccess : copy.optimizeSuccess)
    } catch {
      setMsg(copy.uploadFailed)
    } finally {
      setUploadingThumbnail(false)
    }
  }

  async function handleGalleryUpload(files: File[]) {
    for (const file of files) {
      const validation = validateAdminUpload(file)
      if (validation === 'invalid-type') {
        setMsg(copy.uploadInvalidType)
        return
      }
      if (validation === 'too-large') {
        setMsg(copy.uploadTooLarge)
        return
      }
    }

    setUploadingGallery(true)
    setMsg('')

    try {
      const preparedFiles = await Promise.all(files.map((file) => prepareAdminImage(file, 'gallery')))
      const oversized = preparedFiles.some((file) => file.size > 5 * 1024 * 1024)
      if (oversized) {
        setMsg(copy.uploadTooLarge)
        return
      }

      const uploaded = await Promise.all(preparedFiles.map((file) => uploadAdminAsset(file, 'projects')))
      const existing = form.imageUrlsText
        .split('\n')
        .map((item: string) => item.trim())
        .filter(Boolean)
      const nextValue = [...existing, ...uploaded.map((item: { url: string }) => item.url)].join('\n')
      set('imageUrlsText', nextValue)
      setMsg(files.every((file) => file.type === 'image/svg+xml') ? copy.uploadSuccess : copy.optimizeSuccess)
    } catch {
      setMsg(copy.uploadFailed)
    } finally {
      setUploadingGallery(false)
    }
  }

  function handleRemoveGalleryUrl(targetUrl: string) {
    const nextValue = form.imageUrlsText
      .split('\n')
      .map((item: string) => item.trim())
      .filter((item: string) => item && item !== targetUrl)
      .join('\n')
    set('imageUrlsText', nextValue)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    const res = await fetch(`/api/admin/projects/${project.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        sortOrder: parseInt(form.sortOrder) || 0,
        year: form.year ? parseInt(form.year) : null,
        imageUrls: form.imageUrlsText
          .split('\n')
          .map((item: string) => item.trim())
          .filter(Boolean),
      }),
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
    if (!confirm(copy.confirmDeleteProject)) return
    const res = await fetch(`/api/admin/projects/${project.id}`, { method: 'DELETE' })
    if (res.ok) router.push(withAdminLocale('/admin/projects', locale))
  }

  const inputClass = 'admin-input'

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      <div className="admin-card space-y-5 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Slug *</label>
            <input value={form.slug} onChange={(e) => set('slug', e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Project name (Vietnamese) *</label>
            <input value={form.nameVi} onChange={(e) => set('nameVi', e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Project name (English) *</label>
            <input value={form.nameEn} onChange={(e) => set('nameEn', e.target.value)} required className={inputClass} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Short description (Vietnamese)</label>
            <textarea value={form.shortDescVi} onChange={(e) => set('shortDescVi', e.target.value)} rows={2} className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Short description (English)</label>
            <textarea value={form.shortDescEn} onChange={(e) => set('shortDescEn', e.target.value)} rows={2} className={`${inputClass} resize-none`} />
          </div>
        </div>

        <AdminSingleImageField
          label="Thumbnail URL"
          value={form.thumbnailUrl}
          buttonLabel={copy.uploadImage}
          uploadingLabel={copy.uploading}
          hint={copy.uploadImageHint}
          previewLabel={copy.currentImage}
          uploading={uploadingThumbnail}
          dropLabel={copy.dropFiles}
          dropHint={copy.dropFilesHint}
          cropTitle={copy.cropTitle}
          cropHelp={copy.cropHelp}
          cropZoomLabel={copy.cropZoom}
          cropResetLabel={copy.cropReset}
          cropCancelLabel={copy.cropCancel}
          cropApplyLabel={copy.cropApply}
          cropPreset="thumbnail"
          onValueChange={(value) => set('thumbnailUrl', value)}
          onFileSelect={handleThumbnailUpload}
        />

        <AdminGalleryField
          label="Gallery image URLs (one per line)"
          value={form.imageUrlsText}
          buttonLabel={copy.uploadImages}
          uploadingLabel={copy.uploading}
          hint={copy.uploadGalleryHint}
          previewLabel={copy.currentGallery}
          uploading={uploadingGallery}
          dropLabel={copy.dropFiles}
          dropHint={copy.dropFilesHint}
          removeLabel={copy.removeImage}
          onValueChange={(value) => set('imageUrlsText', value)}
          onFilesSelect={handleGalleryUpload}
          onRemoveUrl={handleRemoveGalleryUrl}
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">{locale === 'en' ? 'Location' : 'Địa điểm'}</label>
            <input value={form.location} onChange={(e) => set('location', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">{locale === 'en' ? 'Year' : 'Năm'}</label>
            <input value={form.year} onChange={(e) => set('year', e.target.value)} type="number" className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Hotel Brand</label>
            <input value={form.hotelBrand} onChange={(e) => set('hotelBrand', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">{locale === 'en' ? 'Sort order' : 'Thứ tự hiển thị'}</label>
            <input value={form.sortOrder} onChange={(e) => set('sortOrder', e.target.value)} type="number" className={inputClass} />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-500 text-slate-600">{locale === 'en' ? 'Status' : 'Trạng thái'}</label>
          <select value={form.status} onChange={(e) => set('status', e.target.value)} className={inputClass}>
            <option value="COMPLETED">{statusCopy.COMPLETED}</option>
            <option value="IN_PROGRESS">{statusCopy.IN_PROGRESS}</option>
            <option value="UPCOMING">{statusCopy.UPCOMING}</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-500 text-slate-600">Description (Vietnamese)</label>
          <textarea value={form.descriptionVi} onChange={(e) => set('descriptionVi', e.target.value)} rows={3} className={`${inputClass} resize-none`} />
        </div>

        <div>
          <label className="mb-2 block text-sm font-500 text-slate-600">Description (English)</label>
          <textarea value={form.descriptionEn} onChange={(e) => set('descriptionEn', e.target.value)} rows={3} className={`${inputClass} resize-none`} />
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
            <textarea value={form.metaDescVi} onChange={(e) => set('metaDescVi', e.target.value)} rows={2} className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-500 text-slate-600">Meta description (English)</label>
            <textarea value={form.metaDescEn} onChange={(e) => set('metaDescEn', e.target.value)} rows={2} className={`${inputClass} resize-none`} />
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

        <div className="flex items-center justify-between pt-2">
          <button type="button" onClick={handleDelete} className="px-4 py-2 text-sm font-500 text-red-600 transition-colors hover:text-red-700">
            {copy.deleteProject}
          </button>
          <div className="flex gap-3">
            <button type="button" onClick={() => router.push(withAdminLocale('/admin/projects', locale))} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-500 text-slate-600 transition-colors hover:border-slate-900 hover:text-slate-950">
              {copy.cancel}
            </button>
            <button type="submit" disabled={loading || uploadingThumbnail || uploadingGallery} className="rounded-2xl bg-[#0f5bff] px-6 py-3 text-sm font-600 text-white transition-colors hover:bg-[#0848d6] disabled:opacity-50">
              {loading ? copy.saving : copy.save}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
