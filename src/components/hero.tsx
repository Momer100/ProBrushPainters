import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Phone, ShieldCheck, Star } from "lucide-react";
import { site } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/60 to-background">
      <div className="container grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-24">
        {/* Copy */}
        <div>
          <Badge className="border-accent/40 bg-accent/10 text-accent-foreground">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            {site.stats.rating} rated · {site.stats.reviewCount}+ reviews
          </Badge>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-primary text-balance sm:text-5xl lg:text-[3.4rem]">
            {site.location}&apos;s trusted painters —{" "}
            <span className="text-accent">a flawless finish, guaranteed.</span>
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
            From a single room to a full home or commercial space, {site.name}{" "}
            delivers spotless, on-time painting and decorating — backed by our{" "}
            {site.guaranteeYears}-year workmanship guarantee.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/get-a-quote/"
              className={buttonVariants({ variant: "accent", size: "lg" })}
            >
              Get My Free Quote
            </Link>
            <a
              href={`tel:${site.phoneHref}`}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <Phone className="h-4 w-4" />
              Call {site.phoneDisplay}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-foreground/70">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-accent" /> Fully insured
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-accent" />{" "}
              {site.guaranteeYears}-year guarantee
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 text-accent" /> Free, no-obligation quotes
            </span>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lift">
            <Image
              src="/images/hero.jpg"
              alt={`${site.name} painter at work in a ${site.location} home`}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Floating rating card */}
          <div className="absolute -bottom-5 left-5 rounded-xl border border-border bg-white p-4 shadow-lift">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="mt-1.5 text-sm font-extrabold text-primary">
              {site.stats.rating}/5 rating
            </p>
            <p className="text-xs text-muted-foreground">
              {site.stats.reviewCount}+ happy customers
            </p>
          </div>

          {/* Floating insured chip */}
          <div className="absolute right-5 top-5 rounded-full bg-primary/90 px-4 py-2 text-xs font-bold text-white shadow-lift backdrop-blur">
            Fully Insured ✓
          </div>
        </div>
      </div>
    </section>
  );
}
