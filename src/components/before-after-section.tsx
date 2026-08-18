import BeforeAfter from "@/components/before-after";
import SectionHeading from "@/components/section-heading";
import Image from "next/image";

const sliderProject = {
  title: "Recent Project",
  area: "Dublin",
  before: "/images/s-l1600 (9).jpg",
  after: "/images/s-l1600 (10).jpg",
};

const otherProjects = [
  { src: "/images/s-l1600 (11).jpg", label: "Interior Work" },
  { src: "/images/s-l1600 (12).jpg", label: "Painting Details" },
  { src: "/images/s-l1600 (13).jpg", label: "Flawless Finish" },
];

export default function BeforeAfterSection() {
  return (
    <section id="work" className="scroll-mt-20 bg-white py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Our work"
          title="See the difference for yourself"
          sub="Take a look at some of our recent painting and decorating projects."
        />

        {/* Feature slider */}
        <div className="mt-12">
          <BeforeAfter
            before={sliderProject.before}
            after={sliderProject.after}
            title={sliderProject.title}
          />
          <p className="mt-4 text-center text-sm font-semibold text-muted-foreground">
            {sliderProject.title} · {sliderProject.area}
          </p>
        </div>

        {/* Other images */}
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {otherProjects.map((p) => (
            <figure key={p.src}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
                <Image
                  src={p.src}
                  alt={p.label}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
