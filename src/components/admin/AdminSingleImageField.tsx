'use client'

import { useMemo, useRef, useState } from 'react'
import AdminImageCropDialog from '@/components/admin/AdminImageCropDialog'
import { AdminImageCrop, AdminImagePreset, getAdminImagePresetSize } from '@/lib/admin-image-processing'

type AdminSingleImageFieldProps = {
  label: string
  value: string
  required?: boolean
  buttonLabel: string
  uploadingLabel: string
  hint: string
  previewLabel: string
  uploading: boolean
  dropLabel: string
  dropHint: string
  cropTitle: string
  cropHelp: string
  cropZoomLabel: string
  cropResetLabel: string
  cropCancelLabel: string
  cropApplyLabel: string
  cropPreset?: AdminImagePreset
  onValueChange: (value: string) => void
  onFileSelect: (file: File, crop?: AdminImageCrop) => void | Promise<void>
}

export default function AdminSingleImageField({
  label,
  value,
  required,
  buttonLabel,
  uploadingLabel,
  hint,
  previewLabel,
  uploading,
  dropLabel,
  dropHint,
  cropTitle,
  cropHelp,
  cropZoomLabel,
  cropResetLabel,
  cropCancelLabel,
  cropApplyLabel,
  cropPreset,
  onValueChange,
  onFileSelect,
}: AdminSingleImageFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null)

  const cropAspectRatio = useMemo(() => {
    if (!cropPreset || cropPreset === 'logo') return null
    const preset = getAdminImagePresetSize(cropPreset)
    return preset.width / preset.height
  }, [cropPreset])

  function closeCropDialog() {
    if (cropImageSrc) {
      URL.revokeObjectURL(cropImageSrc)
    }
    setCropImageSrc(null)
    setPendingFile(null)
  }

  async function handleFiles(files: FileList | null) {
    const file = files?.[0]
    if (!file) return

    if (!cropAspectRatio || file.type === 'image/svg+xml' || cropPreset === 'logo') {
      await onFileSelect(file)
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setPendingFile(file)
    setCropImageSrc(objectUrl)
  }

  return (
    <>
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
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            required={required}
            className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0f5bff]"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept=".svg,.png,.jpg,.jpeg,.webp,image/svg+xml,image/png,image/jpeg,image/webp"
            onChange={async (e) => {
              await handleFiles(e.target.files)
              e.target.value = ''
            }}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="shrink-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-500 text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading ? uploadingLabel : buttonLabel}
          </button>
        </div>
        <p className="mt-2 text-xs text-slate-500">{hint}</p>
        {value ? (
          <div className="mt-3 rounded-[22px] border border-slate-200 bg-[#f8fbfe] p-4">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-500">{previewLabel}</p>
            <img src={value} alt={previewLabel} className="max-h-24 w-auto object-contain" />
          </div>
        ) : null}
      </div>

      <AdminImageCropDialog
        open={!!pendingFile && !!cropImageSrc && !!cropAspectRatio}
        imageSrc={cropImageSrc}
        aspectRatio={cropAspectRatio || 16 / 9}
        copy={{
          title: cropTitle,
          help: cropHelp,
          zoomLabel: cropZoomLabel,
          resetLabel: cropResetLabel,
          cancelLabel: cropCancelLabel,
          applyLabel: cropApplyLabel,
        }}
        onClose={closeCropDialog}
        onApply={async (crop) => {
          if (!pendingFile) return
          await onFileSelect(pendingFile, crop)
          closeCropDialog()
        }}
      />
    </>
  )
}
