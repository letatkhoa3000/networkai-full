export type AdminImagePreset = 'logo' | 'hero' | 'thumbnail' | 'gallery'
export type AdminImageCrop = {
  x: number
  y: number
  width: number
  height: number
}

const PRESET_SIZES: Record<Exclude<AdminImagePreset, 'logo'>, { width: number; height: number; quality: number }> = {
  hero: { width: 1600, height: 900, quality: 0.9 },
  thumbnail: { width: 1600, height: 900, quality: 0.88 },
  gallery: { width: 1600, height: 900, quality: 0.88 },
}

export function getAdminImagePresetSize(preset: Exclude<AdminImagePreset, 'logo'>) {
  return PRESET_SIZES[preset]
}

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file)
    const image = new Image()

    image.onload = () => {
      URL.revokeObjectURL(objectUrl)
      resolve(image)
    }

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Failed to load image'))
    }

    image.src = objectUrl
  })
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('Failed to export image'))
    }, type, quality)
  })
}

function getCenteredSourceCrop(
  image: HTMLImageElement,
  targetWidth: number,
  targetHeight: number
) {
  const sourceAspect = image.width / image.height
  const targetAspect = targetWidth / targetHeight

  let width = image.width
  let height = image.height
  let x = 0
  let y = 0

  if (sourceAspect > targetAspect) {
    width = image.height * targetAspect
    x = (image.width - width) / 2
  } else {
    height = image.width / targetAspect
    y = (image.height - height) / 2
  }

  return { x, y, width, height }
}

function getSafeSourceCrop(image: HTMLImageElement, crop?: AdminImageCrop) {
  if (!crop) return null

  const x = Math.max(0, Math.min(crop.x, image.width - 1))
  const y = Math.max(0, Math.min(crop.y, image.height - 1))
  const width = Math.max(1, Math.min(crop.width, image.width - x))
  const height = Math.max(1, Math.min(crop.height, image.height - y))

  return { x, y, width, height }
}

export async function prepareAdminImage(file: File, preset: AdminImagePreset, crop?: AdminImageCrop) {
  if (file.type === 'image/svg+xml' || preset === 'logo') {
    return file
  }

  const config = PRESET_SIZES[preset]
  const image = await loadImage(file)
  const canvas = document.createElement('canvas')
  canvas.width = config.width
  canvas.height = config.height

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Canvas not supported')
  }

  const sourceCrop = getSafeSourceCrop(image, crop) ?? getCenteredSourceCrop(image, config.width, config.height)

  ctx.drawImage(
    image,
    sourceCrop.x,
    sourceCrop.y,
    sourceCrop.width,
    sourceCrop.height,
    0,
    0,
    config.width,
    config.height
  )

  const blob = await canvasToBlob(canvas, 'image/webp', config.quality)
  const baseName = file.name.replace(/\.[^.]+$/, '') || 'image'
  return new File([blob], `${baseName}.webp`, { type: 'image/webp' })
}
