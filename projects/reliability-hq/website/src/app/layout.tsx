import type { Metadata } from "next";
import { Inter, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  openGraph: {
    title: "Reliability HQ - Reliability Made Practical",
    description: "Professional RCM templates, tools, and training built by reliability engineers, for reliability engineers.",
    type: "website",
    locale: "en_GB",
    siteName: "Reliability HQ",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reliability HQ - Reliability Made Practical",
    description: "Professional RCM templates, tools, and training built by reliability engineers, for reliability engineers.",
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
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
