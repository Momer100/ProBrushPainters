import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";

export default function CtaBand() {
  return (
    <section className="pb-20 pt-4">
      <div className="container">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-[#0d2440] px-6 py-16 text-center shadow-lift sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white text-balance sm:text-4xl">
            Ready for a fresh coat?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
            Get a free, no-obligation quote today — most quotes are back with
            you within 24 hours.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/get-a-quote/"
              className={buttonVariants({ variant: "accent", size: "lg" })}
            >
              Get My Free Quote
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
            Fully insured · {site.guaranteeYears}-year workmanship guarantee ·
            Free quotes
          </p>
        </div>
      </div>
    </section>
  );
}
