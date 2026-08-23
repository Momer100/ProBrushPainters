import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Phone } from "lucide-react";
import { site } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/60 to-background">
      <div className="container grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-24">
        {/* Copy */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Painting &amp; Decorating · Ireland
          </p>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-primary text-balance sm:text-5xl lg:text-[3.4rem]">
            {site.location}&apos;s trusted painters —{" "}
            <span className="text-accent">a flawless finish, guaranteed.</span>
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
            From a single room to a full home or commercial space, {site.name}{" "}
            delivers spotless, on-time painting and decorating across Ireland.
          </p>

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
              Learn More
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-foreground/70">
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-accent" />{" "}
              {site.stats.years}+ years experience
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-accent" /> Free, no-obligation quotes
            </span>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lift">
            <Image
              src="/images/s-l1600 (23).jpg"
              alt={`${site.name} project in ${site.location}`}
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
