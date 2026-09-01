"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Image as ImageIcon,
  Loader2,
  Minus,
  Phone,
  Plus,
  Upload,
  X,
  Sparkles,
} from "lucide-react";
import { site } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

type QuoteItem = {
  id: string;
  title: string;
  unitPrice: number;
  unit: string;
  description: string;
  custom?: boolean;
};

// Catalog lives in site.ts so prices are easy to edit.
const QUOTE_ITEMS: readonly QuoteItem[] = site.quoteItems;

function formatEuro(n: number) {
  return `€${n.toLocaleString("en-IE")}`;
}

// Price label shown on each item card.
function priceLabel(item: QuoteItem) {
  if (item.custom) return "Custom quote";
  if (item.unit === "from") return `from ${formatEuro(item.unitPrice)}`;
  if (item.unit === "flat") return formatEuro(item.unitPrice);
  return `${formatEuro(item.unitPrice)} ${item.unit}`;
}

type EstimateLine = QuoteItem & { qty: number; subtotal: number };

// Turn the quantity map into selected lines + a running total.
function computeEstimate(quantities: Record<string, number>) {
  const lines: EstimateLine[] = QUOTE_ITEMS.filter(
    (it) => (quantities[it.id] ?? 0) > 0
  ).map((it) => {
    const qty = quantities[it.id] ?? 0;
    return { ...it, qty, subtotal: it.custom ? 0 : it.unitPrice * qty };
  });

  const total = lines.reduce((sum, l) => sum + l.subtotal, 0);
  const totalQty = lines.reduce((sum, l) => sum + l.qty, 0);
  const hasCustom = lines.some((l) => l.custom);

  let label: string;
  if (totalQty === 0) label = "—";
  else if (total > 0 && hasCustom)
    label = `From ${formatEuro(total)} + custom quote`;
  else if (total > 0) label = `From ${formatEuro(total)}`;
  else label = "Custom quote";

  return { lines, total, totalQty, hasCustom, label };
}

// Shrink a photo in the browser before upload. Vercel serverless functions reject
// request bodies over ~4.5 MB, and phone photos are often 3–5 MB each, so we resize
// the longest edge to <= MAX_EDGE and re-encode as JPEG. On any failure (e.g. an
// undecodable HEIC), we fall back to the original file so submission never breaks.
const MAX_EDGE = 2048;
const JPEG_QUALITY = 0.82;

function compressImage(file: File): Promise<File> {
  return new Promise((resolve) => {
    // Only images can be drawn to a canvas; pass anything else through untouched.
    if (!file.type.startsWith("image/")) {
      resolve(file);
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(url);
      const { width, height } = img;
      const scale = Math.min(1, MAX_EDGE / Math.max(width, height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(file);
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file);
            return;
          }
          const newName = file.name.replace(/\.[^.]+$/, "") + ".jpg";
          resolve(new File([blob], newName, { type: "image/jpeg" }));
        },
        "image/jpeg",
        JPEG_QUALITY
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file); // fall back to the original if it can't be decoded
    };

    img.src = url;
  });
}

