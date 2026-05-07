type BrandLogoVariant = 'header' | 'footer' | 'admin' | 'iconOnly'

const FULL_LOGO_SRC = '/brand/logo-full.png'
const ICON_SRC = '/brand/logo-icon-solid.png'

const VARIANT_STYLES: Record<BrandLogoVariant, string> = {
  header: 'h-auto w-[250px] sm:w-[285px]',
  footer: 'h-auto w-[300px] sm:w-[360px]',
  admin: 'h-auto w-[205px]',
  iconOnly: 'h-10 w-10 rounded-lg object-contain',
}

export default function BrandLogo({
  variant = 'header',
  className = '',
  alt = 'NetworkAI Amazing Solutions',
}: {
  variant?: BrandLogoVariant
  className?: string
  alt?: string
}) {
  const src = variant === 'iconOnly' ? ICON_SRC : FULL_LOGO_SRC
  const classes = `${VARIANT_STYLES[variant]} object-contain ${className}`.trim()

  return <img src={src} alt={alt} className={classes} />
}
