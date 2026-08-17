import { site } from "@/config/site";

const items = [
  { value: `${site.stats.years}+`, label: "Years of experience" },
  { value: `${site.stats.projects}+`, label: "Projects completed" },
  { value: `${site.stats.rating}★`, label: "Average rating" },
  { value: `${site.guaranteeYears}yr`, label: "Workmanship guarantee" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-border bg-white">
      <div className="container grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <p className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
              {item.value}
            </p>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
