import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://harshawasthi.in'),
  title: 'Harsh Awasthi — AI, Research & Robotics',
  description: 'Projects, research, and experience in agentic AI, computer vision, and robotics by Harsh Awasthi.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Harsh Awasthi — AI, Research & Robotics', description: 'Projects, research, and experience in agentic AI, computer vision, and robotics.', url: 'https://harshawasthi.in', type: 'website' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
