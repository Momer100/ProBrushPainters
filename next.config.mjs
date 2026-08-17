/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the whole site is pre-rendered to plain HTML/CSS/JS.
  // Perfect for a marketing site with no server-side features — fast + cheap to host.
  output: "export",
  trailingSlash: true,
  images: {
    // Required for static export (no Next.js image optimization server).
    unoptimized: true,
  },
};

export default nextConfig;
