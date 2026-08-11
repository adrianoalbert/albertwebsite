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

export const metadata: Metadata = {
  title: "Lead IT/OT Systems Engineer | Experienced in Computer Networks Research",
  description: "Professional portfolio and blog of a Lead IT/OT Systems Engineer with expertise in computer networks research, cybersecurity, and industrial automation.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${ibmPlexSans.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
        <Analytics />
      </body>
    </html>
  );
}
