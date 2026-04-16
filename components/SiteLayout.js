import Link from "next/link";
import Image from "next/image";

export default function SiteLayout({ children, currentPath = "/", content }) {
  return (
    <div className="site-shell">
      <header className="header">
        <div className="header-inner">
          <Link href="/" className="brand">
            <Image src="/logo.png" alt="NetworkAI logo" width={170} height={44} className="brand-logo" />
            <div className="brand-tag">Amazing Solutions</div>
          </Link>

          <nav className="nav">
            {content.nav.map((item) => (
              <Link key={item.href} href={item.href} className={currentPath === item.href ? "active" : ""}>
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/contact" className="cta-button">{content.consultationLabel}</Link>
        </div>
      </header>

      <main className="main">{children}</main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="brand">
            <Image src="/logo.png" alt="NetworkAI logo" width={170} height={44} className="brand-logo" />
            <div className="brand-tag">Amazing Solutions</div>
          </div>
          <div>{content.footerTagline}</div>
        </div>
      </footer>
    </div>
  );
}