import { MapPin } from "lucide-react";
import { site } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/section-heading";

export default function AreasSection() {
  return (
    <section className="py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Areas we cover"
          title={`Proudly serving ${site.location} & beyond`}
          sub="Based locally and happy to travel. Don't see your area listed? Just ask."
        />

        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {site.areasServed.map((area) => (
            <Badge key={area} className="px-4 py-1.5 text-sm">
              <MapPin className="h-3.5 w-3.5 text-accent" />
              {area}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
