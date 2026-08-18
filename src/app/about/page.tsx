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
import ReviewsSection from "@/components/reviews-section";
import CtaBand from "@/components/cta-band";

export const metadata: Metadata = {
  title: "About Us",
  description: `Meet ${site.name} — ${site.location}'s trusted painting & decorating team. ${site.stats.years}+ years of experience, ${site.stats.projects}+ projects completed.`,
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
      {/* Intro — PLACEHOLDER story, replace with the real one */}
      <section className="py-16 lg:py-24">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              center={false}
              eyebrow="About us"
              title={`The crew ${site.location} trusts with its walls`}
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                {site.name} started over {site.stats.years} years ago with one
                van, two brushes and a simple rule: treat every home like
                it&apos;s our own. Today we&apos;ve completed more than{" "}
                {site.stats.projects} projects across {site.location} — from
                single feature walls to full period-home restorations.
              </p>
              <p>
                We&apos;re a small, hands-on team. The person who quotes your
                job is the person who paints it, and we don&apos;t leave until
                you&apos;ve walked through every room and you&apos;re happy
                with the finish.
              </p>
              <p>
                Every job is covered by our{" "}
                {site.guaranteeYears}-year workmanship guarantee — so you can
                book with total confidence.
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

      {/* Gallery — PLACEHOLDER photos, swap for real project shots */}
      <section className="py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Recent work"
            title="A few finishes we're proud of"
            sub="Real projects from around the area — see more on the home page."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { src: "/images/living-after.jpg", label: "Living room · Ranelagh" },
              { src: "/images/kitchen-after.jpg", label: "Kitchen respray · Dundrum" },
              { src: "/images/exterior-after.jpg", label: "Exterior · Blackrock" },
            ].map((img) => (
              <figure key={img.src}>
                <div className="relative aspect-[3/2] overflow-hidden rounded-2xl shadow-soft">
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

      <ReviewsSection />
      <CtaBand />
    </>
  );
}
