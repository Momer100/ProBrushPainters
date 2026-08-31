import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { site } from "@/config/site";
import { slugify } from "@/lib/utils";

// Compact "areas we cover" block for core pages — a curated set of town links plus a
// link to the full /painters/ hub. Keeps internal linking useful without dumping all
// 48 towns onto every page.
export default function RelatedAreas({
  heading = "Areas we cover",
  sub = "Local painting & decorating services near you across Ireland.",
  limit = 15,
}: {
  heading?: string;
  sub?: string;
  limit?: number;
}) {
  const towns = site.locations.slice(0, limit);

  return (
    <section className="py-16 lg:py-20">
      <div className="container">
        <h2 className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
          {heading}
        </h2>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">{sub}</p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {towns.map((loc) => (
            <Link
              key={loc.name}
              href={`/painters/${slugify(loc.name)}/`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-1.5 text-sm font-semibold text-primary shadow-xs transition-colors hover:border-accent hover:text-accent"
            >
              <MapPin className="h-3.5 w-3.5 text-accent" />
              Painters in {loc.name}
            </Link>
          ))}
        </div>

        <Link
          href="/painters/"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-accent"
        >
          View all areas we cover
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
