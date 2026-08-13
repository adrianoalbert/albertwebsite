/** @type {import('next').NextConfig} */
const securityHeaders = [
  // Block MIME sniffing (e.g. treating a download as executable JS)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Disallow embedding this site in iframes (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Limit referrer leakage on cross-origin navigations
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Turn off powerful browser features this site never uses
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // Isolate browsing context (helps against cross-origin attacks)
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // Practical CSP for Next.js + Vercel Analytics.
  // 'unsafe-inline' is required for App Router hydration without nonce middleware.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig = {
  images: {
    unoptimized: true,
    domains: [
      "www.credly.com",
      "learn.microsoft.com",
      "images.credly.com",
      "media.licdn.com",
      "www.youracclaim.com",
    ],
  },
  experimental: {
    serverComponentsExternalPackages: [],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig; 