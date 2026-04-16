import SiteLayout from "@/components/SiteLayout";
import { HomeHero, IntroStats } from "@/components/Sections";
import { getContent } from "@/lib/site-content";

export default function HomePage({ searchParams }) {
  const content = getContent(searchParams);
  return (
    <SiteLayout currentPath="/" content={content}>
      <HomeHero content={content} />
      <IntroStats content={content} />
    </SiteLayout>
  );
}