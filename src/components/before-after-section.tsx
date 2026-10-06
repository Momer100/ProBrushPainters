import SectionHeading from "@/components/section-heading";
import Image from "next/image";
import { getPortfolioData, getSiteSettings } from "@/../sanity/lib/data";

export default async function BeforeAfterSection() {
  const [data, site] = await Promise.all([
    getPortfolioData(),
    getSiteSettings(),
  ]);

  const { transformation1, transformation2, gallery } = data;

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
                  alt={`Room before painting — ${site.name} interior painting project`}
                  fill
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-red-500/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm">
                  {transformation1.before.label || "Before"}
                </span>
              </div>
            </figure>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
                <Image
                  src={transformation1.after.src}
                  alt={`Freshly painted room after — ${site.name} interior painting project`}
                  fill
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-emerald-500/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm">
                  {transformation1.after.label || "After"}
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
                    alt={`Room during a full repaint — ${site.name} painting & decorating`}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-amber-500/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm">
                    {transformation2.before.label || "During"}
                  </span>
                </div>
              </figure>
            </div>

            {/* After shots (2x2 grid) */}
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Main after shots */}
              {transformation2.mainAfter.map((img, idx) => (
                <figure key={img.src + idx}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
                    <Image
                      src={img.src}
                      alt={`Freshly painted room after — ${site.name} painting & decorating`}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-emerald-500/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm">
                      {img.label || "After"}
                    </span>
                  </div>
                </figure>
              ))}

              {/* Related shots — same room */}
              {transformation2.relatedAfter.map((img, idx) => (
                <figure key={img.src + idx}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
                    <Image
                      src={img.src}
                      alt={`${img.label} — ${site.name} painting project`}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-emerald-500/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm">
                      {img.label || "After"}
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
            {gallery.map((p, idx) => (
              <figure key={p.src + idx}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
                  <Image
                    src={p.src}
                    alt={`Painting & decorating project by ${site.name}`}
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
