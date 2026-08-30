import type { Metadata } from "next";
import Image from "next/image";
import {
  BadgeCheck,
  Clock,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { site } from "@/config/site";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/section-heading";
import CtaBand from "@/components/cta-band";

export const metadata: Metadata = {
  title: "About Us",
  description: `Meet ${site.name} — a professional painting and decorating team serving all of Ireland with ${site.stats.years}+ years of experience.`,
  alternates: { canonical: "/about/" },
};

const valueIcons: Record<string, LucideIcon> = {
  BadgeCheck,
  Clock,
  Sparkles,
  ShieldCheck,
};

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="py-16 lg:py-24">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              as="h1"
              center={false}
              eyebrow="About us"
              title="A painting team you can trust"
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                {site.name} is a professional painting and decorating team with
                over {site.stats.years} years of experience working across
                Ireland. We handle everything from single rooms and feature
                walls to full interior and exterior projects for homes and
                commercial spaces.
              </p>
              <p>
                We take pride in doing the job properly — proper preparation,
                quality materials, and a clean finish every time. We show up
                when we say we will, keep the place tidy, and don&apos;t leave
                until you&apos;re happy with the result.
              </p>
              <p>
                Whether you need a fresh coat in one room or a complete
                repaint, give us a call and we&apos;ll sort you out with a
                free, no-obligation quote.
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lift">
            <Image
              src="/images/team.jpg"
              alt={`The ${site.name} team at work`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Why choose us"
            title="What you can count on"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {site.values.map((value) => {
              const Icon = valueIcons[value.icon] ?? BadgeCheck;
              return (
                <Card key={value.title}>
                  <CardContent>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="mt-4 text-base font-extrabold text-primary">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {value.text}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Recent work"
            title="A few finishes we&apos;re proud of"
            sub="Real projects from around Ireland — see more on the home page."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { src: "/images/s-l1600 (17).jpg", label: "Interior Painting" },
              { src: "/images/s-l1600 (18).jpg", label: "Quality Finish" },
              { src: "/images/s-l1600 (21).jpg", label: "Room Transformation" },
            ].map((img) => (
              <figure key={img.src}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-soft">
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <figcaption className="mt-3 text-center text-sm font-semibold text-muted-foreground">
                  {img.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
