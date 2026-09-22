import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  Clock,
  DoorOpen,
  Droplets,
  Hammer,
  Home,
  PaintBucket,
  Paintbrush,
  PaintRoller,
  Phone,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Wallpaper,
  type LucideIcon,
} from "lucide-react";
import { site } from "@/config/site";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import CtaBand from "@/components/cta-band";
import ProcessSection from "@/components/process-section";
import RelatedAreas from "@/components/related-areas";

export const dynamicParams = false;

type Service = (typeof site.services)[number];

const icons: Record<string, LucideIcon> = {
  PaintRoller,
  Home,
  SprayCan,
  Building2,
  Wallpaper,
  Hammer,
  DoorOpen,
  Paintbrush,
  PaintBucket,
  Droplets,
};

const valueIcons: Record<string, LucideIcon> = {
  BadgeCheck,
  Clock,
  Sparkles,
  ShieldCheck,
};

function getService(slug: string): Service | undefined {
  return site.services.find((s) => s.id === slug);
}

export function generateStaticParams() {
  return site.services.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const title = `${service.title} in ${site.location}`;
  return {
    title,
    description: service.long,
    alternates: { canonical: `/services/${service.id}/` },
    openGraph: {
      type: "website",
      url: `${site.url}/services/${service.id}/`,
      title: `${title} | ${site.name}`,
      description: service.long,
      images: ["/images/s-l1600 (23).jpg"],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = icons[service.icon] ?? PaintRoller;
  const others = site.services.filter((s) => s.id !== service.id);
  const serviceLower = service.title.toLowerCase();

  // FAQ — built only from confirmed facts + the service's own `includes` list. No price
  // figure, no timeframe. Rendered visibly AND mirrored in the FAQPage JSON-LD.
  const faqs = [
    {
      q: `Do you offer ${serviceLower} across Ireland?`,
      a: `Yes — ${site.name} provides ${serviceLower} for homes and businesses across Ireland. Call us on ${site.phoneDisplay} or use our online quote form for a free, no-obligation quote.`,
    },
    {
      q: `How much does ${serviceLower} cost?`,
      a: `Every job is priced individually based on the work involved. Use our online quote tool for a starting estimate, and we'll confirm a clear fixed price with no hidden extras.`,
    },
    {
      q: `What does your ${serviceLower} include?`,
      a: `It typically includes ${service.includes.join(", ").toLowerCase()}.`,
    },
    {
      q: `Are you insured?`,
      a: `Yes — ${site.name} is fully insured, with ${site.stats.years}+ years of experience and a workmanship guarantee on every job.`,
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: `${service.title} — ${site.name}`,
    description: service.long,
    url: `${site.url}/services/${service.id}/`,
    areaServed: { "@type": "Country", name: "Ireland" },
    provider: {
      "@type": "HousePainter",
      name: site.name,
      telephone: site.phoneHref,
      url: site.url,
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
        name: "Services",
        item: `${site.url}/services/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${site.url}/services/${service.id}/`,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero / intro */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/60 to-background">
        <div className="container py-14 lg:py-20">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 text-xs font-semibold text-muted-foreground"
          >
            <Link href="/" className="hover:text-accent">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/services/" className="hover:text-accent">
              Services
            </Link>{" "}
            / <span className="text-primary">{service.title}</span>
          </nav>

          <p className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            <Icon className="h-4 w-4" /> Painting &amp; Decorating
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-primary text-balance sm:text-5xl">
            Professional {service.title} in {site.location}
          </h1>

          <div className="mt-5 max-w-2xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>{service.long}</p>
            <p>
              Whether it&apos;s a single room or a full property, we prepare surfaces
              properly and use premium trade paints and materials for a durable,
              professional finish — for homeowners, landlords and businesses across{" "}
              {site.location}.
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

      {/* What's included */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            What&apos;s included
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {service.includes.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 shadow-xs"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15">
                  <Check className="h-4 w-4 text-accent" />
                </span>
                <span className="text-base font-semibold text-primary">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container">
          <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Why choose {site.name}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {site.values.map((value) => {
              const VIcon = valueIcons[value.icon] ?? BadgeCheck;
              return (
                <Card key={value.title}>
                  <CardContent>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
                      <VIcon className="h-6 w-6 text-accent" />
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

      {/* How it works */}
      <ProcessSection />

      {/* FAQ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container">
          <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            {service.title} — your questions answered
          </h2>
          <div className="mt-10 max-w-3xl space-y-5">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="rounded-2xl border border-border bg-white p-6 shadow-xs"
              >
                <h3 className="text-lg font-extrabold text-primary">{f.q}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <h2 className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
            Our other painting &amp; decorating services
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {others.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.id}/`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-primary shadow-xs transition-colors hover:border-accent hover:text-accent"
              >
                {s.title}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <RelatedAreas
        heading={`${service.title} across Ireland`}
        sub={`We provide ${service.title.toLowerCase()} and all our painting & decorating services in these areas.`}
      />

      <CtaBand />
    </>
  );
}
