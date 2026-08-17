"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";

// Interactive before/after comparison slider — drag or use arrow keys.
export default function BeforeAfter({
  before,
  after,
  title,
}: {
  before: string;
  after: string;
  title: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(97, Math.max(3, pct)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-[3/2] w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl shadow-lift"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) update(e.clientX);
      }}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      {/* Before (base layer) */}
      <Image
        src={before}
        alt={`${title} — before`}
        fill
        className="object-cover"
        draggable={false}
      />

      {/* After (clipped top layer) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      >
        <Image
          src={after}
          alt={`${title} — after`}
          fill
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Labels */}
      <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-bold tracking-wide text-white">
        BEFORE
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold tracking-wide text-accent-foreground">
        AFTER
      </span>

      {/* Divider + handle */}
      <div
        className="absolute bottom-0 top-0"
        style={{ left: `${pos}%` }}
        aria-hidden="true"
      >
        <div className="absolute bottom-0 top-0 w-1 -translate-x-1/2 bg-white shadow" />
        <button
          type="button"
          role="slider"
          aria-label="Comparison slider"
          aria-valuenow={Math.round(pos)}
          aria-valuemin={0}
          aria-valuemax={100}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(3, p - 4));
            if (e.key === "ArrowRight") setPos((p) => Math.min(97, p + 4));
          }}
          className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lift"
        >
          <ChevronsLeftRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
