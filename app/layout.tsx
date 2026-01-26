import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Using Outfit for headings (modern, clean) and Inter for body
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  metadataBase: new URL('https://ctrlxharsh.github.io'),
  title: {
    default: "Harsh | AI/ML Engineer & Developer",
    template: "%s | Harsh",
  },
  description: "Portfolio of Harsh - Computer Vision, Agentic AI, and Systems Engineering. Explore projects, research, and achievements in AI/ML.",
  keywords: ["AI", "Machine Learning", "Computer Vision", "Agentic AI", "Portfolio", "Developer", "Engineer", "Deep Learning"],
  authors: [{ name: "Harsh" }],
  creator: "Harsh",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ctrlxharsh.github.io',
    siteName: 'Harsh Portfolio',
    title: 'Harsh | AI/ML Engineer & Developer',
    description: 'Portfolio of Harsh - Computer Vision, Agentic AI, and Systems Engineering. Explore projects, research, and achievements in AI/ML.',
    images: [
      {
        url: '/me/me.webp',
        width: 1200,
        height: 630,
        alt: 'Harsh - AI/ML Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harsh | AI/ML Engineer & Developer',
    description: 'Portfolio of Harsh - Computer Vision, Agentic AI, and Systems Engineering.',
    images: ['/me/me.webp'],
  },
  alternates: {
    canonical: 'https://ctrlxharsh.github.io',
  },
  verification: {
    google: 'l1kbiK6FCEK0qs2REkSevNIHTnSOxlPvytea7Pa9Fqc',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased selection:bg-accent selection:text-accent-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen flex flex-col">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
