import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
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
import { buttonVariants } from "@/components/ui/button";
import CtaBand from "@/components/cta-band";
import ProcessSection from "@/components/process-section";
import RelatedAreas from "@/components/related-areas";
import { getServiceBySlug, getServices } from "@/../sanity/lib/data";
import { urlFor } from "@/../sanity/lib/image";

export const dynamicParams = true;

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

export async function generateStaticParams() {
  const sanityServices = await getServices();
  const slugs = new Set([
    ...site.services.map((s) => s.id),
    ...(sanityServices || []).map((s: any) => s.id),
  ]);
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};

  const title = service.metaTitle || `${service.title} in ${site.location}`;
  const description = service.metaDescription || service.long;
  return {
    title,
    description,
    alternates: { canonical: `/services/${service.id}/` },
    openGraph: {
      type: "website",
      url: `${site.url}/services/${service.id}/`,
      title: `${title} | ${site.name}`,
      description,
      images: service.heroImage?.url ? [service.heroImage.url] : ["/images/s-l1600 (23).jpg"],
    },
  };
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref && !value?.url) {
        return null;
      }
      const imageUrl = value.url || urlFor(value).url();
      return (
        <div className="relative my-8 aspect-video overflow-hidden rounded-xl border border-border/60 bg-muted shadow-sm">
          <Image
            src={imageUrl}
            alt={value.alt || "Service illustration"}
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value?.href?.startsWith("/") ? "noreferrer noopener" : undefined;
      const target = !value?.href?.startsWith("/") ? "_blank" : undefined;
      return (
        <a href={value?.href} rel={rel} target={target} className="font-semibold text-accent underline underline-offset-4 hover:text-accent/80 transition-colors">
          {children}
        </a>
      );
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="mt-12 mb-5 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl border-b border-border/60 pb-3">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mt-8 mb-3 text-xl font-bold tracking-tight text-primary sm:text-2xl">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-5 leading-relaxed text-muted-foreground text-base sm:text-lg">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-8 rounded-r-xl border-l-4 border-accent bg-secondary/30 py-4 px-6 italic text-foreground/90 text-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-6 list-outside list-disc space-y-2 pl-6 text-muted-foreground text-base sm:text-lg">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="mb-6 list-outside list-decimal space-y-2 pl-6 text-muted-foreground text-base sm:text-lg">
        {children}
      </ol>
    ),
  },
};

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = icons[service.icon] ?? PaintRoller;
  const others = site.services.filter((s) => s.id !== service.id);
  const serviceLower = service.title.toLowerCase();

  const defaultFaqs = [
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

  const faqs = service.faqs && service.faqs.length > 0
    ? service.faqs.map((f: any) => ({ q: f.question, a: f.answer }))
    : (service.faqs === null ? defaultFaqs : []);

  const faqJsonLd = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f: { q: string; a: string }) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  } : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: `${service.title} — ${site.name}`,
    description: service.metaDescription || service.long,
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
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 via-background to-background pt-10 pb-14 lg:pt-14 lg:pb-20">
        <div className="container">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center space-x-2 text-xs font-semibold text-muted-foreground"
          >
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services/" className="hover:text-accent transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-primary">{service.title}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-accent">
                <Icon className="h-4 w-4" /> Painting &amp; Decorating
              </p>

              <h1 className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-primary text-balance sm:text-4xl lg:text-5xl">
                {service.heroHeadline || `Professional ${service.title} in ${site.location}`}
              </h1>

              <div className="mt-5 space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                {service.heroText ? (
                  <p className="whitespace-pre-line">{service.heroText}</p>
                ) : (
                  <>
                    <p>{service.long}</p>
                    <p>
                      Whether it&apos;s a single room refresh or a full commercial repaint, our skilled team prepares every surface properly and applies premium trade finishes built for longevity across {site.location}.
                    </p>
                  </>
                )}
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
            </div>

            {/* Right Hero Image Column */}
            {service.heroImage && (
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/80 bg-muted shadow-lg">
                  <Image
                    src={service.heroImage.url}
                    alt={service.heroImage.alt || service.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Refined Trust Strip with Hairlines */}
          <div className="mt-12 border-t border-border/80 pt-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 text-sm font-medium text-foreground/80">
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-accent shrink-0" />
                <span>{site.stats.years}+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                <span>Fully Insured &amp; Guaranteed</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-accent shrink-0" />
                <span>Fixed-Price Quotations</span>
              </div>
              <div className="flex items-center gap-2.5">
                <BadgeCheck className="h-4 w-4 text-accent shrink-0" />
                <span>Zero Mess Left Behind</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rich Body Content from Sanity (Portable Text) */}
      {service.content && service.content.length > 0 && (
        <section className="border-t border-border/60 bg-white py-16 lg:py-20">
          <div className="container max-w-4xl">
            <div className="prose prose-lg prose-gray max-w-none">
              <PortableText value={service.content} components={portableTextComponents} />
            </div>
          </div>
        </section>
      )}

      {/* Clean "What's Included" Specification Section */}
      {service.includes && service.includes.length > 0 && (
        <section className="border-t border-border/60 bg-secondary/30 py-16 lg:py-20">
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Trade Specification
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
                What&apos;s included in our {service.title.toLowerCase()}
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Clear scope, quality trade preparation, and exacting standards on every assignment.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.includes.map((item: string, idx: number) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 rounded-xl border border-border/80 bg-white p-4 shadow-2xs transition-shadow hover:shadow-xs"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent/15 text-accent mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-medium leading-snug text-primary">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Editorial Standards & Workmanship (Replaces Heavy Boxed Cards) */}
      <section className="border-t border-border/60 bg-white py-16 lg:py-20">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Our Principles
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
              What you get on every job
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              We hold ourselves to uncompromising standards of surface preparation, durability, and customer care.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {site.values.map((value, i) => (
              <div key={value.title} className="group relative">
                <span className="font-serif text-3xl font-light italic text-accent/60 block mb-3">
                  0{i + 1}
                </span>
                <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <ProcessSection />

      {/* FAQ Section - Clean Hairline Accordion */}
      {faqs && faqs.length > 0 && (
        <section className="border-t border-border/60 bg-white py-16 lg:py-20">
          <div className="container max-w-4xl">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                FAQ
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
                Frequently asked questions
              </h2>
              <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto">
                Common questions about our {service.title.toLowerCase()} service, pricing, and scheduling.
              </p>
            </div>

            <div className="mt-12 divide-y divide-border/80 border-y border-border/80">
              {faqs.map((f, idx) => (
                <details
                  key={idx}
                  className="group py-6 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between text-left text-lg font-bold text-primary transition-colors hover:text-accent select-none">
                    <span className="pr-6">{f.q}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform duration-200 group-open:rotate-180 group-open:border-accent group-open:text-accent">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="mt-4 pr-10 text-base leading-relaxed text-muted-foreground whitespace-pre-line">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Services Section - Minimalist & Connected */}
      <section className="border-t border-border/60 bg-secondary/40 py-16 lg:py-20">
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                All Services
              </p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
                Other painting &amp; decorating services
              </h2>
            </div>
            <Link
              href="/services/"
              className="text-sm font-semibold text-accent hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
            >
              View all services <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {others.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.id}/`}
                className="group flex items-center justify-between rounded-xl border border-border/80 bg-white p-4 text-sm font-semibold text-primary transition-all hover:border-accent hover:shadow-xs"
              >
                <span>{s.title}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
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
