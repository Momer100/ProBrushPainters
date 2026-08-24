import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { site } from "@/config/site";
import QuoteForm from "@/components/quote-form";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description: `Get an instant estimated quote or call ${site.name} for a free, no-obligation painting quote. We serve all of Ireland.`,
};

export default function GetAQuotePage() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-accent">
            Free quote
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-primary text-balance sm:text-4xl">
            Get an Estimate &amp; Free Quote
          </h1>
          <p className="mt-4 text-muted-foreground">
            Fill in the quick form below for an instant estimated starting price and upload photos for an exact quote, or call us directly.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 items-start">
          {/* Interactive Form */}
          <div className="lg:col-span-8">
            <QuoteForm />
          </div>

          {/* Side Call Card */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-primary text-primary-foreground p-6 sm:p-8 shadow-lift">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent mb-4">
                <Phone className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-extrabold">Prefer to Call?</h2>
              <p className="mt-2 text-sm text-primary-foreground/80 leading-relaxed">
                Speak directly with our team right now for an immediate price estimate or advice.
              </p>
              <a
                href={`tel:${site.phoneHref}`}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-base font-extrabold text-white shadow-md hover:opacity-90 transition-opacity"
              >
                <Phone className="h-4 w-4" />
                {site.phoneDisplay}
              </a>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
              <h3 className="text-base font-extrabold text-primary">Why Get a Quote From Us?</h3>
              <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Clear, honest pricing starting from ~€300/room
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Attach photos for a 100% exact quote
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  No obligation &amp; no hidden extras
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {site.stats.years}+ years painting experience in Ireland
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