export default function QuoteForm() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const estimate = computeEstimate(quantities);

  function setQty(id: string, next: number) {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, next) }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setPhotos((prev) => [...prev, ...newFiles]);
    }
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (estimate.totalQty < 1) {
      setError("Please add at least one item to build your quote.");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setError("Please enter a valid phone number so we can contact you.");
      return;
    }

    setLoading(true);

    try {
      // Pack the itemised selection into the fields the email route already renders.
      const serviceStr = estimate.lines
        .map((l) => `${l.qty}× ${l.title}`)
        .join(", ");
      const scopeStr = estimate.lines
        .map((l) =>
          l.custom
            ? `${l.title} (custom quote)`
            : `${l.qty}× ${l.title} (${formatEuro(l.subtotal)})`
        )
        .join(" · ");

      const formData = new FormData();
      formData.append("service", serviceStr);
      formData.append("scope", scopeStr);
      formData.append("estimatedPrice", estimate.label);
      formData.append("name", name.trim());
      formData.append("phone", phone.trim());
      formData.append("email", email.trim());
      formData.append("location", location.trim());
      formData.append("details", details.trim());

      // Compress photos client-side so the upload stays under Vercel's ~4.5 MB limit.
      const compressed = await Promise.all(photos.map(compressImage));
      compressed.forEach((file) => {
        formData.append("photos", file);
      });

      const res = await fetch("/api/quote", {
        method: "POST",
        body: formData,
      });

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        if (res.ok && data.success) {
          setSubmitted(true);
        } else {
          setError(data.message || "Failed to submit quote request. Please try calling us directly.");
        }
      } else {
        // Not a JSON response, likely an HTML error page (e.g. 413 Payload Too Large)
        if (res.status === 413) {
          setError("The photos you attached are too large. Please try sending fewer photos, or smaller ones.");
        } else {
          setError(`Server error (${res.status}). Please try calling us or using WhatsApp.`);
        }
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please check your internet connection or call us directly.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-8 text-center shadow-lift">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="mt-5 text-2xl font-extrabold text-primary">
          Quote Request Received!
        </h3>
        <p className="mt-3 text-base text-muted-foreground max-w-lg mx-auto">
          Thank you, <span className="font-semibold text-primary">{name}</span>. We&apos;ve received your job details and photos.
          Our team will review them and contact you shortly by phone or email with your exact price.
        </p>

        <div className="mt-8 rounded-xl bg-white p-6 shadow-soft border border-border inline-block max-w-sm w-full text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-accent">Summary</p>
          <ul className="mt-2 space-y-1">
            {estimate.lines.map((l) => (
              <li key={l.id} className="flex justify-between text-sm text-primary">
                <span className="font-semibold">
                  {l.qty}× {l.title}
                </span>
                <span className="text-muted-foreground">
                  {l.custom ? "Custom" : formatEuro(l.subtotal)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 border-t border-border pt-2 text-sm font-bold text-primary">
            Estimated starting price:{" "}
            <span className="text-amber-600">{estimate.label}</span>
          </p>
          {photos.length > 0 && (
            <p className="mt-2 text-xs font-medium text-emerald-700 flex items-center gap-1.5">
              <ImageIcon className="h-3.5 w-3.5" /> {photos.length} photo(s) attached
            </p>
          )}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`tel:${site.phoneHref}`}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-base font-bold text-white shadow-md hover:opacity-90 transition-opacity"
          >
            <Phone className="h-4 w-4" />
            Call Us Now: {site.phoneDisplay}
          </a>
          <button
            onClick={() => {
              setSubmitted(false);
              setQuantities({});
              setPhotos([]);
              setName("");
              setPhone("");
              setEmail("");
              setLocation("");
              setDetails("");
            }}
            className="text-xs font-semibold text-muted-foreground hover:text-primary underline py-2"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-lift">
      <div className="border-b border-border pb-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-extrabold text-accent">
          <Sparkles className="h-3.5 w-3.5" /> Instant Estimate &amp; Free Quote
        </span>
        <h2 className="mt-3 text-2xl font-extrabold text-primary">
          Get a Quick Quote for Your Job
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Add everything that needs painting to build your estimate, then attach photos for an exact quote.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Step 1: Build the quote */}
        <div>
          <label className="block text-sm font-extrabold text-primary mb-3">
            1. Add What Needs Painting
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            {QUOTE_ITEMS.map((item) => {
              const qty = quantities[item.id] ?? 0;
              const active = qty > 0;
              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between gap-3 rounded-xl border p-4 transition-all ${
                    active
                      ? "border-accent bg-accent/5 ring-1 ring-accent/20"
                      : "border-border bg-white"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <p className="text-sm font-extrabold text-primary">
                        {item.title}
                      </p>
                      <span className="text-xs font-black text-accent">
                        {priceLabel(item)}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {qty === 0 ? (
                    <button
                      type="button"
                      onClick={() => setQty(item.id, 1)}
                      className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-accent px-3 py-1.5 text-xs font-bold text-accent transition-colors hover:bg-accent hover:text-white"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add
                    </button>
                  ) : (
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        aria-label={`Remove one ${item.title}`}
                        onClick={() => setQty(item.id, qty - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-primary hover:border-accent hover:text-accent"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-5 text-center text-sm font-extrabold text-primary">
                        {qty}
                      </span>
                      <button
                        type="button"
                        aria-label={`Add one ${item.title}`}
                        onClick={() => setQty(item.id, qty + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-primary hover:border-accent hover:text-accent"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Running estimate summary */}
        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
          <p className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
            Your Estimated Starting Price
          </p>

          {estimate.lines.length > 0 ? (
            <>
              <ul className="mt-2 space-y-1">
                {estimate.lines.map((l) => (
                  <li
                    key={l.id}
                    className="flex items-center justify-between text-sm text-amber-900"
                  >
                    <span className="font-semibold">
                      {l.qty}× {l.title}
                    </span>
                    <span>{l.custom ? "Custom quote" : formatEuro(l.subtotal)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 border-t border-amber-200 pt-2 text-2xl font-extrabold text-amber-900">
                {estimate.label}
              </p>
              <p className="mt-1 text-xs text-amber-800/80">
                *Starting estimate. Upload photos below for an exact fixed price.
              </p>
            </>
          ) : (
            <p className="mt-1.5 text-sm text-amber-800/90">
              Add items above and your estimated starting price will appear here.
            </p>
          )}
        </div>

        {/* Step 2: Upload Photos */}
        <div>
          <label className="block text-sm font-extrabold text-primary mb-1">
            2. Upload Photos for Exact Quote <span className="text-xs font-normal text-muted-foreground">(Optional but recommended)</span>
          </label>
          <p className="text-xs text-muted-foreground mb-3">
            Attach photos of the room, walls, or surfaces so we can give you a precise fixed price.
          </p>

          <div className="relative rounded-xl border-2 border-dashed border-border bg-muted/30 p-6 text-center hover:border-accent transition-colors">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex flex-col items-center">
              <Upload className="h-8 w-8 text-accent mb-2" />
              <p className="text-sm font-bold text-primary">
                Click or drag &amp; drop photos here
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Upload room, wall, or cabinet photos (PNG, JPG, WebP)
              </p>
            </div>
          </div>

          {/* Photo Thumbnails */}
          {photos.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {photos.map((file, idx) => (
                <div
                  key={idx}
                  className="relative flex items-center gap-2 rounded-lg border border-border bg-white p-2 text-xs shadow-xs"
                >
                  <ImageIcon className="h-4 w-4 text-accent shrink-0" />
                  <span className="truncate max-w-[140px] font-medium text-foreground">
                    {file.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => removePhoto(idx)}
                    className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-destructive"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Step 3: Contact Details */}
        <div className="space-y-4 pt-2 border-t border-border">
          <label className="block text-sm font-extrabold text-primary">
            3. Where Should We Send Your Exact Quote?
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-muted-foreground mb-1">
                Your Name <span className="text-destructive">*</span>
              </label>
              <Input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted-foreground mb-1">
                Phone Number <span className="text-destructive">*</span>
              </label>
              <Input
                type="tel"
                placeholder="086 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-muted-foreground mb-1">
                Email Address <span className="text-xs font-normal text-muted-foreground">(For written quote)</span>
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted-foreground mb-1">
                Location / Town
              </label>
              <Input
                type="text"
                placeholder="e.g. Dublin, Kildare, Meath"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-muted-foreground mb-1">
              Job Notes / Wall Condition / Paint Colors
            </label>
            <Textarea
              placeholder="Tell us any details (e.g., walls need minor filling, prefer white ceiling & grey walls, timeframe…)"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-xs font-bold text-destructive">
            {error}
          </div>
        )}

        {/* Submit button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="accent"
            size="lg"
            disabled={loading}
            className="w-full text-base font-extrabold py-4 shadow-lift"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Sending Quote Request...
              </>
            ) : (
              `Send Request for Exact Quote (${photos.length > 0 ? `${photos.length} Photo${photos.length > 1 ? "s" : ""}` : "No photos"})`
            )}
          </Button>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Fast response · No obligation · Sent directly to our team
          </p>
        </div>
      </form>
    </div>
  );
}
