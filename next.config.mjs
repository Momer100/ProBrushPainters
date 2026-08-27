/** @type {import('next').NextConfig} */
const nextConfig = {
  // Deployed as a normal Next.js app on Vercel so the /api/quote route can run
  // server-side (it sends the quote email via Resend). Static export is NOT used
  // because `output: "export"` strips out API routes.
  trailingSlash: true,
  images: {
    // Required for static export (no Next.js image optimization server).
    unoptimized: true,
  },
};

export default nextConfig;
