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
  description: `Professional painting & decorating in ${site.location}. Interior, exterior, kitchen cabinet respraying & commercial work. ${site.guaranteeYears}-year guarantee. Get a free quote today.`,
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Painters & Decorators in ${site.location}`,
    description: `A flawless finish, guaranteed. Professional painters & decorators serving ${site.location} and surrounding areas.`,
    images: ["/images/s-l1600 (23).jpg"],
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.stats.rating,
    reviewCount: site.stats.reviewCount,
  },
  openingHours: "Mo-Sa 08:00-18:00",
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
