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
  url: "https://www.probrushpainters.ie", // canonical production domain (apex 308-redirects to www)
  location: "Ireland", // used in headlines & SEO

  // ── Contact details (PLACEHOLDERS — replace with real ones) ──
  phoneDisplay: "086 125 3342", // shown on screen
  phoneHref: "+353861253342", // used by tel: links
  whatsappNumber: "353861253342", // country code, no + or spaces
  email: "info@probrushpainters.ie",
  quoteEmail: "momer892400@gmail.com", // Email recipient for quote form submissions (test email)
  // Resend "from" address — sends from the verified probrushpainters.ie domain.
  // No mailbox is needed at quotes@ to send; customer replies go to their own email
  // (the API route sets replyTo). Requires RESEND_API_KEY set in Vercel env.
  quoteFrom: "ProBrush Painters <quotes@probrushpainters.ie>",
  addressLine: "Ireland",

  // ── Trust signals ──
  stats: {
    years: 8, // years in business
  },

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
      title: "Call us for a free quote",
      text: "Give us a call and tell us about your job. Sending a few photos helps us price it faster.",
    },
    {
      title: "Get your free quote",
      text: "A clear, fixed-price quote with no hidden extras and no obligation.",
    },
    {
      title: "We prep & paint",
      text: "Floors and furniture protected, surfaces prepared properly, premium paints throughout.",
    },
    {
      title: "Walkthrough",
      text: "We inspect everything together before we leave to make sure you're fully happy with the finish.",
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

  // ── Location pages (local SEO) ──
  // Each entry generates its own /painters/{slug}/ page. Keep to REAL towns
  // (one page per distinct place — no postcode ranges or duplicate city names).
  // County is used for unique page titles/content so pages aren't near-identical.
  locations: [
    // County Dublin
    { name: "Dublin City", county: "Dublin" },
    { name: "Ranelagh", county: "Dublin" },
    { name: "Ballsbridge", county: "Dublin" },
    { name: "Clontarf", county: "Dublin" },
    { name: "Drumcondra", county: "Dublin" },
    { name: "Dundrum", county: "Dublin" },
    { name: "Stillorgan", county: "Dublin" },
    { name: "Blackrock", county: "Dublin" },
    { name: "Dún Laoghaire", county: "Dublin" },
    { name: "Dalkey", county: "Dublin" },
    { name: "Malahide", county: "Dublin" },
    { name: "Howth", county: "Dublin" },
    { name: "Swords", county: "Dublin" },
    { name: "Tallaght", county: "Dublin" },
    { name: "Lucan", county: "Dublin" },
    { name: "Blanchardstown", county: "Dublin" },
    // County Wicklow
    { name: "Bray", county: "Wicklow" },
    { name: "Greystones", county: "Wicklow" },
    { name: "Wicklow", county: "Wicklow" },
    { name: "Arklow", county: "Wicklow" },
    // County Kildare
    { name: "Naas", county: "Kildare" },
    { name: "Newbridge", county: "Kildare" },
    { name: "Celbridge", county: "Kildare" },
    { name: "Maynooth", county: "Kildare" },
    { name: "Kildare", county: "Kildare" },
    // County Louth
    { name: "Drogheda", county: "Louth" },
    { name: "Dundalk", county: "Louth" },
    // County Meath
    { name: "Navan", county: "Meath" },
    { name: "Trim", county: "Meath" },
    // Midlands
    { name: "Mullingar", county: "Westmeath" },
    { name: "Tullamore", county: "Offaly" },
    { name: "Portlaoise", county: "Laois" },
    // South-east
    { name: "Kilkenny", county: "Kilkenny" },
    { name: "Carlow", county: "Carlow" },
    { name: "Wexford", county: "Wexford" },
    // Munster
    { name: "Cork", county: "Cork" },
    { name: "Limerick", county: "Limerick" },
    { name: "Waterford", county: "Waterford" },
    { name: "Tralee", county: "Kerry" },
    { name: "Killarney", county: "Kerry" },
    { name: "Ennis", county: "Clare" },
    // Connacht
    { name: "Galway", county: "Galway" },
    { name: "Tuam", county: "Galway" },
    { name: "Sligo", county: "Sligo" },
    { name: "Castlebar", county: "Mayo" },
    // Ulster (RoI)
    { name: "Monaghan", county: "Monaghan" },
    { name: "Cavan", county: "Cavan" },
    { name: "Letterkenny", county: "Donegal" },
  ] as const,

  // ── Areas served (PLACEHOLDERS — replace with the real list) ──
  areasServed: [
    // Dublin city & suburbs
    "Dublin City",
    "Dublin 1–24",
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
    // Leinster
    "Bray",
    "Greystones",
    "Wicklow",
    "Arklow",
    "Naas",
    "Newbridge",
    "Celbridge",
    "Maynooth",
    "Kildare",
    "Drogheda",
    "Dundalk",
    "Navan",
    "Trim",
    "Mullingar",
    "Tullamore",
    "Portlaoise",
    "Kilkenny",
    "Carlow",
    "Wexford",
    // Munster
    "Cork",
    "Cork City",
    "Limerick",
    "Waterford",
    "Galway",
    "Galway City",
    "Tralee",
    "Killarney",
    "Ennis",
    // Connacht
    "Sligo",
    "Castlebar",
    "Tuam",
    // Ulster
    "Monaghan",
    "Cavan",
    "Letterkenny",
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
      text: "Every job is covered by our workmanship guarantee for total peace of mind.",
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
