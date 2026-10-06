import SectionHeading from "@/components/section-heading";
import { getProcessSteps } from "@/../sanity/lib/data";

export default async function ProcessSection() {
  const steps = await getProcessSteps();

  return (
    <section className="py-20">
      <div className="container">
        <SectionHeading
          eyebrow="How it works"
          title="From first call to final coat"
          sub="A simple, straightforward process — you'll always know what's happening and when."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative rounded-lg border border-border bg-card p-6 shadow-soft"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-lg font-extrabold text-accent-foreground">
                {i + 1}
              </div>
              <h3 className="mt-4 text-base font-extrabold text-primary">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
