import SectionHeading from "@/components/section-heading";
import Image from "next/image";

/* ── Before & After #1: simple side-by-side ── */
const transformation1 = {
  before: { src: "/images/s-l1600 (9).jpg", label: "Before" },
  after: { src: "/images/s-l1600 (10).jpg", label: "After" },
};

/* ── Before & After #2: full room transformation ── */
const transformation2 = {
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
  { src: "/images/s-l1600 (1).jpg", label: "Project" },
  { src: "/images/s-l1600 (2).jpg", label: "Project" },
  { src: "/images/s-l1600 (3).jpg", label: "Project" },
  { src: "/images/s-l1600 (4).jpg", label: "Project" },
  { src: "/images/s-l1600 (5).jpg", label: "Project" },
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

        {/* ── Before & After #1 ── */}
        <div className="mt-14">
          <h3 className="text-center text-xs font-extrabold uppercase tracking-[0.25em] text-accent">
            Before & After
          </h3>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
                <Image
                  src={transformation1.before.src}
                  alt={transformation1.before.label}
                  fill
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-red-500/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm">
                  Before
                </span>
              </div>
            </figure>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
                <Image
                  src={transformation1.after.src}
                  alt={transformation1.after.label}
                  fill
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-emerald-500/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm">
                  After
                </span>
              </div>
            </figure>
          </div>
        </div>

        {/* ── Full Room Transformation ── */}
        <div className="mt-20">
          <h3 className="text-center text-xs font-extrabold uppercase tracking-[0.25em] text-accent">
            Room Transformation
          </h3>
          <p className="mt-2 text-center text-lg font-bold text-primary">
            Full Room Transformation
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-6">
            {/* Before — large */}
            <div className="md:w-1/3">
              <figure className="h-full">
                <div className="relative h-full min-h-[400px] w-full overflow-hidden rounded-2xl shadow-soft">
                  <Image
                    src={transformation2.before.src}
                    alt={transformation2.before.label}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-amber-500/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm">
                    During
                  </span>
                </div>
              </figure>
            </div>

            {/* After shots (2x2 grid) */}
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Main after shots */}
              {transformation2.mainAfter.map((img) => (
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
              {transformation2.relatedAfter.map((img) => (
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
