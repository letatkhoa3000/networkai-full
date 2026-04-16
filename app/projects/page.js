import SiteLayout from "@/components/SiteLayout";
import { ProjectsSection } from "@/components/Sections";
import { getContent } from "@/lib/site-content";

export default function ProjectsPage({ searchParams }) {
  const content = getContent(searchParams);
  return (
    <SiteLayout currentPath="/projects" content={content}>
      <ProjectsSection content={content} />
    </SiteLayout>
  );
}