import SectionHeading from "@/components/section-heading";
import Image from "next/image";

/* ── Featured before & after transformation ── */
const transformation = {
  before: { src: "/images/s-l1600 (11).jpg", label: "Before" },
  mainAfter: [
    { src: "/images/s-l1600 (21).jpg", label: "After" },
    { src: "/images/s-l1600 (23).jpg", label: "After" },
  ],
  relatedAfter: [
    { src: "/images/s-l1600 (19).jpg", label: "Same room — another angle" },
    { src: "/images/s-l1600 (22).jpg", label: "Same room — detail" },
  ],
};

/* ── General portfolio gallery ── */
const gallery = [
  { src: "/images/s-l1600 (14).jpg", label: "Project" },
  { src: "/images/s-l1600 (15).jpg", label: "Project" },
  { src: "/images/s-l1600 (16).jpg", label: "Project" },
  { src: "/images/s-l1600 (17).jpg", label: "Project" },
  { src: "/images/s-l1600 (18).jpg", label: "Project" },
  { src: "/images/s-l1600 (20).jpg", label: "Project" },
  { src: "/images/s-l1600 (24).jpg", label: "Project" },
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

        {/* ── Featured Before & After ── */}
        <div className="mt-14">
          <h3 className="text-center text-xs font-extrabold uppercase tracking-[0.25em] text-accent">
            Before & After
          </h3>
          <p className="mt-2 text-center text-lg font-bold text-primary">
            Full Room Transformation
          </p>

          {/* Before → After comparison */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* Before — large */}
            <figure className="md:row-span-2">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-soft md:h-full">
                <Image
                  src={transformation.before.src}
                  alt={transformation.before.label}
                  fill
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-red-500/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm">
                  Before
                </span>
              </div>
            </figure>

            {/* Main after shots */}
            {transformation.mainAfter.map((img) => (
              <figure key={img.src}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-emerald-500/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm">
                    After
                  </span>
                </div>
              </figure>
            ))}

            {/* Related shots — same room */}
            {transformation.relatedAfter.map((img) => (
              <figure key={img.src}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-emerald-500/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm">
                    After
                  </span>
                </div>
              </figure>
            ))}
          </div>
        </div>

        {/* ── More of our work ── */}
        <div className="mt-20">
          <h3 className="text-center text-xs font-extrabold uppercase tracking-[0.25em] text-accent">
            Portfolio
          </h3>
          <p className="mt-2 text-center text-lg font-bold text-primary">
            More of Our Work
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((p) => (
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
      </div>
    </section>
  );
}
