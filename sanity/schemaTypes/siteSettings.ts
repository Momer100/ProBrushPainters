import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings & Homepage Hero",
  type: "document",
  fieldsets: [
    { name: "contactDetails", title: "Business & Contact Information", options: { collapsible: true, collapsed: false } },
    { name: "heroSection", title: "Homepage Hero Banner", options: { collapsible: true, collapsed: false } },
    { name: "ctaBand", title: "Call To Action Band (Footer Banner)", options: { collapsible: true, collapsed: true } },
    { name: "businessStats", title: "Business Statistics & Admin", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Business Name",
      type: "string",
      fieldset: "contactDetails",
      initialValue: "ProBrush Painters",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      fieldset: "contactDetails",
      initialValue: "Painting & Decorating",
    }),
    defineField({
      name: "phoneDisplay",
      title: "Display Phone Number",
      type: "string",
      fieldset: "contactDetails",
      description: "Phone number shown on site buttons and header (e.g. 086 125 3342)",
    }),
    defineField({
      name: "phoneHref",
      title: "Phone Call Link Href",
      type: "string",
      fieldset: "contactDetails",
      description: "International format for tel: links (e.g. +353861253342)",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
      fieldset: "contactDetails",
      description: "Digits only with country code (e.g. 353861253342)",
    }),
    defineField({
      name: "email",
      title: "Public Email Address",
      type: "string",
      fieldset: "contactDetails",
    }),
    defineField({
      name: "addressLine",
      title: "Address / Region",
      type: "string",
      fieldset: "contactDetails",
      initialValue: "Ireland",
    }),

    // ── Homepage Hero Section ──
    defineField({
      name: "heroTitle",
      title: "Hero Headline",
      type: "string",
      fieldset: "heroSection",
      description: "Main headline on homepage hero banner",
      initialValue: "Professional Painting & Decorating Across Ireland",
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero Subtext",
      type: "text",
      rows: 3,
      fieldset: "heroSection",
      description: "Subheading under the main headline",
      initialValue: "Interior & exterior painting, kitchen respraying, and wallpapering. Free fixed-price quotes, quality trade paints, and zero mess left behind.",
    }),
    defineField({
      name: "heroCtaText",
      title: "Primary Button Label",
      type: "string",
      fieldset: "heroSection",
      initialValue: "Get a Free Fast Quote",
    }),
    defineField({
      name: "heroSecondaryCtaText",
      title: "Secondary Button Label",
      type: "string",
      fieldset: "heroSection",
      initialValue: "Call Us Now",
    }),

    // ── Bottom Call To Action Band ──
    defineField({
      name: "ctaHeading",
      title: "CTA Band Heading",
      type: "string",
      fieldset: "ctaBand",
      initialValue: "Ready to transform your home?",
    }),
    defineField({
      name: "ctaSubtext",
      title: "CTA Band Subtext",
      type: "string",
      fieldset: "ctaBand",
      initialValue: "Get a fast, free, fixed-price quote with no obligation today.",
    }),
    defineField({
      name: "ctaButtonText",
      title: "CTA Band Button Label",
      type: "string",
      fieldset: "ctaBand",
      initialValue: "Get Your Free Quote",
    }),

    // ── Admin & Stats ──
    defineField({
      name: "yearsInBusiness",
      title: "Years in Business",
      type: "number",
      fieldset: "businessStats",
      initialValue: 8,
    }),
    defineField({
      name: "quoteEmail",
      title: "Quote Form Recipient Email",
      type: "string",
      fieldset: "businessStats",
      description: "Email address where quote submissions are delivered",
    }),
    defineField({
      name: "googleReviewUrl",
      title: "Google Review URL",
      type: "url",
      fieldset: "businessStats",
      description: "Direct link for customers to leave a Google review",
    }),
  ],
});
