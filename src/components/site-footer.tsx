import Link from "next/link";
import { Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { site } from "@/config/site";
import { Logo } from "@/components/logo";

export default function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Logo dark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
            A {site.guaranteeYears}-year workmanship guarantee,
            and a finish you&apos;ll be proud of.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
            <ShieldCheck className="h-4 w-4" /> Fully guaranteed
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
              <Link href="/#work" className="text-primary-foreground/85 hover:text-accent">
                Our Work
              </Link>
            </li>
            <li>
              <Link href="/#reviews" className="text-primary-foreground/85 hover:text-accent">
                Reviews
              </Link>
            </li>
            <li>
              <Link href="/about/" className="text-primary-foreground/85 hover:text-accent">
                About Us
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
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2.5 text-primary-foreground/85 hover:text-accent"
              >
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-primary-foreground/85">
              <MapPin className="h-4 w-4 shrink-0 text-accent" />
              {site.addressLine}
            </li>
            <li className="flex items-center gap-2.5 text-primary-foreground/85">
              <Clock className="h-4 w-4 shrink-0 text-accent" />
              {site.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-2 py-5 text-xs text-primary-foreground/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.domain}
          </p>
          <p>Painting &amp; Decorating · {site.location}, Ireland</p>
        </div>
      </div>
    </footer>
  );
}
