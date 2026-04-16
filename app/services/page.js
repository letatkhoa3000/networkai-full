import SiteLayout from "@/components/SiteLayout";
import { ServicesSection } from "@/components/Sections";
import { getContent } from "@/lib/site-content";

export default function ServicesPage({ searchParams }) {
  const content = getContent(searchParams);
  return (
    <SiteLayout currentPath="/services" content={content}>
      <ServicesSection content={content} locale={content.locale} />
    </SiteLayout>
  );
}