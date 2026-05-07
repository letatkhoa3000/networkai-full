import { existsSync, readFileSync } from 'fs'
import path from 'path'
import { Locale, localizeField } from '@/lib/site-locale'

export type ProductWorkflowStep = {
  titleVi: string
  titleEn: string
  bodyVi: string
  bodyEn: string
}

export type ProductFeature = {
  titleVi: string
  titleEn: string
  bodyVi: string
  bodyEn: string
}

export type ProductUseCase = {
  titleVi: string
  titleEn: string
  bodyVi: string
  bodyEn: string
}

export type ProductRecord = {
  slug: string
  nameVi: string
  nameEn: string
  categoryVi: string
  categoryEn: string
  shortDescVi: string
  shortDescEn: string
  descriptionVi: string
  descriptionEn: string
  metaTitleVi: string
  metaTitleEn: string
  metaDescVi: string
  metaDescEn: string
  primaryCtaVi: string
  primaryCtaEn: string
  secondaryCtaVi: string
  secondaryCtaEn: string
  demoBlurbVi: string
  demoBlurbEn: string
  previewImageUrl: string
  secondaryImageUrl: string
  capabilitiesVi: string[]
  capabilitiesEn: string[]
  problemAreasVi: string[]
  problemAreasEn: string[]
  features: ProductFeature[]
  workflow: ProductWorkflowStep[]
  useCases: ProductUseCase[]
}

export function getProductsFilePath() {
  return path.join(process.cwd(), 'src', 'content', 'products.json')
}

export function getProducts() {
  const filePath = getProductsFilePath()
  if (!existsSync(filePath)) return [] as ProductRecord[]

  const raw = readFileSync(filePath, 'utf8')
  const parsed = JSON.parse(raw)
  return Array.isArray(parsed) ? (parsed as ProductRecord[]) : []
}

export function getProductBySlug(slug: string) {
  return getProducts().find((product) => product.slug === slug)
}

export function getLocalizedProductName(locale: Locale, product: ProductRecord) {
  return localizeField(locale, product.nameVi, product.nameEn)
}
