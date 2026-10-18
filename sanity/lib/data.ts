import { client } from "./client";
import { urlFor } from "./image";
import {
  siteSettingsQuery,
  servicesQuery,
  serviceBySlugQuery,
  portfolioQuery,
  beforeAfterQuery,
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

import { draftMode } from "next/headers";

// Query Sanity with 60s revalidate; returns null (→ fallback) if CMS
// is not configured or query fails, ensuring site is always robust.
async function sanityFetch<T>(query: string, params: Record<string, any> = {}): Promise<T | null> {
  if (!sanityConfigured) return null;
  try {
    let isDraftMode = false;
    try {
      const draft = await draftMode();
      isDraftMode = draft.isEnabled;
    } catch (e) {
      // Ignore: called outside request context
    }
    
    const token = process.env.SANITY_API_READ_TOKEN;
    
    const fetchOptions: any = {};
    if (isDraftMode && token) {
      fetchOptions.token = token;
      fetchOptions.perspective = "previewDrafts";
      fetchOptions.useCdn = false;
      fetchOptions.next = { revalidate: 0 };
    } else {
      // Tagged so the /api/revalidate webhook can purge ALL Sanity content instantly
      // via revalidateTag("sanity"); the 60s timer is just a safety net.
      fetchOptions.next = { revalidate: 60, tags: ["sanity"] };
    }

    return await client.fetch<T>(query, params, fetchOptions);
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

export type ServiceDoc = {
  id: string;
  title: string;
  icon: string;
  blurb: string;
  long: string;
  includes: string[];
  metaTitle: string | null;
  metaDescription: string | null;
  heroImage: { url: string; alt: string } | null;
  heroHeadline: string | null;
  heroText: string | null;
  keyFacts: Array<{ label: string; value: string }> | null;
  gallery: Array<{ src: string; alt: string }>;
  content: any | null;
  faqs: Array<{ question: string; answer: string }> | null;
};

const defaultServiceImages: Record<string, string> = {
  "interior-painting": "/images/s-l1600 (23).jpg",
  "exterior-painting": "/images/s-l1600 (1).jpg",
  "kitchen-cabinet-respraying": "/images/s-l1600 (20).jpg",
  "commercial-painting": "/images/s-l1600 (3).jpg",
  "wallpaper-hanging": "/images/s-l1600 (2).jpg",
  "plastering-drywall-repair": "/images/s-l1600 (11).jpg",
  "woodwork-doors-skirting": "/images/s-l1600 (22).jpg",
  "specialist-coatings": "/images/s-l1600 (17).jpg",
  "rental-turnaround-painting": "/images/s-l1600 (15).jpg",
  "colour-consultation": "/images/s-l1600 (19).jpg",
};

export async function getServiceBySlug(slug: string): Promise<ServiceDoc | null> {
  const doc = await sanityFetch<any>(serviceBySlugQuery, { slug });
  const staticService = site.services.find((s) => s.id === slug);

  if (!doc && !staticService) return null;

  const defaultImg = defaultServiceImages[slug] || "/images/hero.jpg";
  const heroImage = doc?.heroImage?.url
    ? { url: urlFor(doc.heroImage).width(1200).quality(85).url(), alt: doc.heroImage.alt || doc.title || "" }
    : { url: defaultImg, alt: `${doc?.title || staticService?.title || "Professional painting"} in Ireland` };

  const title = doc?.title || staticService?.title || "";

  // Per-service gallery from CMS; fall back to the general portfolio photos so the
  // section is never empty. Alt text stays descriptive and never claims a location.
  let gallery: Array<{ src: string; alt: string }> = (doc?.gallery || [])
    .filter((im: any) => im?.url || im?.asset?._ref)
    .map((im: any) => ({
      src: urlFor(im).width(1000).quality(80).url(),
      alt: im.alt || `${title} project by ${site.name}`,
    }));
  if (gallery.length === 0) {
    const { gallery: portfolio } = await getPortfolioData();
    gallery = portfolio.slice(0, 6).map((g) => ({
      src: g.src,
      alt: `${title || "Painting & decorating"} project by ${site.name}`,
    }));
  }

  return {
    id: doc?.id || staticService?.id || slug,
    title,
    icon: doc?.icon || staticService?.icon || "PaintRoller",
    blurb: doc?.blurb || staticService?.blurb || "",
    long: doc?.long || staticService?.long || "",
    includes: (doc?.includes?.length ? doc.includes : (staticService?.includes || [])) as string[],
    metaTitle: doc?.metaTitle || null,
    metaDescription: doc?.metaDescription || null,
    heroImage,
    heroHeadline: doc?.heroHeadline || null,
    heroText: doc?.heroText || null,
    keyFacts: doc?.keyFacts?.length ? doc.keyFacts : null,
    gallery,
    content: doc?.content || null,
    faqs: doc?.faqs?.length ? doc.faqs : null,
  };
}

// Testimonials that match a given service category (case-insensitive). Returns [] if
// none — the service page then hides its reviews grid (keeps the Google-review CTA).
export async function getTestimonialsForService(category: string) {
  const all = await getTestimonials();
  if (!all) return [];
  const title = category.toLowerCase();
  const firstWord = title.split(" ")[0];
  const matched = all.filter((t) => {
    const cat = (t.serviceCategory || "").toLowerCase();
    if (!cat) return false;
    return (
      title.includes(cat) ||
      cat.includes(title) ||
      (firstWord.length > 3 && cat.includes(firstWord))
    );
  });
  return matched;
}

// Before/after for service pages. Returns null unless REAL before+after photos exist in
// the CMS portfolio — so the section hides until the team uploads them (no stock placeholder).
export async function getBeforeAfter(): Promise<
  { before: { src: string; alt: string }; after: { src: string; alt: string } } | null
> {
  const d = await sanityFetch<any>(beforeAfterQuery);
  if (!d?.before?.url || !d?.after?.url) return null;
  return {
    before: {
      src: urlFor(d.before).width(1000).quality(85).url(),
      alt: d.before.alt || "Before",
    },
    after: {
      src: urlFor(d.after).width(1000).quality(85).url(),
      alt: d.after.alt || "After",
    },
  };
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

export async function getProcessSteps(): Promise<
  Array<{ title: string; text: string; image: { src: string; alt: string } | null }>
> {
  const docs = await sanityFetch<any[]>(processStepsQuery);
  if (!docs || docs.length === 0) {
    return site.steps.map((s) => ({ title: s.title, text: s.text, image: null }));
  }
  return docs.map((d) => ({
    title: d.title,
    text: d.text,
    image: d.image?.url
      ? { src: urlFor(d.image).width(800).quality(80).url(), alt: d.image.alt || d.title }
      : null,
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
