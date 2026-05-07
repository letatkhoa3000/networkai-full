'use client'

import { useRef, useState } from 'react'

type AdminGalleryFieldProps = {
  label: string
  value: string
  buttonLabel: string
  uploadingLabel: string
  hint: string
  previewLabel: string
  uploading: boolean
  dropLabel: string
  dropHint: string
  removeLabel: string
  onValueChange: (value: string) => void
  onFilesSelect: (files: File[]) => void | Promise<void>
  onRemoveUrl: (url: string) => void
}

export default function AdminGalleryField({
  label,
  value,
  buttonLabel,
  uploadingLabel,
  hint,
  previewLabel,
  uploading,
  dropLabel,
  dropHint,
  removeLabel,
  onValueChange,
  onFilesSelect,
  onRemoveUrl,
}: AdminGalleryFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const imageUrls = value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)

  async function handleFiles(files: FileList | File[]) {
    const normalized = Array.from(files ?? []).filter(Boolean)
    if (normalized.length) await onFilesSelect(normalized)
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-500 text-slate-600">{label}</label>
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={async (e) => {
          e.preventDefault()
          setIsDragging(false)
          await handleFiles(e.dataTransfer.files)
        }}
        className={`mb-3 rounded-[22px] border border-dashed p-4 transition-colors ${
          isDragging ? 'border-[#0f5bff]/60 bg-[#edf4ff]' : 'border-slate-200 bg-[#f8fbfe]'
        }`}
      >
        <p className="text-sm font-500 text-slate-800">{dropLabel}</p>
        <p className="mt-1 text-xs text-slate-500">{dropHint}</p>
      </div>
      <div className="mb-3 flex justify-end">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".svg,.png,.jpg,.jpeg,.webp,image/svg+xml,image/png,image/jpeg,image/webp"
          onChange={async (e) => {
            await handleFiles(e.target.files ?? [])
            e.target.value = ''
          }}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-500 text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading ? uploadingLabel : buttonLabel}
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        rows={4}
        className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0f5bff]"
      />
      <p className="mt-2 text-xs text-slate-500">{hint}</p>
      {imageUrls.length ? (
        <div className="mt-3 rounded-[22px] border border-slate-200 bg-[#f8fbfe] p-4">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-500">{previewLabel}</p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {imageUrls.map((url) => (
              <div key={url} className="overflow-hidden rounded-xl border border-slate-200 bg-white p-2">
                <img src={url} alt={previewLabel} className="h-24 w-full rounded-lg object-cover" />
                <button
                  type="button"
                  onClick={() => onRemoveUrl(url)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-500 text-slate-600 transition-colors hover:border-red-300 hover:text-red-600"
                >
                  {removeLabel}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
