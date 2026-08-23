import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description: `Call ${site.name} for a free, no-obligation painting quote. We serve all of Ireland.`,
};

export default function GetAQuotePage() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-accent">
            Free quote
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-primary text-balance sm:text-4xl">
            Get a Free Quote
          </h1>
          <p className="mt-4 text-muted-foreground">
            Give us a call and tell us about your job. No obligation, no hidden
            extras — just a clear, honest price.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-md">
          <div className="rounded-2xl border border-border bg-white p-8 shadow-soft text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 mx-auto">
              <Phone className="h-8 w-8 text-accent" />
            </div>
            <h2 className="mt-6 text-2xl font-extrabold text-primary">
              Call us for a free quote
            </h2>
            <p className="mt-3 text-muted-foreground">
              Speak directly with the team. We&apos;re happy to answer any
              questions and arrange a time to visit your property.
            </p>
            <a
              href={`tel:${site.phoneHref}`}
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-accent px-8 py-4 text-lg font-extrabold text-white shadow-lg transition-opacity hover:opacity-90"
            >
              <Phone className="h-5 w-5" />
              {site.phoneDisplay}
            </a>
            <p className="mt-4 text-sm text-muted-foreground">
              {site.stats.years}+ years experience · Serving all of Ireland
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
