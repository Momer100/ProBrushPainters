import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";
import { slugify } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import CtaBand from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Areas We Cover — Painters Across Ireland",
  description: `${site.name} provides professional painting & decorating across Ireland. Find your local painters — Dublin, Cork, Galway, Kildare, Wicklow and more. Free fixed-price quotes.`,
  alternates: { canonical: "/painters/" },
};

// Group the flat locations list by county, preserving config order.
function locationsByCounty() {
  const groups = new Map<string, { name: string; county: string }[]>();
  for (const loc of site.locations) {
    const list = groups.get(loc.county) ?? [];
    list.push(loc);
    groups.set(loc.county, list);
  }
  return Array.from(groups.entries());
}

export default function PaintersIndexPage() {
  const groups = locationsByCounty();

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/60 to-background">
        <div className="container py-14 lg:py-20">
          <p className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            <MapPin className="h-4 w-4" /> Areas we cover
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-primary text-balance sm:text-5xl">
            Professional Painters Across Ireland
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {site.name} covers towns and cities right across Ireland. Find your
            local area below for painting &amp; decorating services near you, or
            call us for a free quote.
          </p>
          <div className="mt-8">
            <a
              href={`tel:${site.phoneHref}`}
              className={buttonVariants({ variant: "accent", size: "lg" })}
            >
              <Phone className="h-4 w-4" />
              Call for a Free Quote
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container space-y-12">
          {groups.map(([county, locs]) => (
            <div key={county}>
              <h2 className="text-xl font-extrabold tracking-tight text-primary">
                Co. {county}
              </h2>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {locs.map((loc) => (
                  <Link
                    key={loc.name}
                    href={`/painters/${slugify(loc.name)}/`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-1.5 text-sm font-semibold text-primary shadow-xs transition-colors hover:border-accent hover:text-accent"
                  >
                    <MapPin className="h-3.5 w-3.5 text-accent" />
                    {loc.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
