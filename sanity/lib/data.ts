import { client } from "./client";
import { urlFor } from "./image";
import {
  siteSettingsQuery,
  servicesQuery,
  portfolioQuery,
  quoteItemsQuery,
  testimonialsQuery,
  processStepsQuery,
  aboutPageQuery,
  locationPageQuery,
  postsQuery,
  postBySlugQuery,
} from "./queries";
import { sanityConfigured } from "../env";
import { site } from "@/config/site";

// Query Sanity with 60s revalidate; returns null (→ fallback) if CMS
// is not configured or query fails, ensuring site is always robust.
async function sanityFetch<T>(query: string, params: Record<string, any> = {}): Promise<T | null> {
  if (!sanityConfigured) return null;
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: 60 } });
  } catch (err) {
    console.error("[sanity] fetch failed:", (err as Error).message);
    return null;
  }
}

export type SiteSettings = typeof site & {
  heroTitle?: string;
  heroSubtext?: string;
  heroCtaText?: string;
  heroSecondaryCtaText?: string;
  ctaHeading?: string;
  ctaSubtext?: string;
  ctaButtonText?: string;
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const s = (await sanityFetch<Record<string, any>>(siteSettingsQuery)) || {};
  return {
    ...site,
    name: s.name || site.name,
    tagline: s.tagline || site.tagline,
    phoneDisplay: s.phoneDisplay || site.phoneDisplay,
    phoneHref: s.phoneHref || site.phoneHref,
    whatsappNumber: s.whatsappNumber || site.whatsappNumber,
    email: s.email || site.email,
    googleReviewUrl: s.googleReviewUrl || site.googleReviewUrl,
    quoteEmail: s.quoteEmail || site.quoteEmail,
    addressLine: s.addressLine || site.addressLine,
    stats: {
      years: s.yearsInBusiness ?? site.stats.years,
    },
    heroTitle: s.heroTitle || "Professional Painting & Decorating Across Ireland",
    heroSubtext:
      s.heroSubtext ||
      "Interior & exterior painting, kitchen respraying, and wallpapering. Free fixed-price quotes, quality trade paints, and zero mess left behind.",
    heroCtaText: s.heroCtaText || "Get a Free Fast Quote",
    heroSecondaryCtaText: s.heroSecondaryCtaText || "Call Us Now",
    ctaHeading: s.ctaHeading || "Ready to transform your home?",
    ctaSubtext: s.ctaSubtext || "Get a fast, free, fixed-price quote with no obligation today.",
    ctaButtonText: s.ctaButtonText || "Get Your Free Quote",
  };
}

export async function getServices() {
  const docs = await sanityFetch<any[]>(servicesQuery);
  if (!docs || docs.length === 0) return site.services;
  return docs.map((d) => ({
    id: d.id || d.title?.toLowerCase().replace(/\s+/g, "-"),
    icon: d.icon || "PaintRoller",
    title: d.title || "",
    blurb: d.blurb || "",
    long: d.long || "",
    includes: d.includes || [],
  }));
}

export async function getQuoteItems() {
  const docs = await sanityFetch<any[]>(quoteItemsQuery);
  if (!docs || docs.length === 0) return site.quoteItems;
  return docs.map((d) => ({
    id: d.id,
    title: d.title,
    unitPrice: d.unitPrice ?? 0,
    unit: d.unit || "per item",
    description: d.description || "",
    custom: d.custom ?? false,
  }));
}

export async function getTestimonials() {
  const docs = await sanityFetch<any[]>(testimonialsQuery);
  if (!docs || docs.length === 0) return null;
  return docs.map((d) => ({
    author: d.author || "Satisfied Customer",
    location: d.location || "Ireland",
    rating: d.rating ?? 5,
    text: d.reviewText || "",
    serviceCategory: d.serviceCategory || "Painting",
  }));
}

export async function getProcessSteps() {
  const docs = await sanityFetch<any[]>(processStepsQuery);
  if (!docs || docs.length === 0) return site.steps;
  return docs.map((d) => ({
    title: d.title,
    text: d.text,
  }));
}

export async function getAboutPage() {
  const doc = await sanityFetch<any>(aboutPageQuery);
  if (!doc) return null;
  return {
    eyebrow: doc.eyebrow || "About us",
    title: doc.title || "A painting team you can trust",
    paragraph1: doc.paragraph1,
    paragraph2: doc.paragraph2,
    paragraph3: doc.paragraph3,
    teamImage: doc.teamImage ? urlFor(doc.teamImage).width(1200).url() : null,
    values: doc.values || null,
  };
}

