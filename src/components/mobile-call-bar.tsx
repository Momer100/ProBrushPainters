import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";

// Sticky bottom bar on mobile — the two actions that make the phone ring.
export default function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-3 border-t border-border bg-white/95 p-3 backdrop-blur md:hidden">
      <a
        href={`tel:${site.phoneHref}`}
        className={buttonVariants({ variant: "primary" })}
      >
        <Phone className="h-4 w-4" /> Call Now
      </a>
      <Link
        href="/get-a-quote/"
        className={buttonVariants({ variant: "accent" })}
      >
        Free Quote
      </Link>
    </div>
  );
}
