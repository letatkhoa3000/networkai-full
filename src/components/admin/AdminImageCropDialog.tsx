'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AdminImageCrop } from '@/lib/admin-image-processing'

type CropDialogCopy = {
  title: string
  help: string
  zoomLabel: string
  resetLabel: string
  cancelLabel: string
  applyLabel: string
}

type AdminImageCropDialogProps = {
  open: boolean
  imageSrc: string | null
  aspectRatio: number
  copy: CropDialogCopy
  onClose: () => void
  onApply: (crop: AdminImageCrop) => void
}

const FRAME_WIDTH = 560

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export default function AdminImageCropDialog({
  open,
  imageSrc,
  aspectRatio,
  copy,
  onClose,
  onApply,
}: AdminImageCropDialogProps) {
  const dragStateRef = useRef<{ startX: number; startY: number; startOffsetX: number; startOffsetY: number } | null>(
    null
  )
  const [zoom, setZoom] = useState(1)
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  const frameHeight = Math.round(FRAME_WIDTH / aspectRatio)

  const coverSize = useMemo(() => {
    if (!imageSize.width || !imageSize.height) {
      return { width: FRAME_WIDTH, height: frameHeight }
    }

    const imageAspect = imageSize.width / imageSize.height
    if (imageAspect > aspectRatio) {
      const height = frameHeight
      const width = height * imageAspect
      return { width, height }
    }

    const width = FRAME_WIDTH
    const height = width / imageAspect
    return { width, height }
  }, [aspectRatio, frameHeight, imageSize.height, imageSize.width])

  const displaySize = useMemo(
    () => ({
      width: coverSize.width * zoom,
      height: coverSize.height * zoom,
    }),
    [coverSize.height, coverSize.width, zoom]
  )

  function clampOffsets(nextX: number, nextY: number) {
    return {
      x: clamp(nextX, FRAME_WIDTH - displaySize.width, 0),
      y: clamp(nextY, frameHeight - displaySize.height, 0),
    }
  }

  function resetTransform() {
    setZoom(1)
    setOffsetX(Math.min(0, (FRAME_WIDTH - coverSize.width) / 2))
    setOffsetY(Math.min(0, (frameHeight - coverSize.height) / 2))
  }

  useEffect(() => {
    if (!open) return

    setZoom(1)
    setOffsetX(0)
    setOffsetY(0)
    setImageSize({ width: 0, height: 0 })
  }, [open, imageSrc])

  useEffect(() => {
    if (!open || !imageSize.width || !imageSize.height) return

    const centeredX = Math.min(0, (FRAME_WIDTH - coverSize.width * zoom) / 2)
    const centeredY = Math.min(0, (frameHeight - coverSize.height * zoom) / 2)
    const clamped = clampOffsets(centeredX, centeredY)
    setOffsetX(clamped.x)
    setOffsetY(clamped.y)
  }, [coverSize.height, coverSize.width, frameHeight, imageSize.height, imageSize.width, open, zoom])

  useEffect(() => {
    const clamped = clampOffsets(offsetX, offsetY)
    if (clamped.x !== offsetX) setOffsetX(clamped.x)
    if (clamped.y !== offsetY) setOffsetY(clamped.y)
  }, [displaySize.height, displaySize.width, frameHeight, offsetX, offsetY])

  if (!open || !imageSrc) return null

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/55 p-6 backdrop-blur-sm">
      <div className="w-full max-w-4xl rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_40px_120px_rgba(15,23,42,0.25)]">
        <div className="mb-5 flex items-start justify-between gap-6">
          <div>
            <h3 className="text-xl font-700 text-slate-950">{copy.title}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{copy.help}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition-colors hover:border-slate-900 hover:text-slate-950"
          >
            {copy.cancelLabel}
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="rounded-[24px] border border-slate-200 bg-[#f8fbfe] p-5">
            <div className="flex justify-center">
              <div
                className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-white"
                style={{ width: FRAME_WIDTH, height: frameHeight, cursor: 'grab' }}
                onPointerDown={(event) => {
                  const target = event.currentTarget
                  target.setPointerCapture(event.pointerId)
                  dragStateRef.current = {
                    startX: event.clientX,
                    startY: event.clientY,
                    startOffsetX: offsetX,
                    startOffsetY: offsetY,
                  }
                }}
                onPointerMove={(event) => {
                  if (!dragStateRef.current) return
                  const deltaX = event.clientX - dragStateRef.current.startX
                  const deltaY = event.clientY - dragStateRef.current.startY
                  const clamped = clampOffsets(
                    dragStateRef.current.startOffsetX + deltaX,
                    dragStateRef.current.startOffsetY + deltaY
                  )
                  setOffsetX(clamped.x)
                  setOffsetY(clamped.y)
                }}
                onPointerUp={(event) => {
                  event.currentTarget.releasePointerCapture(event.pointerId)
                  dragStateRef.current = null
                }}
                onPointerLeave={() => {
                  dragStateRef.current = null
                }}
              >
                <img
                  src={imageSrc}
                  alt={copy.title}
                  draggable={false}
                  onLoad={(event) => {
                    setImageSize({
                      width: event.currentTarget.naturalWidth,
                      height: event.currentTarget.naturalHeight,
                    })
                  }}
                  className="pointer-events-none absolute select-none object-cover"
                  style={{
                    width: displaySize.width,
                    height: displaySize.height,
                    left: offsetX,
                    top: offsetY,
                  }}
                />
                <div className="pointer-events-none absolute inset-0 box-border border-[10px] border-black/18 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)]" />
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-[#f8fbfe] p-5">
            <div>
              <label className="mb-3 block text-xs uppercase tracking-[0.22em] text-slate-500">
                {copy.zoomLabel}
              </label>
              <input
                type="range"
                min="1"
                max="3"
                step="0.01"
                value={zoom}
                onChange={(event) => {
                  const nextZoom = Number(event.target.value)
                  setZoom(nextZoom)
                }}
                className="w-full accent-[#0f5bff]"
              />
              <div className="mt-2 text-sm text-slate-600">{Math.round(zoom * 100)}%</div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <button
                type="button"
                onClick={resetTransform}
                disabled={!imageSize.width || !imageSize.height}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-500 text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-950"
              >
                {copy.resetLabel}
              </button>
              <button
                type="button"
                disabled={!imageSize.width || !imageSize.height}
                onClick={() => {
                  const sourceX = (-offsetX / displaySize.width) * imageSize.width
                  const sourceY = (-offsetY / displaySize.height) * imageSize.height
                  const sourceWidth = (FRAME_WIDTH / displaySize.width) * imageSize.width
                  const sourceHeight = (frameHeight / displaySize.height) * imageSize.height

                  onApply({
                    x: sourceX,
                    y: sourceY,
                    width: sourceWidth,
                    height: sourceHeight,
                  })
                }}
                className="rounded-2xl bg-[#0f5bff] px-4 py-2.5 text-sm font-600 text-white transition-colors hover:bg-[#0848d6] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {copy.applyLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
