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
  "Designing, securing, and optimizing IT/OT systems and computer networks for reliable and resilient industrial environments.";

const siteTitle =
  "Adriano Albert Muniz, Ph.D. | IT/OT Systems Engineer | Cybersecurity Professional | Computer Networks Researcher";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.adrianoalbert.com"),
  title: {
    default: siteTitle,
    template: "%s | Adriano Albert Muniz",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.adrianoalbert.com",
    siteName: "Adriano Albert Muniz",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
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
