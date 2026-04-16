import Link from "next/link";
import { partnerLogos, projectDetails } from "@/lib/site-content";

export function SectionHeading({ eyebrow, title, desc, light = false }) {
  return (
    <div className="section-heading">
      <div className={`pill ${light ? "pill-light" : "pill-soft"}`}>{eyebrow}</div>
      <h2 style={light ? { color: "white" } : undefined}>{title}</h2>
      <p style={light ? { color: "rgba(255,255,255,0.82)" } : undefined}>{desc}</p>
    </div>
  );
}

export function HomeHero({ content }) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <div className="pill pill-light">{content.heroBadge}</div>
          <h1>{content.heroTitle}</h1>
          <p>{content.heroDesc}</p>
          <div className="hero-actions">
            <Link href="/solutions" className="cta-button">{content.heroPrimary}</Link>
            <Link href="/contact" className="outline-button">{content.heroSecondary}</Link>
          </div>
        </div>

        <div className="glass-panel">
          <div className="mini-grid">
            {content.productFeatures.slice(0, 4).map(([title, desc]) => (
              <div key={title} className="mini-card">
                <div className="icon-box" />
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function IntroStats({ content }) {
  return (
    <section className="section">
      <div className="container grid-2">
        <div className="card">
          <h3 style={{ marginTop: 0, fontSize: 28 }}>{content.homeMiniTitle}</h3>
          <p>{content.homeMiniDesc}</p>
        </div>
        <div className="grid-2">
          {content.stats.map(([value, label]) => (
            <div key={label} className="card">
              <div className="stat">{value}</div>
              <p style={{ margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection({ content }) {
  return (
    <section className="section">
      <div className="container">
        <div className="grid-2">
          <SectionHeading eyebrow={content.aboutEyebrow} title={content.aboutTitle} desc={content.aboutDesc} />
          <div className="card">
            <div className="icon-box" />
            <p>{content.aboutExtra}</p>
          </div>
        </div>

        <div className="grid-4" style={{ marginTop: 24 }}>
          {content.stats.map(([value, label]) => (
            <div key={label} className="card">
              <div className="stat">{value}</div>
              <p style={{ margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SolutionsSection({ content }) {
  return (
    <section className="section">
      <div className="container grid-2">
        <div className="dark-block">
          <div className="pill pill-light">{content.productEyebrow}</div>
          <h2 style={{ marginTop: 18, marginBottom: 0, fontSize: 38 }}>{content.productTitle}</h2>
          <div style={{ marginTop: 12, textTransform: "uppercase", letterSpacing: "0.2em", color: "#8cf5eb", fontSize: 12, fontWeight: 700 }}>
            {content.productTag}
          </div>
          <p style={{ marginTop: 18 }}>{content.productDesc}</p>
          <div className="stack-row">
            <a href="https://www.netargus.io/#" target="_blank" className="cta-button">{content.productPrimary}</a>
            <a href="https://www.netargus.io/#" target="_blank" className="outline-button">{content.productSecondary}</a>
          </div>
        </div>

        <div className="grid-2">
          {content.productFeatures.map(([title, desc]) => (
            <div key={title} className="feature-card">
              <div className="icon-box" />
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesSection({ content, locale }) {
  const process = locale === "en"
    ? [["01", "Assessment"], ["02", "Design"], ["03", "Deployment"], ["04", "Support"]]
    : [["01", "Khảo sát"], ["02", "Thiết kế"], ["03", "Triển khai"], ["04", "Hỗ trợ"]];

  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow={content.servicesEyebrow} title={content.servicesTitle} desc={content.servicesDesc} />
        <div className="grid-3" style={{ marginTop: 32 }}>
          {content.services.map(([title, desc]) => (
            <div key={title} className="service-card">
              <div className="icon-box" />
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>

        <div className="grid-2" style={{ marginTop: 28 }}>
          <div className="dark-block">
            <div className="pill pill-light">{locale === "en" ? "Working Process" : "Quy trình làm việc"}</div>
            <div className="grid-4" style={{ marginTop: 20 }}>
              {process.map(([step, label]) => (
                <div key={step} className="mini-card">
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#8cf5eb" }}>{step}</div>
                  <div style={{ marginTop: 8, color: "white", fontSize: 14 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="pill pill-soft">{locale === "en" ? "Delivered Value" : "Giá trị mang lại"}</div>
            <ul style={{ marginTop: 18, paddingLeft: 20, color: "#64748b", lineHeight: 1.9 }}>
              <li>{locale === "en" ? "Clear design documentation for smoother project coordination." : "Thiết kế rõ ràng, dễ phối hợp giữa các bên tham gia dự án."}</li>
              <li>{locale === "en" ? "Consistent systems that remain easy to operate after handover." : "Hệ thống đồng bộ, dễ vận hành và bảo trì sau bàn giao."}</li>
              <li>{locale === "en" ? "Reduced technical risk and improved end-user experience." : "Tối ưu rủi ro kỹ thuật và cải thiện trải nghiệm người dùng cuối."}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection({ content }) {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow={content.projectsEyebrow} title={content.projectsTitle} desc={content.projectsDesc} />
        <div className="grid-3" style={{ marginTop: 32 }}>
          {content.projects.map(([title, desc]) => (
            <div key={title} className="project-card">
              <h4>{title}</h4>
              <p>{desc}</p>
              {projectDetails[title] && (
                <div style={{ marginTop: 14, background: "#f8fafc", borderRadius: 18, padding: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#0369a1", textTransform: "uppercase", letterSpacing: "0.16em" }}>
                    {projectDetails[title].location}
                  </div>
                  <div className="tag-group">
                    {projectDetails[title].scope.map((item) => (
                      <span key={item} className="tag">{item}</span>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ marginTop: 16, color: "#0369a1", fontWeight: 700, fontSize: 14 }}>{content.detailLabel}</div>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginTop: 26 }}>
          <p style={{ margin: 0 }}>{content.ctaStrip}</p>
        </div>

        <div className="card" style={{ marginTop: 26 }}>
          <div className="pill pill-soft">Partners</div>
          <div className="grid-4" style={{ marginTop: 20 }}>
            {partnerLogos.map((name) => (
              <div key={name} className="partner-card" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 82, fontWeight: 700, color: "#64748b", letterSpacing: "0.08em" }}>
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}