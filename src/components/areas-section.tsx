import Link from "next/link";
import { MapPin } from "lucide-react";
import { site } from "@/config/site";
import { slugify } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/section-heading";

export default function AreasSection() {
  return (
    <section id="areas" className="py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Areas we cover"
          title={`Proudly serving ${site.location} & beyond`}
          sub="Based locally and happy to travel. Tap your area for local painting services — don't see it listed? Just ask."
        />

        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {site.locations.map((loc) => (
            <Link
              key={loc.name}
              href={`/painters/${slugify(loc.name)}/`}
              className="transition-transform hover:-translate-y-0.5"
            >
              <Badge className="px-4 py-1.5 text-sm hover:border-accent">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                {loc.name}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
