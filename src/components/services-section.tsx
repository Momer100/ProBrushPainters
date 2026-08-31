import Link from "next/link";
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
import { site } from "@/config/site";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/section-heading";

const icons: Record<string, LucideIcon> = {
  PaintRoller,
  Home,
  SprayCan,
  Building2,
  Wallpaper,
  Hammer,
};

export default function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-20 py-20">
      <div className="container">
        <SectionHeading
          eyebrow="What we do"
          title="Painting & decorating services"
          sub="Every job, big or small, gets the same care: proper preparation, premium paints and a spotless tidy-up."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {site.services.map((service) => {
            const Icon = icons[service.icon] ?? PaintRoller;
            return (
              <Card
                key={service.title}
                className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <CardContent>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.blurb}
                  </p>
                  <Link
                    href="/get-a-quote/"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors group-hover:text-accent"
                  >
                    Get a quote
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/services/"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-accent"
          >
            Browse all services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
