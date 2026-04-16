import SiteLayout from "@/components/SiteLayout";
import { AboutSection } from "@/components/Sections";
import { getContent } from "@/lib/site-content";

export default function AboutPage({ searchParams }) {
  const content = getContent(searchParams);
  return (
    <SiteLayout currentPath="/about" content={content}>
      <AboutSection content={content} />
    </SiteLayout>
  );
}