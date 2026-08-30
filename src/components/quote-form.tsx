"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Image as ImageIcon,
  Loader2,
  Phone,
  Upload,
  X,
  Sparkles,
} from "lucide-react";
import { site } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

type JobOption = {
  id: string;
  title: string;
  estimate: string;
  startingPrice: number;
  description: string;
};

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

const JOB_OPTIONS: JobOption[] = [
  {
    id: "1_bedroom",
    title: "1 Room / Bedroom",
    estimate: "~€300",
    startingPrice: 300,
    description: "Walls, ceiling & trim for 1 standard room",
  },
  {
    id: "2_3_rooms",
    title: "2–3 Rooms",
    estimate: "~€550 – €850",
    startingPrice: 550,
    description: "Multiple bedrooms, living room, or hallway",
  },
  {
    id: "full_house",
    title: "Full House Interior",
    estimate: "~€1,200+",
    startingPrice: 1200,
    description: "Complete interior repainting",
  },
  {
    id: "kitchen_cabinets",
    title: "Kitchen Cabinets",
    estimate: "~€750+",
    startingPrice: 750,
    description: "Professional respraying / painting of cabinets",
  },
  {
    id: "doors_trim",
    title: "Doors & Woodwork / Trim",
    estimate: "~€250+",
    startingPrice: 250,
    description: "Skirting, architraves, doors & frames",
  },
  {
    id: "exterior",
    title: "Exterior Painting",
    estimate: "Custom quote",
    startingPrice: 0,
    description: "Masonry, window frames, fascia & soffit",
  },
];

export default function QuoteForm() {
  const [selectedJob, setSelectedJob] = useState<string>("1_bedroom");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const currentJob = JOB_OPTIONS.find((j) => j.id === selectedJob) || JOB_OPTIONS[0];

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
      const formData = new FormData();
      formData.append("service", currentJob.title);
      formData.append("scope", currentJob.description);
      formData.append("estimatedPrice", currentJob.estimate);
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
          <p className="mt-1 text-sm font-bold text-primary">{currentJob.title}</p>
          <p className="text-xs text-muted-foreground">Estimated starting range: <span className="font-semibold text-amber-600">{currentJob.estimate}</span></p>
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
              setPhotos([]);
              setName("");
              setPhone("");
              setEmail("");
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
          Select what needs to be painted for an instant estimated starting price, then attach photos for an exact quote.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Step 1: Select Job Type */}
        <div>
          <label className="block text-sm font-extrabold text-primary mb-3">
            1. Select What Needs Painting
          </label>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {JOB_OPTIONS.map((job) => {
              const active = job.id === selectedJob;
              return (
                <button
                  type="button"
                  key={job.id}
                  onClick={() => setSelectedJob(job.id)}
                  className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                    active
                      ? "border-accent bg-accent/5 ring-2 ring-accent/20 shadow-soft"
                      : "border-border hover:border-primary/40 bg-white"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-extrabold text-primary">{job.title}</p>
                      <span className="text-xs font-black text-accent bg-accent/10 px-2 py-0.5 rounded-md">
                        {job.estimate}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {job.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Estimated Price Banner */}
        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
              Instant Estimated Starting Price
            </p>
            <p className="text-xl font-extrabold text-amber-900 mt-0.5">
              {currentJob.estimate}
            </p>
            <p className="text-xs text-amber-800/80">
              *Starting estimate for {currentJob.title.toLowerCase()}. Upload photos below for an exact fixed price.
            </p>
          </div>
          <span className="text-xs font-bold text-accent bg-white px-3 py-1.5 rounded-lg border border-amber-200 shadow-xs shrink-0">
            Cheap &amp; Transparent Rates
          </span>
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
