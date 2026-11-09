import type { Metadata } from "next";
import { Google_Sans_Flex, Roboto } from "next/font/google";
import "./globals.css";

const display = Google_Sans_Flex({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Roboto({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://harshawasthi.in"),
  title: "Harsh Awasthi | Research & Engineering",
  description:
    "Research, projects and experience by Harsh Awasthi in machine learning, computer vision and autonomous robotics.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Harsh Awasthi | Research & Engineering",
    description:
      "Exploring machine learning, computer vision and autonomous systems.",
    url: "/",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
