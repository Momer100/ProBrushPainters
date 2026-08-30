import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  sub,
  center = true,
  dark = false,
  as = "h2",
  className,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  center?: boolean;
  dark?: boolean;
  as?: "h1" | "h2"; // use "h1" for the primary heading of a page
  className?: string;
}) {
  const Heading = as;
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-accent">
        {eyebrow}
      </p>
      <Heading
        className={cn(
          "mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl",
          dark ? "text-white" : "text-primary"
        )}
      >
        {title}
      </Heading>
      {sub && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            dark ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
