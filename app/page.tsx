import PortfolioPage from '@/components/PortfolioPage';
import { getPortfolio } from '@/lib/db';
export const dynamic = 'force-dynamic';
export default async function Home() {
  const data = await getPortfolio().catch(error => { console.error('Portfolio loading failed:', error); return null; });
  if (!data) return <main className="unavailable"><h1>Portfolio temporarily unavailable.</h1><p>Please refresh the page in a moment.</p></main>;
  return <PortfolioPage initial={data.content} initialRevision={data.revision} adminEmail={process.env.ADMIN_EMAIL || ''} />;
}
