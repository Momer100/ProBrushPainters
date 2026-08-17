import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  sub,
  center = true,
  dark = false,
  className,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  center?: boolean;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-accent">
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl",
          dark ? "text-white" : "text-primary"
        )}
      >
        {title}
      </h2>
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
