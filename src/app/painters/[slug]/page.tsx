import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Clock,
  Hammer,
  Home,
  MapPin,
  PaintRoller,
  Phone,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Star,
  Wallpaper,
  type LucideIcon,
} from "lucide-react";
import { site } from "@/config/site";
import { slugify } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import CtaBand from "@/components/cta-band";

// Only pages listed in generateStaticParams exist — any other slug 404s.
export const dynamicParams = false;

type Location = (typeof site.locations)[number];

const serviceIcons: Record<string, LucideIcon> = {
  PaintRoller,
  Home,
  SprayCan,
  Building2,
  Wallpaper,
  Hammer,
};

const valueIcons: Record<string, LucideIcon> = {
  BadgeCheck,
  Clock,
  Sparkles,
  ShieldCheck,
};

function getLocation(slug: string): Location | undefined {
  return site.locations.find((l) => slugify(l.name) === slug);
}

// Same-county towns first (varies per page for natural internal linking),
// then fill from other counties. Capped so the block stays tidy.
function nearbyLocations(current: Location): Location[] {
  const sameCounty = site.locations.filter(
    (l) => l.county === current.county && l.name !== current.name
  );
  const others = site.locations.filter((l) => l.county !== current.county);
  return [...sameCounty, ...others].slice(0, 6);
}

export function generateStaticParams() {
  return site.locations.map((l) => ({ slug: slugify(l.name) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) return {};

  const title = `Painters in ${loc.name}, Co. ${loc.county}`;
  const description = `Professional painters & decorators in ${loc.name}, Co. ${loc.county}. ${site.name} offers interior & exterior painting, kitchen cabinet respraying and more — fixed-price quotes, ${site.stats.years}+ years' experience. Call ${site.phoneDisplay}.`;

  return {
    title,
    description,
    alternates: { canonical: `/painters/${slug}/` },
    openGraph: {
      type: "website",
      url: `${site.url}/painters/${slug}/`,
      title: `${title} | ${site.name}`,
      description,
      images: ["/images/s-l1600 (23).jpg"],
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const nearby = nearbyLocations(loc);
  const nearbyNames = nearby.slice(0, 3).map((l) => l.name);

  // Local-business structured data scoped to this town.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HousePainter",
    name: `${site.name} — ${loc.name}`,
    url: `${site.url}/painters/${slug}/`,
    telephone: site.phoneHref,
    email: site.email,
    image: `${site.url}/images/s-l1600 (23).jpg`,
    areaServed: { "@type": "City", name: `${loc.name}, Co. ${loc.county}` },
    address: {
      "@type": "PostalAddress",
      addressLocality: loc.name,
      addressRegion: `Co. ${loc.county}`,
      addressCountry: "IE",
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Areas We Cover",
        item: `${site.url}/painters/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Painters in ${loc.name}`,
        item: `${site.url}/painters/${slug}/`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Hero / intro */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/60 to-background">
        <div className="container py-14 lg:py-20">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 text-xs font-semibold text-muted-foreground"
          >
            <Link href="/" className="hover:text-accent">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/painters/" className="hover:text-accent">
              Areas We Cover
            </Link>{" "}
            / <span className="text-primary">{loc.name}</span>
          </nav>

          <p className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            <MapPin className="h-4 w-4" /> {loc.name}, Co. {loc.county}
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-primary text-balance sm:text-5xl">
            Professional Painters &amp; Decorators in {loc.name}
          </h1>

          <div className="mt-5 max-w-2xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              Looking for reliable painters in {loc.name}? {site.name} delivers
              spotless{" "}
              <Link
                href="/services/"
                className="font-semibold text-primary underline decoration-accent/40 underline-offset-2 hover:text-accent"
              >
                interior and exterior painting &amp; decorating
              </Link>{" "}
              across {loc.name} and the wider Co. {loc.county} area — with premium
              paints, proper preparation and a tidy finish every time.
            </p>
            <p>
              With{" "}
              <Link
                href="/about/"
                className="font-semibold text-primary underline decoration-accent/40 underline-offset-2 hover:text-accent"
              >
                over {site.stats.years} years&apos; experience
              </Link>
              , we cover everything from a single room to full home and commercial
              repaints, plus kitchen cabinet respraying. We also serve nearby areas
              like {nearbyNames.join(", ")}. Get a free, fixed-price quote today.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${site.phoneHref}`}
              className={buttonVariants({ variant: "accent", size: "lg" })}
            >
              <Phone className="h-4 w-4" />
              Call for a Free Quote
            </a>
            <Link
              href="/get-a-quote/"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Get a Quote Online
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-foreground/70">
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-accent" /> {site.stats.years}+
              years experience
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-accent" /> Fully insured &amp;
              guaranteed
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-accent" /> Free, no-obligation
              quotes
            </span>
          </div>
        </div>
      </section>

      {/* Services in this town */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Our painting services in {loc.name}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Every job in {loc.name} gets the same care: proper preparation,
            premium paints and a spotless tidy-up.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {site.services.map((service) => {
              const Icon = serviceIcons[service.icon] ?? PaintRoller;
              return (
                <Card key={service.title} className="flex flex-col">
                  <CardContent className="flex flex-1 flex-col">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/15">
                      <Icon className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="mt-6 text-xl font-extrabold text-primary">
                      {service.title}
                    </h3>
                    <p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground">
                      {service.blurb}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Link
            href="/services/"
            className="mt-10 inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-accent"
          >
            See all our painting services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container">
          <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Why {loc.name} homeowners choose {site.name}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {site.values.map((value) => {
              const Icon = valueIcons[value.icon] ?? BadgeCheck;
              return (
                <Card key={value.title}>
                  <CardContent>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="mt-4 text-base font-extrabold text-primary">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {value.text}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            What our customers say
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {site.reviews.map((review) => (
              <Card key={review.name}>
                <CardContent>
                  <div className="flex gap-0.5 text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-foreground/80">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <p className="mt-4 text-sm font-bold text-primary">
                    {review.name}
                    <span className="font-medium text-muted-foreground">
                      {" "}
                      · {review.area}
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby areas — internal links */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container">
          <h2 className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
            Painters near {loc.name}
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            We also cover these nearby areas:
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {nearby.map((l) => (
              <Link
                key={l.name}
                href={`/painters/${slugify(l.name)}/`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-primary shadow-xs transition-colors hover:border-accent hover:text-accent"
              >
                <MapPin className="h-3.5 w-3.5 text-accent" />
                Painters in {l.name}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="/painters/"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-accent"
            >
              View all areas we cover
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact/"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-accent"
            >
              Prefer to talk? Contact us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
