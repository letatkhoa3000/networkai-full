import SiteLayout from "@/components/SiteLayout";
import ContactForm from "@/components/ContactForm";
import { ContactInfoPanel } from "./panel";
import { getContent } from "@/lib/site-content";

export default function ContactPage({ searchParams }) {
  const content = getContent(searchParams);
  return (
    <SiteLayout currentPath="/contact" content={content}>
      <section className="section contact-section">
        <div className="container">
          <div className="section-heading">
            <div className="pill pill-light">{content.contactEyebrow}</div>
            <h2 style={{ color: "white", marginTop: 16 }}>{content.contactTitle}</h2>
            <p style={{ color: "rgba(255,255,255,0.82)" }}>{content.contactDesc}</p>
          </div>

          <div className="contact-grid">
            <ContactInfoPanel content={content} locale={content.locale} />
            <ContactForm content={content} locale={content.locale} />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}