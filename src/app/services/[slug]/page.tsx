import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import {
  ArrowRight,
  Building2,
  Check,
  DoorOpen,
  Droplets,
  Hammer,
  Home,
  PaintBucket,
  Paintbrush,
  PaintRoller,
  Phone,
  SprayCan,
  Star,
  Wallpaper,
  type LucideIcon,
} from "lucide-react";
import { site } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import CtaBand from "@/components/cta-band";
import ProcessSection from "@/components/process-section";
import RelatedAreas from "@/components/related-areas";
import GoogleReviewButton from "@/components/google-review-button";
import {
  getServiceBySlug,
  getServices,
  getTestimonialsForService,
  getPosts,
} from "@/../sanity/lib/data";
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
      if (!value?.asset?._ref && !value?.url) return null;
      const imageUrl = value.url || urlFor(value).width(1200).url();
      return (
        <div className="relative my-8 aspect-video overflow-hidden rounded-xl border border-border/60 bg-muted shadow-sm">
          <Image src={imageUrl} alt={value.alt || "Service illustration"} fill className="object-cover" />
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const external = !value?.href?.startsWith("/");
      return (
        <a
          href={value?.href}
          rel={external ? "noreferrer noopener" : undefined}
          target={external ? "_blank" : undefined}
          className="font-semibold text-accent underline underline-offset-4 transition-colors hover:text-accent/80"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="mt-12 mb-5 border-b border-border/60 pb-3 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mt-8 mb-3 text-xl font-bold tracking-tight text-primary sm:text-2xl">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-8 rounded-r-xl border-l-4 border-accent bg-secondary/30 px-6 py-4 text-lg italic text-foreground/90">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-6 list-outside list-disc space-y-2 pl-6 text-base text-muted-foreground sm:text-lg">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="mb-6 list-outside list-decimal space-y-2 pl-6 text-base text-muted-foreground sm:text-lg">{children}</ol>
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

  const [allServices, reviews, posts] = await Promise.all([
    getServices(),
    getTestimonialsForService(service.title),
    getPosts(),
  ]);

  const Icon = icons[service.icon] ?? PaintRoller;
  const others = (allServices || []).filter((s: any) => s.id !== service.id).slice(0, 8);
  const relatedPosts = (posts || []).slice(0, 3);
  const serviceLower = service.title.toLowerCase();

  // Hero key facts: CMS-provided or safe, truthful defaults (no invented numbers).
  const keyFacts =
    service.keyFacts && service.keyFacts.length > 0
      ? service.keyFacts
      : [
          { label: "Covers", value: service.includes?.[0] || "Full preparation & finish" },
          { label: "Insurance", value: "Fully insured & guaranteed" },
          { label: "Quotes", value: "Free, fixed-price" },
          { label: "Experience", value: `${site.stats.years}+ years` },
        ];

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
      a: service.includes?.length
        ? `It typically includes ${service.includes.join(", ").toLowerCase()}.`
        : `We handle the full job from preparation to a clean, professional finish.`,
    },
    {
      q: `Are you insured?`,
      a: `Yes — ${site.name} is fully insured, with ${site.stats.years}+ years of experience and a workmanship guarantee on every job.`,
    },
  ];
  const faqs =
    service.faqs && service.faqs.length > 0
      ? service.faqs.map((f: any) => ({ q: f.question, a: f.answer }))
      : defaultFaqs;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f: { q: string; a: string }) => ({
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
    description: service.metaDescription || service.long,
    url: `${site.url}/services/${service.id}/`,
    areaServed: { "@type": "Country", name: "Ireland" },
    provider: { "@type": "HousePainter", name: site.name, telephone: site.phoneHref, url: site.url },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services/` },
      { "@type": "ListItem", position: 3, name: service.title, item: `${site.url}/services/${service.id}/` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 via-background to-background pt-10 pb-14 lg:pt-14 lg:pb-20">
        <div className="container">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-accent">Home</Link>
            <span>/</span>
            <Link href="/services/" className="transition-colors hover:text-accent">Services</Link>
            <span>/</span>
            <span className="text-primary">{service.title}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-accent">
                <Icon className="h-4 w-4" /> Painting &amp; Decorating
              </p>

              <h1 className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-primary text-balance sm:text-4xl lg:text-5xl">
                {service.heroHeadline || `Professional ${service.title} in ${site.location}`}
              </h1>

              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {service.heroText ? (
                  <p className="whitespace-pre-line">{service.heroText}</p>
                ) : (
                  <>
                    <p>{service.long}</p>
                    <p>
                      Whether it&apos;s a single room refresh or a full commercial repaint, our
                      skilled team prepares every surface properly and applies premium trade
                      finishes built for longevity across {site.location}.
                    </p>
                  </>
                )}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={`tel:${site.phoneHref}`} className={buttonVariants({ variant: "accent", size: "lg" })}>
                  <Phone className="h-4 w-4" />
                  Call for a Free Quote
                </a>
                <Link href="/get-a-quote/" className={buttonVariants({ variant: "outline", size: "lg" })}>
                  Get a Quote Online
                </Link>
              </div>

              <a
                href={site.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-accent"
              >
                <span className="flex gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </span>
                Rated on Google — leave us a review
              </a>
            </div>

            {service.heroImage && (
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/80 bg-muted shadow-lg sm:aspect-[16/10] lg:aspect-[4/3]">
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

          {/* Key facts strip */}
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/80 bg-border/60 sm:grid-cols-4">
            {keyFacts.slice(0, 4).map((f: { label: string; value: string }) => (
              <div key={f.label} className="bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-accent">{f.label}</p>
                <p className="mt-1 text-sm font-semibold text-primary">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Work gallery ───────── */}
      {service.gallery && service.gallery.length > 0 && (
        <section className="border-t border-border/60 bg-white py-16 lg:py-20">
          <div className="container">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Our work</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
              Recent {serviceLower} projects
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.gallery.slice(0, 6).map((img, idx) => (
                <figure key={idx} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/60 bg-muted shadow-sm">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────── Rich body content (Portable Text from CMS) ───────── */}
      {service.content && service.content.length > 0 && (
        <section className="border-t border-border/60 bg-white py-16 lg:py-20">
          <div className="container max-w-4xl">
            <div className="prose prose-lg prose-gray max-w-none">
              <PortableText value={service.content} components={portableTextComponents} />
            </div>
          </div>
        </section>
      )}

      {/* ───────── What's included ───────── */}
      {service.includes && service.includes.length > 0 && (
        <section className="border-t border-border/60 bg-secondary/30 py-16 lg:py-20">
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Trade specification</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
                What&apos;s included in our {serviceLower}
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Clear scope, quality trade preparation, and exacting standards on every job.
              </p>
            </div>
            <ul className="mt-8 flex flex-wrap gap-3">
              {service.includes.map((item: string, idx: number) => (
                <li
                  key={idx}
                  className="inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-white py-2.5 pl-2.5 pr-5 shadow-2xs"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-base font-semibold text-primary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ───────── Standards / why choose ───────── */}
      <section className="border-t border-border/60 bg-white py-16 lg:py-20">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Our principles</p>
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
                <span className="mb-3 block font-serif text-3xl font-light italic text-accent/60">0{i + 1}</span>
                <h3 className="text-lg font-bold text-primary transition-colors group-hover:text-accent">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Process ───────── */}
      <ProcessSection />

      {/* ───────── Reviews ───────── */}
      <section className="border-t border-border/60 bg-primary py-16 text-white lg:py-20">
        <div className="container text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Customer reviews</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Trusted by homeowners across {site.location}
          </h2>

          {reviews.length > 0 && (
            <div className="mt-10 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
              {reviews.slice(0, 3).map((r, i) => (
                <div key={i} className="flex flex-col justify-between rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                  <div>
                    <div className="flex gap-0.5 text-accent">
                      {Array.from({ length: r.rating || 5 }).map((_, s) => (
                        <Star key={s} className="h-4 w-4 fill-accent" />
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-white/90">&ldquo;{r.text}&rdquo;</p>
                  </div>
                  <p className="mt-6 border-t border-white/10 pt-4 text-sm font-bold">
                    {r.author}
                    <span className="font-medium text-white/60"> · {r.location}</span>
                  </p>
                </div>
              ))}
            </div>
          )}

          <p className="mx-auto mt-8 max-w-xl text-sm text-white/70">
            Had us paint for you? A quick review on Google helps other homeowners find a painter they can trust.
          </p>
          <div className="mt-6 flex justify-center">
            <GoogleReviewButton variant="white" />
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="border-t border-border/60 bg-white py-16 lg:py-20">
        <div className="container max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">FAQ</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
              Frequently asked questions
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
              Common questions about our {serviceLower} service, pricing, and scheduling.
            </p>
          </div>
          <div className="mt-12 divide-y divide-border/80 border-y border-border/80">
            {faqs.map((f, idx) => (
              <details key={idx} className="group py-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer select-none items-center justify-between text-left text-lg font-bold text-primary transition-colors hover:text-accent">
                  <span className="pr-6">{f.q}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform duration-200 group-open:rotate-180 group-open:border-accent group-open:text-accent">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-4 whitespace-pre-line pr-10 text-base leading-relaxed text-muted-foreground">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Related reading (blog) ───────── */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-border/60 bg-secondary/30 py-16 lg:py-20">
          <div className="container">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">From our journal</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
              Painting &amp; decorating tips
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((p: any) => (
                <Link
                  key={p.slug?.current || p.slug}
                  href={`/blog/${p.slug?.current || p.slug}/`}
                  className="group rounded-xl border border-border/80 bg-white p-5 transition-all hover:border-accent hover:shadow-xs"
                >
                  <h3 className="font-bold text-primary transition-colors group-hover:text-accent">{p.title}</h3>
                  {p.excerpt && (
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Read more <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────── Other services ───────── */}
      <section className="border-t border-border/60 bg-white py-16 lg:py-20">
        <div className="container">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">All services</p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
                Other painting &amp; decorating services
              </h2>
            </div>
            <Link href="/services/" className="inline-flex items-center gap-1 self-start text-sm font-semibold text-accent hover:underline sm:self-auto">
              View all services <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {others.map((s: any) => (
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
        sub={`We provide ${serviceLower} and all our painting & decorating services in these areas.`}
      />

      <CtaBand />
    </>
  );
}
