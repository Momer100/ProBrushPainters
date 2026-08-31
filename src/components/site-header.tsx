"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { site } from "@/config/site";
import { Logo } from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services/", label: "Services" },
  { href: "/painters/", label: "Areas" },
  { href: "/#work", label: "Our Work" },
  { href: "/about/", label: "About Us" },
  { href: "/contact/", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="container flex h-[4.25rem] items-center justify-between gap-4">
        <Link href="/" aria-label={site.name} onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.phoneHref}`}
            className="hidden items-center gap-2 text-sm font-bold text-primary lg:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {site.phoneDisplay}
          </a>
          <Link
            href="/get-a-quote/"
            className={buttonVariants({
              variant: "accent",
              size: "sm",
              className: "hidden sm:inline-flex",
            })}
          >
            Get a Free Quote
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-primary md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-border bg-background px-5 pb-6 pt-2 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-border/60 py-3 text-base font-semibold text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/get-a-quote/"
            onClick={() => setOpen(false)}
            className={buttonVariants({
              variant: "accent",
              className: "mt-4 w-full",
            })}
          >
            Get a Free Quote
          </Link>
        </nav>
      )}
    </header>
  );
}
