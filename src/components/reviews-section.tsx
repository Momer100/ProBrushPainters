import { site } from "@/config/site";
import SectionHeading from "@/components/section-heading";
import GoogleReviewButton from "@/components/google-review-button";

export default function ReviewsSection() {
  return (
    <section id="reviews" className="scroll-mt-20 bg-primary py-20">
      <div className="container text-center">
        <SectionHeading
          dark
          eyebrow="Reviews"
          title={`Loved our work across ${site.location}?`}
          sub="If we've painted for you, a quick review on Google means the world — and helps other local homeowners find a painter they can trust."
        />
        <div className="mt-8 flex justify-center">
          <GoogleReviewButton variant="white" />
        </div>
      </div>
    </section>
  );
}
