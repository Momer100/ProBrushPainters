// ─────────────────────────────────────────────────────────────────
// ProBrush Painters — central site configuration
//
// Every piece of business-specific content lives in this ONE file.
// Swap the placeholder values for the client's real details and the
// whole site (pages, forms, footer, SEO) updates automatically.
// ─────────────────────────────────────────────────────────────────

export const site = {
  name: "ProBrush Painters",
  tagline: "Painting & Decorating",
  domain: "probrushpainters.ie",
  url: "https://probrushpainters.ie",
  location: "Dublin", // used in headlines & SEO

  // ── Contact details (PLACEHOLDERS — replace with real ones) ──
  phoneDisplay: "(085) 123 4567", // shown on screen
  phoneHref: "+353851234567", // used by tel: links
  whatsappNumber: "353851234567", // country code, no + or spaces
  email: "info@probrushpainters.ie",
  addressLine: "Dublin, Ireland",
  hours: "Mon–Sat · 8:00–18:00",

  // ── Trust signals (PLACEHOLDERS — replace with real ones) ──
  stats: {
    years: 15, // years in business
    projects: 800, // projects completed
    rating: 4.9, // average review rating
    reviewCount: 120, // total reviews
  },
  guaranteeYears: 2,

  // ── Services ──
  services: [
    {
      icon: "PaintRoller",
      title: "Interior Painting",
      blurb:
        "Walls, ceilings, woodwork and feature walls — crisp lines, premium paints, zero mess left behind.",
    },
    {
      icon: "Home",
      title: "Exterior Painting",
      blurb:
        "Weather-resistant finishes that protect your home and transform its kerb appeal for years.",
    },
    {
      icon: "SprayCan",
      title: "Kitchen Cabinet Respraying",
      blurb:
        "A factory-smooth, brand-new kitchen look for a fraction of the cost of replacement.",
    },
    {
      icon: "Building2",
      title: "Commercial Painting",
      blurb:
        "Offices, retail and hospitality — flexible out-of-hours work so your business keeps running.",
    },
    {
      icon: "Wallpaper",
      title: "Wallpaper Hanging",
      blurb:
        "Feature walls, murals and delicate papers hung with precision and perfectly matched patterns.",
    },
    {
      icon: "Hammer",
      title: "Prep & Plastering",
      blurb:
        "Filling, sanding, skimming and repairs — the flawless base every great paint job needs.",
    },
  ] as const,

  // ── How it works ──
  steps: [
    {
      title: "Tell us about your job",
      text: "Call, WhatsApp or use the quote form. Sending a few photos helps us price it faster.",
    },
    {
      title: "Get your free quote",
      text: "A clear, fixed-price quote within 24 hours. No hidden extras, no obligation.",
    },
    {
      title: "We prep & paint",
      text: "Floors and furniture protected, surfaces prepared properly, premium paints throughout.",
    },
    {
      title: "Walkthrough & guarantee",
      text: "We inspect everything together before we leave. All work covered by our guarantee.",
    },
  ] as const,

  // ── Reviews (PLACEHOLDERS — replace with real Google reviews) ──
  reviews: [
    {
      name: "Sarah M.",
      area: "Ranelagh",
      text: "Absolutely delighted with the work. The lads were punctual, tidy and the finish on our hallway and stairs is perfect. Already recommended them to two neighbours.",
    },
    {
      name: "James O'Connor",
      area: "Clontarf",
      text: "Got three quotes for the exterior of the house. ProBrush weren't the cheapest but clearly the most professional — worth every cent. The place looks brand new.",
    },
    {
      name: "Aoife K.",
      area: "Dundrum",
      text: "They resprayed our kitchen cabinets and honestly it looks like a new kitchen. Clean, careful work and finished exactly when they said they would.",
    },
    {
      name: "David L.",
      area: "Blackrock",
      text: "Fast quote, fair price, brilliant result. They protected everything and left the house spotless each evening. Will definitely use again.",
    },
  ] as const,

  // ── Areas served (PLACEHOLDERS — replace with the real list) ──
  areasServed: [
    "Ranelagh",
    "Ballsbridge",
    "Clontarf",
    "Drumcondra",
    "Dundrum",
    "Stillorgan",
    "Blackrock",
    "Dún Laoghaire",
    "Dalkey",
    "Malahide",
    "Howth",
    "Swords",
    "Tallaght",
    "Lucan",
    "Blanchardstown",
    "Bray",
    "Greystones",
    "Naas",
    "Celbridge",
    "Maynooth",
  ] as const,

  // ── About page values ──
  values: [
    {
      icon: "BadgeCheck",
      title: "Quality materials",
      text: "We only use premium trade paints and proper preparation — that's why our finishes last.",
    },
    {
      icon: "Clock",
      title: "Reliable & on time",
      text: "We show up when we say we will and finish on schedule. You'll always know the plan.",
    },
    {
      icon: "Sparkles",
      title: "Clean & tidy",
      text: "Dust sheets down, everything protected, and we leave your home spotless every evening.",
    },
    {
      icon: "ShieldCheck",
      title: "Fully guaranteed",
      text: "Fully insured and every job covered by our workmanship guarantee for total peace of mind.",
    },
  ] as const,
};

// Helper: pre-filled WhatsApp link
export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Helper: pre-filled email link
export function emailLink(subject: string, body: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
