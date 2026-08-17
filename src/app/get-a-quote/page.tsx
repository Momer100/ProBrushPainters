import type { Metadata } from "next";
import { Clock, Mail, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { site, whatsappLink } from "@/config/site";
import QuoteForm from "@/components/quote-form";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description: `Request a free, no-obligation painting quote from ${site.name}. Send photos of your job and get a fixed-price quote within 24 hours.`,
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
            Tell us about your job
          </h1>
          <p className="mt-4 text-muted-foreground">
            Answer a few quick questions and we&apos;ll come back with a clear,
            fixed-price quote — usually within 24 hours. No obligation.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.25fr]">
          {/* Contact options */}
          <div className="flex flex-col gap-4">
            <Card>
              <CardContent className="flex flex-col gap-4">
                <h2 className="text-lg font-extrabold text-primary">
                  Prefer to talk it through?
                </h2>

                <a
                  href={`tel:${site.phoneHref}`}
                  className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:border-accent"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15">
                    <Phone className="h-5 w-5 text-accent" />
                  </span>
                  <span>
                    <span className="block text-sm font-extrabold text-primary">
                      Call us
                    </span>
                    <span className="block text-sm text-muted-foreground">
                      {site.phoneDisplay}
                    </span>
                  </span>
                </a>

                <a
                  href={whatsappLink(
                    `Hi ${site.name}, I'd like a quote for a painting job.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:border-accent"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15">
                    <MessageCircle className="h-5 w-5 text-accent" />
                  </span>
                  <span>
                    <span className="block text-sm font-extrabold text-primary">
                      WhatsApp us
                    </span>
                    <span className="block text-sm text-muted-foreground">
                      Easy to attach photos of the job
                    </span>
                  </span>
                </a>

                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:border-accent"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15">
                    <Mail className="h-5 w-5 text-accent" />
                  </span>
                  <span>
                    <span className="block text-sm font-extrabold text-primary">
                      Email us
                    </span>
                    <span className="block text-sm text-muted-foreground">
                      {site.email}
                    </span>
                  </span>
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col gap-3 text-sm">
                <p className="flex items-center gap-2.5 text-foreground/80">
                  <Clock className="h-4 w-4 shrink-0 text-accent" />
                  {site.hours}
                </p>
                <p className="flex items-center gap-2.5 text-foreground/80">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-accent" />
                  Fully insured · {site.guaranteeYears}-year workmanship
                  guarantee
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Chat-style quote form */}
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
