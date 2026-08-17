import { cn } from "@/lib/utils";

// The ProBrush logo mark — a paint roller inside a navy badge.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="2" y="2" width="44" height="44" rx="12" fill="#123252" />
      <rect x="11" y="12" width="22" height="9" rx="4.5" fill="#F59E0B" />
      <path
        d="M33 16.5h5.5v7H27"
        stroke="#ffffff"
        strokeWidth="2.75"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="23.5" y="23.5" width="7" height="11" rx="3" fill="#ffffff" />
      <circle cx="15.5" cy="27.5" r="2" fill="#F59E0B" />
      <circle cx="15.5" cy="33" r="1.25" fill="#F59E0B" opacity="0.7" />
    </svg>
  );
}

// Full lockup: mark + wordmark. `dark` = for use on navy backgrounds.
export function Logo({
  dark = false,
  className,
}: {
  dark?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-10 w-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-xl font-extrabold tracking-tight",
            dark ? "text-white" : "text-primary"
          )}
        >
          Pro<span className="text-accent">Brush</span>
        </span>
        <span
          className={cn(
            "text-[0.6rem] font-bold uppercase tracking-[0.32em]",
            dark ? "text-white/70" : "text-muted-foreground"
          )}
        >
          Painters
        </span>
      </span>
    </span>
  );
}
