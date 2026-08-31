import type { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/section-heading";
import CtaBand from "@/components/cta-band";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${site.name} for all your painting and decorating needs across Ireland. Call us today for a free quote.`,
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <section className="py-16 lg:py-24">
        <div className="container">
          <SectionHeading
            as="h1"
            eyebrow="Get in touch"
            title="Contact Us"
            sub="Give us a call — we're happy to answer any questions and arrange a free quote."
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {/* Phone — primary */}
            <Card>
              <CardContent className="flex items-start gap-4 p-6 sm:p-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-primary">Call Us</h3>
                  <p className="mt-1 text-muted-foreground">
                    Speak directly with the team for a free, no-obligation quote.
                  </p>
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="mt-3 block text-base font-bold text-accent transition-colors hover:text-primary"
                  >
                    {site.phoneDisplay}
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Service Area */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-8 sm:p-10">
                <h3 className="text-2xl font-extrabold">Service Area</h3>
                <div className="mt-6 flex items-start gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-accent" />
                  <p className="text-base text-primary-foreground/90">
                    Serving clients all across{" "}
                    <span className="font-semibold">{site.location}</span>.{" "}
                    <br />
                    Available for projects nationwide including:
                    <span className="text-primary-foreground/70 text-sm mt-2 block">
                      {site.areasServed.slice(0, 10).join(", ")} and more.
                    </span>
                  </p>
                </div>
                <Link
                  href="/painters/"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:underline"
                >
                  See all areas we cover
                  <MapPin className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 rounded-2xl border border-border p-6 text-center shadow-soft">
            <h3 className="text-xl font-bold text-primary">Ready to get started?</h3>
            <p className="mt-2 text-sm text-muted-foreground mb-4">
              Call us today for a free, no-obligation quote.
            </p>
            <a
              href={`tel:${site.phoneHref}`}
              className={buttonVariants({ variant: "accent" })}
            >
              <Phone className="h-4 w-4" />
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
