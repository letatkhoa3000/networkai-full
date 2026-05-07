function IconShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0b56c7_0%,#19d3d1_100%)] text-white shadow-[0_18px_32px_-20px_rgba(11,86,199,0.55)]">
      {children}
    </div>
  )
}

export default function ServiceIcon({
  value,
  title,
}: {
  value?: string | null
  title?: string | null
}) {
  const token = `${value || ''} ${title || ''}`.toLowerCase()

  if (token.includes('elv') || token.includes('cctv') || token.includes('security')) {
    return (
      <IconShell>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 7h16v8H4z" />
          <path d="M7 7V5h10v2" />
          <path d="M9 15l-2 4" />
          <path d="M15 15l2 4" />
          <path d="M10 11h4" />
        </svg>
      </IconShell>
    )
  }

  if (token.includes('smart') || token.includes('building') || token.includes('home')) {
    return (
      <IconShell>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 20h16" />
          <path d="M6 20V9l6-5 6 5v11" />
          <path d="M9 13h2" />
          <path d="M13 13h2" />
        </svg>
      </IconShell>
    )
  }

  if (token.includes('consult') || token.includes('review') || token.includes('audit')) {
    return (
      <IconShell>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M7 5h8l4 4v10H7z" />
          <path d="M15 5v4h4" />
          <path d="M10 13h6" />
          <path d="M10 17h4" />
        </svg>
      </IconShell>
    )
  }

  if (token.includes('install') || token.includes('config') || token.includes('deploy')) {
    return (
      <IconShell>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M14 7a4 4 0 0 0-5 5L4 17l3 3 5-5a4 4 0 0 0 5-5l-3 3-3-3 3-3z" />
        </svg>
      </IconShell>
    )
  }

  if (token.includes('maint') || token.includes('support') || token.includes('managed')) {
    return (
      <IconShell>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
          <path d="M9.5 12.5l1.7 1.7 3.3-4" />
        </svg>
      </IconShell>
    )
  }

  return (
    <IconShell>
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 7h7v5H4z" />
        <path d="M13 7h7v5h-7z" />
        <path d="M4 14h7v5H4z" />
        <path d="M13 14h7v5h-7z" />
      </svg>
    </IconShell>
  )
}
