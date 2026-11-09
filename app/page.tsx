import { getPortfolio } from "@/sanity/content";
import { SanityLive } from "@/sanity/client";
import { PortfolioPage } from "@/components/PortfolioPage";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ project?: string; research?: string }>;
}) {
  const [portfolio, params] = await Promise.all([getPortfolio(), searchParams]);
  const initial = params.project
    ? { kind: "project" as const, slug: params.project }
    : params.research
      ? { kind: "research" as const, slug: params.research }
      : null;
  return (
    <>
      <PortfolioPage data={portfolio} initial={initial} />
      <SanityLive action="refresh" />
    </>
  );
}
