import { Star } from "lucide-react";
import { site } from "@/config/site";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/section-heading";

export default function ReviewsSection() {
  return (
    <section id="reviews" className="scroll-mt-20 bg-primary py-20">
      <div className="container">
        <SectionHeading
          dark
          eyebrow="Reviews"
          title={`Trusted by homeowners across ${site.location}`}
          sub="Here's what our customers say about us."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {site.reviews.map((review) => (
            <Card key={review.name} className="border-0">
              <CardContent>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-accent text-accent"
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="mt-4 text-sm font-extrabold text-primary">
                  {review.name}{" "}
                  <span className="font-medium text-muted-foreground">
                    · {review.area}
                  </span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
