import type { Metadata } from "next";
import { Inter, Source_Sans_3 } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Reliability HQ - Reliability Made Practical",
  description: "Professional RCM templates, tools, and training built by reliability engineers, for reliability engineers. Based on SAE JA1011 standards. Ready to use today.",
  keywords: ["RCM", "reliability engineering", "FMEA", "maintenance", "SAE JA1011", "Moubray", "templates"],
  authors: [{ name: "Reliability HQ" }],
  icons: {
    icon: [
      { url: '/logo-icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/logo-icon.svg',
  },
  openGraph: {
    title: "Reliability HQ - Reliability Made Practical",
    description: "Free RCM training built by engineers, for engineers. SAE JA1011 compliant courses with interactive slides and quizzes.",
    type: "website",
    locale: "en_GB",
    siteName: "Reliability HQ",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Reliability HQ - Free RCM Training for Engineers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reliability HQ - Free RCM Training",
    description: "Free RCM training built by engineers, for engineers. SAE JA1011 compliant courses with interactive slides and quizzes.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${sourceSans.variable} font-body antialiased bg-off-white text-charcoal`}
      >
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
