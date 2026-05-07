import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { getProducts } from '@/lib/products'
import { safeDb } from '@/lib/safe-db'
import { absoluteUrl } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, projects] = await Promise.all([
    safeDb(
      'sitemap services',
      () =>
        prisma.service.findMany({
          where: { isVisible: true },
          select: { slug: true, updatedAt: true },
        }),
      []
    ),
    safeDb(
      'sitemap projects',
      () =>
        prisma.project.findMany({
          where: { isVisible: true },
          select: { slug: true, updatedAt: true },
        }),
      []
    ),
  ])

  const staticRoutes = ['/', '/about', '/services', '/products', '/projects', '/partners', '/contact']
  const productRoutes = getProducts()

  return [
    ...staticRoutes.flatMap((path) => [
      {
        url: absoluteUrl(path),
        lastModified: new Date(),
      },
      {
        url: absoluteUrl(path === '/' ? '/en' : `/en${path}`),
        lastModified: new Date(),
      },
    ]),
    ...services.flatMap((service) => [
      {
        url: absoluteUrl(`/services/${service.slug}`),
        lastModified: service.updatedAt,
      },
      {
        url: absoluteUrl(`/en/services/${service.slug}`),
        lastModified: service.updatedAt,
      },
    ]),
    ...projects.flatMap((project) => [
      {
        url: absoluteUrl(`/projects/${project.slug}`),
        lastModified: project.updatedAt,
      },
      {
        url: absoluteUrl(`/en/projects/${project.slug}`),
        lastModified: project.updatedAt,
      },
    ]),
    ...productRoutes.flatMap((product) => [
      {
        url: absoluteUrl(`/products/${product.slug}`),
        lastModified: new Date(),
      },
      {
        url: absoluteUrl(`/en/products/${product.slug}`),
        lastModified: new Date(),
      },
    ]),
  ]
}
