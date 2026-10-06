import SectionHeading from "@/components/section-heading";
import GoogleReviewButton from "@/components/google-review-button";
import { getTestimonials, getSiteSettings } from "@/../sanity/lib/data";
import { Star } from "lucide-react";

export default async function ReviewsSection() {
  const [site, testimonials] = await Promise.all([
    getSiteSettings(),
    getTestimonials(),
  ]);

  return (
    <section id="reviews" className="scroll-mt-20 bg-primary py-20 text-white">
      <div className="container text-center">
        <SectionHeading
          dark
          eyebrow="Customer Reviews"
          title={`Loved our work across ${site.location}?`}
          sub="If we've painted for you, a quick review on Google means the world — and helps other local homeowners find a painter they can trust."
        />

        {testimonials && testimonials.length > 0 && (
          <div className="mt-12 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((review, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-2xl bg-white/10 p-6 text-white backdrop-blur-sm"
              >
                <div>
                  <div className="flex items-center gap-1 text-accent">
                    {Array.from({ length: review.rating || 5 }).map((_, r) => (
                      <Star key={r} className="h-4 w-4 fill-accent" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/90">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="text-sm font-bold">{review.author}</p>

                  <p className="text-xs text-white/60">
                    {review.location} · {review.serviceCategory}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <GoogleReviewButton variant="white" />
        </div>
      </div>
    </section>
  );
}
