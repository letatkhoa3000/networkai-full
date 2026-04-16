import SiteLayout from "@/components/SiteLayout";
import { SolutionsSection } from "@/components/Sections";
import { getContent } from "@/lib/site-content";

export default function SolutionsPage({ searchParams }) {
  const content = getContent(searchParams);
  return (
    <SiteLayout currentPath="/solutions" content={content}>
      <SolutionsSection content={content} />
    </SiteLayout>
  );
}