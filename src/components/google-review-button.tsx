import { Star } from "lucide-react";
import { site } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";

// "Review us on Google" CTA linking to the Google Business Profile review page.
export default function GoogleReviewButton({
  variant = "accent",
  size = "lg",
  className,
}: {
  variant?: "primary" | "accent" | "outline" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <a
      href={site.googleReviewUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonVariants({ variant, size, className })}
    >
      <Star className="h-4 w-4 fill-current" />
      Review us on Google
    </a>
  );
}