export async function getLocationPage(slug: string) {
  const doc = await sanityFetch<any>(locationPageQuery, { slug });
  if (!doc) return null;
  return {
    townName: doc.townName,
    county: doc.county,
    customHeadline: doc.customHeadline,
    customDescription: doc.customDescription,
  };
}

export type Transformation1 = {
  before: { src: string; label: string };
  after: { src: string; label: string };
};

export type Transformation2 = {
  before: { src: string; label: string };
  mainAfter: { src: string; label: string }[];
  relatedAfter: { src: string; label: string }[];
};

export type GalleryImage = { src: string; label: string };

export async function getPortfolioData() {
  const d = await sanityFetch<any>(portfolioQuery);

  const defaultTrans1: Transformation1 = {
    before: { src: "/images/s-l1600 (9).jpg", label: "Before" },
    after: { src: "/images/s-l1600 (10).jpg", label: "After" },
  };

  const defaultTrans2: Transformation2 = {
    before: { src: "/images/s-l1600 (11).jpg", label: "Before" },
    mainAfter: [
      { src: "/images/s-l1600 (21).jpg", label: "After" },
      { src: "/images/s-l1600 (23).jpg", label: "After" },
    ],
    relatedAfter: [
      { src: "/images/s-l1600 (19).jpg", label: "Same room — another angle" },
      { src: "/images/s-l1600 (22).jpg", label: "Same room — detail" },
    ],
  };

  const defaultGallery: GalleryImage[] = [
    { src: "/images/s-l1600 (1).jpg", label: "Project" },
    { src: "/images/s-l1600 (2).jpg", label: "Project" },
    { src: "/images/s-l1600 (3).jpg", label: "Project" },
    { src: "/images/s-l1600 (4).jpg", label: "Project" },
    { src: "/images/s-l1600 (5).jpg", label: "Project" },
    { src: "/images/s-l1600 (14).jpg", label: "Project" },
    { src: "/images/s-l1600 (15).jpg", label: "Project" },
    { src: "/images/s-l1600 (16).jpg", label: "Project" },
    { src: "/images/s-l1600 (17).jpg", label: "Project" },
    { src: "/images/s-l1600 (18).jpg", label: "Project" },
    { src: "/images/s-l1600 (20).jpg", label: "Project" },
    { src: "/images/s-l1600 (24).jpg", label: "Project" },
  ];

  if (!d) {
    return {
      transformation1: defaultTrans1,
      transformation2: defaultTrans2,
      gallery: defaultGallery,
    };
  }

  const transformation1: Transformation1 = {
    before: {
      src: d.transformation1?.beforeImage?.url
        ? urlFor(d.transformation1.beforeImage).width(1200).quality(85).url()
        : defaultTrans1.before.src,
      label: d.transformation1?.beforeImage?.alt || "Before",
    },
    after: {
      src: d.transformation1?.afterImage?.url
        ? urlFor(d.transformation1.afterImage).width(1200).quality(85).url()
        : defaultTrans1.after.src,
      label: d.transformation1?.afterImage?.alt || "After",
    },
  };

  const trans2Afters = (d.transformation2?.afterImages || []).map((im: any) => ({
    src: urlFor(im).width(1200).quality(85).url(),
    label: im.label || im.alt || "After",
  }));

  const transformation2: Transformation2 = {
    before: {
      src: d.transformation2?.beforeImage?.url
        ? urlFor(d.transformation2.beforeImage).width(1200).quality(85).url()
        : defaultTrans2.before.src,
      label: "During",
    },
    mainAfter: trans2Afters.slice(0, 2).length
      ? trans2Afters.slice(0, 2)
      : defaultTrans2.mainAfter,
    relatedAfter: trans2Afters.slice(2).length
      ? trans2Afters.slice(2)
      : defaultTrans2.relatedAfter,
  };

  const gallery: GalleryImage[] = (d.gallery || []).length
    ? d.gallery.map((im: any) => ({
        src: urlFor(im).width(1200).quality(85).url(),
        label: im.title || im.alt || "Project",
      }))
    : defaultGallery;

  return {
    transformation1,
    transformation2,
    gallery,
  };
}

export async function getPosts() {
  const docs = await sanityFetch<any[]>(postsQuery);
  return docs || [];
}

export async function getPostBySlug(slug: string) {
  const doc = await sanityFetch<any>(postBySlugQuery, { slug });
  return doc || null;
}
