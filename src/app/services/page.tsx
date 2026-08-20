import type { Metadata } from "next";
import {
  ArrowRight,
  Building2,
  Hammer,
  Home,
  PaintRoller,
  SprayCan,
  Wallpaper,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { site } from "@/config/site";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/section-heading";
import CtaBand from "@/components/cta-band";
import ProcessSection from "@/components/process-section";

export const metadata: Metadata = {
  title: "Our Services",
  description: `Comprehensive painting and decorating services in ${site.location}. Interior, exterior, commercial painting, and kitchen cabinet respraying.`,
};

const icons: Record<string, LucideIcon> = {
  PaintRoller,
  Home,
  SprayCan,
  Building2,
  Wallpaper,
  Hammer,
};

export default function ServicesPage() {
  return (
    <>
      <section className="py-16 lg:py-24">
        <div className="container">
          <SectionHeading
            eyebrow="What we do"
            title="Painting & Decorating Services"
            sub="Every job, big or small, gets the same care: proper preparation, premium paints and a spotless tidy-up."
          />
          
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {site.services.map((service) => {
              const Icon = icons[service.icon] ?? PaintRoller;
              return (
                <Card
                  key={service.title}
                  className="group flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <CardContent className="flex flex-1 flex-col">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/15">
                      <Icon className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="mt-6 text-xl font-extrabold text-primary">
                      {service.title}
                    </h3>
                    <p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground">
                      {service.blurb}
                    </p>
                    <Link
                      href="/get-a-quote/"
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors group-hover:text-accent"
                    >
                      Get a free quote
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add process section for context on the services page */}
      <ProcessSection />

      <CtaBand />
    </>
  );
}
