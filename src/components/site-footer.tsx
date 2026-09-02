import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";
import { slugify } from "@/lib/utils";
import { Logo } from "@/components/logo";

export default function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Logo dark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
            Professional painting &amp; decorating across Ireland. Quality finishes you&apos;ll be proud of.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary-foreground/60">
            Services
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {site.services.map((s) => (
              <li key={s.title}>
                <Link
                  href="/#services"
                  className="text-primary-foreground/85 transition-colors hover:text-accent"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary-foreground/60">
            Company
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/" className="text-primary-foreground/85 hover:text-accent">
                Home
              </Link>
            </li>
            <li>
              <Link href="/services/" className="text-primary-foreground/85 hover:text-accent">
                Services
              </Link>
            </li>
            <li>
              <Link href="/#work" className="text-primary-foreground/85 hover:text-accent">
                Our Work
              </Link>
            </li>
            <li>
              <Link href="/about/" className="text-primary-foreground/85 hover:text-accent">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact/" className="text-primary-foreground/85 hover:text-accent">
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/get-a-quote/"
                className="text-primary-foreground/85 hover:text-accent"
              >
                Get a Free Quote
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary-foreground/60">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`tel:${site.phoneHref}`}
                className="flex items-center gap-2.5 text-primary-foreground/85 hover:text-accent"
              >
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-primary-foreground/85">
              <MapPin className="h-4 w-4 shrink-0 text-accent" />
              {site.addressLine}
            </li>
          </ul>
        </div>
      </div>

      {/* Areas we serve — internal links for local SEO */}
      <div className="border-t border-white/10">
        <div className="container py-8">
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary-foreground/60">
            Areas we serve
          </h3>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {site.locations.map((loc) => (
              <li key={loc.name}>
                <Link
                  href={`/painters/${slugify(loc.name)}/`}
                  className="text-primary-foreground/85 transition-colors hover:text-accent"
                >
                  Painters {loc.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/painters/"
            className="mt-4 inline-block text-sm font-bold text-accent hover:underline"
          >
            View all areas we cover →
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-5 text-xs text-primary-foreground/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.domain}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy/" className="hover:text-accent">
              Privacy Policy
            </Link>
            <Link href="/terms/" className="hover:text-accent">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
