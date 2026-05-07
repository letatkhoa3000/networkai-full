const VENDOR_LOGOS: Record<string, string> = {
  Microsoft: '/vendor-logos/microsoft.svg',
  'Cisco Meraki': '/vendor-logos/cisco-meraki.svg',
  'HPE Aruba Networking': '/vendor-logos/hpe-aruba-networking.svg',
  Nutanix: '/vendor-logos/nutanix.jpg',
  CommScope: '/vendor-logos/commscope.svg',
  Dell: '/vendor-logos/dell-technologies.svg',
  LG: '/vendor-logos/lg.svg',
  Samsung: '/vendor-logos/samsung.png',
  Accor: '/vendor-logos/accor.png',
  'Hilton Hotels & Resorts': '/vendor-logos/hilton-hotels-resorts.svg',
  'IHG Hotels & Resorts': '/vendor-logos/ihg-hotels-resorts.svg',
  'Marriott International': '/vendor-logos/marriott-international.svg',
  Hyatt: '/vendor-logos/hyatt.svg',
  'Aman Resorts': '/vendor-logos/aman-resorts.svg',
}

export function resolvePartnerLogo(partner: { name: string; logoUrl?: string | null }) {
  const mapped = VENDOR_LOGOS[partner.name]

  if (mapped) return mapped
  if (partner.logoUrl && !partner.logoUrl.startsWith('/logos/')) return partner.logoUrl
  return null
}
