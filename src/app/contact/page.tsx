import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/config/site";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/section-heading";
import CtaBand from "@/components/cta-band";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${site.name} for all your painting and decorating needs in ${site.location}. Call, email, or WhatsApp us today.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="py-16 lg:py-24">
        <div className="container">
          <SectionHeading
            eyebrow="Get in touch"
            title="Contact Us"
            sub="We're here to answer any questions you have about our painting and decorating services."
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {/* Contact Details */}
            <div className="flex flex-col gap-6">
              <Card>
                <CardContent className="flex items-start gap-4 p-6 sm:p-8">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-primary">Call Us</h3>
                    <p className="mt-1 text-muted-foreground">
                      Available during operating hours for immediate assistance.
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

              <Card>
                <CardContent className="flex items-start gap-4 p-6 sm:p-8">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15">
                    <MessageCircle className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-primary">WhatsApp</h3>
                    <p className="mt-1 text-muted-foreground">
                      Send us photos of your project for a faster estimate.
                    </p>
                    <a
                      href={whatsappLink(`Hi ${site.name}, I have a question.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 block text-base font-bold text-accent transition-colors hover:text-primary"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-start gap-4 p-6 sm:p-8">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-primary">Email Us</h3>
                    <p className="mt-1 text-muted-foreground">
                      Drop us a line and we'll get back to you within 24 hours.
                    </p>
                    <a
                      href={`mailto:${site.email}`}
                      className="mt-3 block text-base font-bold text-accent transition-colors hover:text-primary"
                    >
                      {site.email}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Operating Hours & Location */}
            <div className="flex flex-col gap-6">
              <Card className="flex-1 bg-primary text-primary-foreground">
                <CardContent className="p-8 sm:p-10">
                  <h3 className="text-2xl font-extrabold">Operating Hours</h3>
                  <div className="mt-6 flex items-center gap-3">
                    <Clock className="h-5 w-5 text-accent" />
                    <span className="text-lg font-semibold">{site.hours}</span>
                  </div>
                  <p className="mt-4 text-primary-foreground/70">
                    We offer flexible hours for commercial projects to minimize 
                    disruption to your business.
                  </p>

                  <hr className="my-8 border-white/10" />

                  <h3 className="text-2xl font-extrabold">Service Area</h3>
                  <div className="mt-6 flex items-start gap-3">
                    <MapPin className="h-5 w-5 shrink-0 text-accent" />
                    <p className="text-base text-primary-foreground/90">
                      Based in <span className="font-semibold">{site.location}</span>. <br />
                      We serve the wider Dublin area including: <br />
                      <span className="text-primary-foreground/70 text-sm mt-2 block">
                        {site.areasServed.slice(0, 10).join(", ")} and more.
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="rounded-2xl border border-border p-6 text-center shadow-soft">
                <h3 className="text-xl font-bold text-primary">Need a fixed price?</h3>
                <p className="mt-2 text-sm text-muted-foreground mb-4">
                  Skip the back-and-forth and get a free quote directly.
                </p>
                <Link
                  href="/get-a-quote/"
                  className={buttonVariants({ variant: "accent", className: "w-full sm:w-auto" })}
                >
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
