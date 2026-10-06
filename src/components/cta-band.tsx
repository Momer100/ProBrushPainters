import Link from "next/link";
import { Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getSiteSettings } from "@/../sanity/lib/data";

export default async function CtaBand() {
  const site = await getSiteSettings();

  return (
    <section className="pb-20 pt-4">
      <div className="container">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-[#0d2440] px-6 py-16 text-center shadow-lift sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white text-balance sm:text-4xl">
            {site.ctaHeading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
            {site.ctaSubtext}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/get-a-quote/"
              className={buttonVariants({ variant: "accent", size: "lg" })}
            >
              {site.ctaButtonText}
            </Link>
            <a
              href={`tel:${site.phoneHref}`}
              className={buttonVariants({ variant: "white", size: "lg" })}
            >
              <Phone className="h-4 w-4" />
              Call {site.phoneDisplay}
            </a>
          </div>

          <p className="mt-6 text-xs font-semibold tracking-wide text-white/50">
            {site.stats.years}+ years experience · Free quotes · All of Ireland
          </p>
        </div>
      </div>
    </section>
  );
}
