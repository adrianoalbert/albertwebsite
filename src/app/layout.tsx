import type { Metadata } from "next";
import { IBM_Plex_Sans, Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import SiteChrome from "./components/SiteChrome";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const siteDescription =
  "Portfolio of Adriano Albert Muniz, Ph.D. — Lead IT/OT Systems Engineer specializing in cybersecurity, computer networks research, and industrial automation.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.adrianoalbert.com"),
  title: {
    default: "Adriano Albert Muniz, Ph.D. | Lead IT/OT Systems Engineer",
    template: "%s | Adriano Albert Muniz",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.adrianoalbert.com",
    siteName: "Adriano Albert Muniz",
    title: "Adriano Albert Muniz, Ph.D. | Lead IT/OT Systems Engineer",
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1920,
        height: 1080,
        alt: "Adriano Albert Muniz, Ph.D. — Lead IT/OT Systems Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adriano Albert Muniz, Ph.D. | Lead IT/OT Systems Engineer",
    description: siteDescription,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${ibmPlexSans.variable}`}>
      <body>
        <SiteChrome>{children}</SiteChrome>
        <Analytics />
      </body>
    </html>
  );
}
