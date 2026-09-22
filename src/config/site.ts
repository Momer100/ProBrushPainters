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
  analyticsId: "G-8JW0GWB725", // Google Analytics 4 measurement ID

  // ── Contact details (PLACEHOLDERS — replace with real ones) ──
  phoneDisplay: "086 125 3342", // shown on screen
  phoneHref: "+353861253342", // used by tel: links
  whatsappNumber: "353861253342", // country code, no + or spaces
  email: "info@probrushpainters.ie",
  googleReviewUrl: "https://g.page/r/CYXZ3gu_Ev1NEBM/review", // "Review us on Google" link
  quoteEmail: "info@probrushpainters.ie", // Live business inbox — receives quote form submissions
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
  // `long` + `includes` are keyword-rich but factual descriptions of each service.
  // `id` is the URL slug for the per-service page (/services/{id}/).
  services: [
    {
      id: "interior-painting",
      icon: "PaintRoller",
      title: "Interior Painting",
      blurb:
        "Walls, ceilings, woodwork and feature walls — crisp lines, premium paints, zero mess left behind.",
      long:
        "Professional interior painting and decorating across Ireland. We prepare and paint walls, ceilings, hallways, stairwells and feature walls to a flawless finish, using premium trade emulsion, matt and satin paints in homes and commercial spaces.",
      includes: [
        "Walls & ceilings",
        "Feature & accent walls",
        "Hallways, stairs & landings",
        "Filling, sanding & preparation",
        "Matt, satin & silk finishes",
      ],
    },
    {
      id: "exterior-painting",
      icon: "Home",
      title: "Exterior Painting",
      blurb:
        "Weather-resistant finishes that protect your home and transform its kerb appeal for years.",
      long:
        "Exterior painting and weatherproofing for homes and businesses across Ireland. We paint masonry, render and pebbledash, fascia, soffit and gutters, window frames and front doors with weather-resistant masonry paints that protect and transform your property.",
      includes: [
        "Masonry, render & pebbledash",
        "Fascia, soffit & gutters",
        "Window frames & sills",
        "Front doors & gates",
        "Power-washing & preparation",
      ],
    },
    {
      id: "kitchen-cabinet-respraying",
      icon: "SprayCan",
      title: "Kitchen Cabinet Respraying",
      blurb:
        "A factory-smooth, brand-new kitchen look for a fraction of the cost of replacement.",
      long:
        "Kitchen cabinet respraying and painting for a factory-smooth, brand-new kitchen look for a fraction of the cost of replacement. We spray cabinet doors, drawers, end panels and units in your choice of colour and finish.",
      includes: [
        "Cabinet doors & drawers",
        "End panels & plinths",
        "Degreasing & keying",
        "Primer + sprayed topcoat",
        "Colour matching",
      ],
    },
    {
      id: "commercial-painting",
      icon: "Building2",
      title: "Commercial Painting",
      blurb:
        "Offices, retail and hospitality — flexible out-of-hours work so your business keeps running.",
      long:
        "Commercial painting and decorating for offices, retail units, hospitality and leisure across Ireland. We offer flexible out-of-hours and weekend work with low-odour paints so your business keeps running.",
      includes: [
        "Offices & retail units",
        "Hospitality & leisure",
        "Out-of-hours & weekend work",
        "Large-area spray & roller",
        "Low-odour, low-disruption",
      ],
    },
    {
      id: "wallpaper-hanging",
      icon: "Wallpaper",
      title: "Wallpaper Hanging",
      blurb:
        "Feature walls, murals and delicate papers hung with precision and perfectly matched patterns.",
      long:
        "Wallpaper hanging for feature walls, murals and delicate papers, hung with precision and perfectly matched patterns. We prepare walls, apply lining paper where needed and hang standard, textured and specialist wallpapers.",
      includes: [
        "Feature & accent walls",
        "Pattern-matched papers",
        "Lining paper",
        "Wall preparation",
        "Murals & specialist papers",
      ],
    },
    {
      id: "prep-and-plastering",
      icon: "Hammer",
      title: "Prep & Plastering",
      blurb:
        "Filling, sanding, skimming and repairs — the flawless base every great paint job needs.",
      long:
        "Surface preparation and plastering — the flawless base every great paint job needs. We fill, sand, skim, patch-plaster and repair cracks and damaged surfaces before painting for a smooth, lasting finish.",
      includes: [
        "Filling & sanding",
        "Skimming & patch plastering",
        "Crack & surface repair",
        "Caulking & sealing",
        "Priming",
      ],
    },
    {
      id: "woodwork-trim-painting",
      icon: "DoorOpen",
      title: "Woodwork & Trim Painting",
      blurb:
        "Skirting, architraves, doors, frames and stairs finished in crisp gloss, satinwood or eggshell.",
      long:
        "Woodwork and trim painting for skirting boards, architraves, internal doors, frames, window boards and stairs. We prepare, prime and finish woodwork in gloss, satinwood or eggshell for a hard-wearing, crisp result.",
      includes: [
        "Skirting & architraves",
        "Internal doors & frames",
        "Window boards & sills",
        "Stairs & banisters",
        "Gloss, satinwood & eggshell",
      ],
    },
    {
      id: "wood-staining-varnishing",
      icon: "Paintbrush",
      title: "Wood Staining & Varnishing",
      blurb:
        "Protective stains, varnishes and oils for doors, decking, gates and timber surfaces.",
      long:
        "Wood staining and varnishing to protect and restore timber. We sand, prepare and apply protective stains, varnishes and oils to doors, gates, decking, fencing and other wood surfaces.",
      includes: [
        "Doors & gates",
        "Decking & fencing",
        "Timber surfaces",
        "Sanding & preparation",
        "Protective stain, varnish & oil",
      ],
    },
    {
      id: "spray-painting",
      icon: "PaintBucket",
      title: "Spray Painting",
      blurb:
        "Fast, smooth, even spray finishes for cabinets, doors, radiators and large areas.",
      long:
        "Spray painting and spray finishing for a fast, smooth and even coat. We spray kitchen cabinets, wardrobes, doors, radiators, furniture and large ceilings and walls, with careful masking to protect surrounding surfaces.",
      includes: [
        "Cabinets & wardrobes",
        "Doors & radiators",
        "Furniture",
        "Large ceilings & walls",
        "Careful masking & prep",
      ],
    },
    {
      id: "damp-stain-block",
      icon: "Droplets",
      title: "Damp & Stain-Block Treatment",
      blurb:
        "Sealing water stains, damp patches and mould so they don't bleed back through the paint.",
      long:
        "Stain-blocking and anti-damp treatment before painting. We seal water stains, damp patches, nicotine and smoke marks, and treat mould with stain-block primers and moisture-resistant paints so they don't bleed back through the finish.",
      includes: [
        "Water & damp stains",
        "Nicotine & smoke stains",
        "Mould treatment",
        "Stain-block priming",
        "Moisture-resistant paints",
      ],
    },
  ] as const,

  // ── Quote builder line items ──
  // The "Get a Quote" form lets customers add these to build a running estimate.
  // Prices are STARTING ESTIMATES only — edit freely. Set custom:true for items with
  // no fixed price (shown as "Custom quote", excluded from the running total).
  quoteItems: [
    {
      id: "room",
      title: "Room / Bedroom",
      unitPrice: 300,
      unit: "per room",
      description: "Walls, ceiling & trim for one standard room",
    },
    {
      id: "living_room",
      title: "Living / Dining Room",
      unitPrice: 350,
      unit: "per room",
      description: "Larger living or dining room",
    },
    {
      id: "hall_stairs",
      title: "Hallway, Stairs & Landing",
      unitPrice: 400,
      unit: "flat",
      description: "Stairwell, landing & hallway",
    },
    {
      id: "full_house",
      title: "Full House Interior",
      unitPrice: 1200,
      unit: "from",
      description: "Complete interior repaint",
    },
    {
      id: "kitchen_cabinets",
      title: "Kitchen Cabinets",
      unitPrice: 750,
      unit: "from",
      description: "Professional respraying / painting of units",
    },
    {
      id: "door",
      title: "Door & Frame",
      unitPrice: 80,
      unit: "per door",
      description: "Each door painted, including the frame",
    },
    {
      id: "woodwork",
      title: "Skirting & Woodwork",
      unitPrice: 120,
      unit: "per room",
      description: "Skirting, architraves & trim per room",
    },
    {
      id: "exterior",
      title: "Exterior Painting",
      unitPrice: 0,
      unit: "custom",
      description: "Masonry, fascia, soffit & window frames",
      custom: true,
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

// Province for each county we serve. Standard, fixed Irish geography (used only for
// factual location context on the town pages). Republic-of-Ireland counties only.
export const provinceByCounty: Record<string, string> = {
  Dublin: "Leinster",
  Wicklow: "Leinster",
  Kildare: "Leinster",
  Louth: "Leinster",
  Meath: "Leinster",
  Westmeath: "Leinster",
  Offaly: "Leinster",
  Laois: "Leinster",
  Kilkenny: "Leinster",
  Carlow: "Leinster",
  Wexford: "Leinster",
  Cork: "Munster",
  Limerick: "Munster",
  Waterford: "Munster",
  Kerry: "Munster",
  Clare: "Munster",
  Galway: "Connacht",
  Sligo: "Connacht",
  Mayo: "Connacht",
  Monaghan: "Ulster",
  Cavan: "Ulster",
  Donegal: "Ulster",
};

// Helper: pre-filled WhatsApp link
export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Helper: pre-filled email link
export function emailLink(subject: string, body: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
