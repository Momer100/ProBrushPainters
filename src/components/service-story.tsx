import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";

/**
 * Premium editorial "story band" for the service pages — a close replica of the
 * Borthwick Decorators highlighted section (centred welcome lede → five alternating
 * image/text blocks, serif headings with an italic-gold accent word, generous spacing).
 *
 * Content is ProBrush-HONEST: we do NOT copy Borthwick's specifics (65 years, "family-run
 * since 1959 / three generations", public-sector work, £30m cover, named accreditations).
 * We use ProBrush's real facts from `site` config — `{site.stats.years}` years, Ireland,
 * residential + commercial + specialist services, fully insured + workmanship guarantee +
 * premium trade paints. The accreditations / paint-brand specifics are left as an honest
 * generic line; real logos/brands get added later once the client confirms them.
 */

// Decorative project photos for the five blocks (swappable for real CMS images later).
const storyImages = [
  "/images/s-l1600 (23).jpg",
  "/images/s-l1600 (18).jpg",
  "/images/s-l1600 (14).jpg",
  "/images/s-l1600 (20).jpg",
  "/images/s-l1600 (17).jpg",
];

function StoryImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-sm bg-muted shadow-soft lg:aspect-[4/5]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 48vw"
        className="object-cover"
      />
    </div>
  );
}

/** Serif heading with the trailing phrase set in italic gold (the Borthwick signature). */
function StoryHeading({ lead, accent }: { lead: string; accent: string }) {
  return (
    <h2 className="font-display text-3xl font-normal leading-[1.15] tracking-tight text-primary sm:text-4xl">
      {lead} <span className="italic text-accent">{accent}</span>
    </h2>
  );
}

export default function ServiceStory() {
  const years = site.stats.years;

  return (
    <section className="bg-background">
      {/* Welcome lede */}
      <div className="container max-w-3xl py-20 text-center lg:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Welcome to {site.name}
        </p>
        <p className="mt-7 font-display text-2xl font-light leading-[1.5] text-primary/90 sm:text-[1.7rem]">
          {site.name} are professional painters and decorators serving homes and businesses
          across {site.location} — from a single feature wall to a full commercial repaint.
        </p>
      </div>

      {/* Alternating story blocks */}
      <div className="container space-y-20 pb-20 lg:space-y-28 lg:pb-28">
        {/* Block 1 — text left / image right */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <StoryHeading lead={`${years} years of painting and`} accent="decorating" />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                We&apos;re an {site.location}-based painting and decorating team with {years}{" "}
                years on the tools, working across homes, apartments and commercial premises —
                from one freshened-up room to a full repaint inside and out.
              </p>
              <p>
                Every job is quoted up front with a clear, fixed price and no hidden extras,
                and finished with premium trade paints built to last.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/get-a-quote/"
                className={buttonVariants({ variant: "primary", size: "lg", className: "rounded-sm" })}
              >
                Request a free quote
              </Link>
              <a
                href={`tel:${site.phoneHref}`}
                className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-sm" })}
              >
                <Phone className="h-4 w-4" />
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
          <StoryImage src={storyImages[0]} alt={`${site.name} painting and decorating work`} />
        </div>

        {/* Block 2 — image left / text right */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:order-2">
            <StoryHeading lead="Skilled painters," accent="done right" />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                The work is done by experienced painters and decorators who treat your home
                like their own — careful masking, tidy workspaces and a proper finish, every
                time.
              </p>
              <p>
                We turn up when we say we will, keep you updated as the job progresses, and
                walk the finished work with you before we leave.
              </p>
            </div>
          </div>
          <div className="lg:order-1">
            <StoryImage src={storyImages[1]} alt={`${site.name} decorator at work`} />
          </div>
        </div>

        {/* Block 3 — text left / image right */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <StoryHeading lead="The work splits across" accent="three areas" />
            <dl className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <div>
                <dt className="inline font-semibold text-primary">Residential. </dt>
                <dd className="inline">
                  Homes, apartments and period properties — interior and exterior repaints,
                  feature walls and full redecorations.
                </dd>
              </div>
              <div>
                <dt className="inline font-semibold text-primary">Commercial. </dt>
                <dd className="inline">
                  Offices, retail units, hospitality and leisure, with flexible out-of-hours
                  work so your business keeps running.
                </dd>
              </div>
              <div>
                <dt className="inline font-semibold text-primary">Specialist finishes. </dt>
                <dd className="inline">
                  Kitchen cabinet respraying, spray finishing and wallpaper hanging for a
                  high-end, hard-wearing result.
                </dd>
              </div>
            </dl>
          </div>
          <StoryImage src={storyImages[2]} alt={`${site.name} residential and commercial projects`} />
        </div>

        {/* Block 4 — image left / text right */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:order-2">
            <StoryHeading lead="What you get on" accent="every job" />
            <dl className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
              {site.values.map((v) => (
                <div key={v.title}>
                  <dt className="inline font-semibold text-primary">{v.title}. </dt>
                  <dd className="inline">{v.text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:order-1">
            <StoryImage src={storyImages[3]} alt={`${site.name} finished painting work`} />
          </div>
        </div>

        {/* Block 5 — text left / image right */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <StoryHeading lead="Insurance, guarantee &" accent="paint systems" />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                We&apos;re fully insured and every job is covered by our workmanship
                guarantee, so you have complete peace of mind from quote to final coat.
              </p>
              <p>
                We work with premium trade paint systems chosen for the surface and the
                setting, for a finish that looks right and lasts.
              </p>
              {/* Honest placeholder — real accreditations / trade paint brands get listed
                  here once the client confirms them (no invented certifications). */}
              <p className="text-base italic text-muted-foreground/80">
                Full accreditations and trade paint brands added as we confirm them.
              </p>
            </div>
          </div>
          <StoryImage src={storyImages[4]} alt={`${site.name} premium paint finish`} />
        </div>
      </div>
    </section>
  );
}
