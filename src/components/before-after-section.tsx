import BeforeAfter from "@/components/before-after";
import SectionHeading from "@/components/section-heading";

// NOTE: these are placeholder photos — drop the client's real
// before/after pairs into /public/images and update the paths below.
const projects = [
  {
    title: "Living room repaint",
    area: "Ranelagh",
    before: "/images/living-before.jpg",
    after: "/images/living-after.jpg",
  },
  {
    title: "Kitchen cabinet respray",
    area: "Dundrum",
    before: "/images/kitchen-before.jpg",
    after: "/images/kitchen-after.jpg",
  },
  {
    title: "Full exterior repaint",
    area: "Blackrock",
    before: "/images/exterior-before.jpg",
    after: "/images/exterior-after.jpg",
  },
];

export default function BeforeAfterSection() {
  return (
    <section id="work" className="scroll-mt-20 bg-white py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Our work"
          title="See the difference for yourself"
          sub="Drag the slider to compare real before and after results from recent projects."
        />

        {/* Feature slider */}
        <div className="mt-12">
          <BeforeAfter
            before={projects[0].before}
            after={projects[0].after}
            title={projects[0].title}
          />
          <p className="mt-4 text-center text-sm font-semibold text-muted-foreground">
            {projects[0].title} · {projects[0].area}
          </p>
        </div>

        {/* Two more */}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {projects.slice(1).map((p) => (
            <div key={p.title}>
              <BeforeAfter before={p.before} after={p.after} title={p.title} />
              <p className="mt-4 text-center text-sm font-semibold text-muted-foreground">
                {p.title} · {p.area}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
