import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import MobileCallBar from "@/components/mobile-call-bar";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Painters & Decorators in ${site.location}`,
    template: `%s | ${site.name}`,
  },
  description: `Professional painting & decorating across ${site.location}. Interior, exterior, kitchen cabinet respraying & commercial work. Get a free quote today.`,
  // Default canonical for the home page; other pages override via their own metadata.
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Painters & Decorators in ${site.location}`,
    description: `A flawless finish, guaranteed. Professional painters & decorators serving ${site.location} and surrounding areas.`,
    images: ["/images/s-l1600 (23).jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Painters & Decorators in ${site.location}`,
    description: `A flawless finish, guaranteed. Professional painters & decorators serving ${site.location} and surrounding areas.`,
    images: ["/images/s-l1600 (23).jpg"],
  },
  // Search-engine ownership verification. Paste the codes into Vercel env vars
  // (NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION / NEXT_PUBLIC_BING_SITE_VERIFICATION) when
  // you register the site in Google Search Console / Bing Webmaster Tools. Bing can
  // also simply "Import from Google Search Console" instead of using a code here.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : {},
  },
};

// Local-business structured data for Google
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HousePainter",
  name: site.name,
  url: site.url,
  telephone: site.phoneHref,
  email: site.email,
  image: `${site.url}/images/s-l1600 (23).jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location,
    addressCountry: "IE",
  },
  areaServed: [...site.areasServed],
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="bg-background font-sans text-foreground">
        <SiteHeader />
        <main className="pb-[4.5rem] md:pb-0">{children}</main>
        <SiteFooter />
        <MobileCallBar />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
