import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings & Homepage Hero",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Business Name",
      type: "string",
      initialValue: "ProBrush Painters",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      initialValue: "Painting & Decorating",
    }),
    defineField({
      name: "phoneDisplay",
      title: "Display Phone Number",
      type: "string",
      description: "Phone number shown on site buttons and header (e.g. 086 125 3342)",
    }),
    defineField({
      name: "phoneHref",
      title: "Phone Call Href",
      type: "string",
      description: "International format for tel: links (e.g. +353861253342)",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
      description: "Digits only with country code (e.g. 353861253342)",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
    }),
    defineField({
      name: "googleReviewUrl",
      title: "Google Review URL",
      type: "url",
      description: "Direct link to leave a Google Review",
    }),
    defineField({
      name: "quoteEmail",
      title: "Quote Recipient Email",
      type: "string",
      description: "Email address where quote requests are delivered",
    }),
    defineField({
      name: "addressLine",
      title: "Address / Region",
      type: "string",
      initialValue: "Ireland",
    }),
    defineField({
      name: "yearsInBusiness",
      title: "Years in Business",
      type: "number",
      initialValue: 8,
    }),

    // ── Homepage Hero Section ──
    defineField({
      name: "heroTitle",
      title: "Hero Headline",
      type: "string",
      description: "Main headline on homepage hero",
      initialValue: "Professional Painting & Decorating Across Ireland",
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero Subtext",
      type: "text",
      rows: 3,
      description: "Subheading under the main headline",
      initialValue: "Interior & exterior painting, kitchen respraying, and wallpapering. Free fixed-price quotes, quality trade paints, and zero mess left behind.",
    }),
    defineField({
      name: "heroCtaText",
      title: "Hero Primary Button Label",
      type: "string",
      initialValue: "Get a Free Fast Quote",
    }),
    defineField({
      name: "heroSecondaryCtaText",
      title: "Hero Call Button Label",
      type: "string",
      initialValue: "Call Us Now",
    }),

    // ── Bottom Call To Action Band ──
    defineField({
      name: "ctaHeading",
      title: "CTA Band Heading",
      type: "string",
      initialValue: "Ready to transform your home?",
    }),
    defineField({
      name: "ctaSubtext",
      title: "CTA Band Subtext",
      type: "string",
      initialValue: "Get a fast, free, fixed-price quote with no obligation today.",
    }),
    defineField({
      name: "ctaButtonText",
      title: "CTA Band Button Label",
      type: "string",
      initialValue: "Get Your Free Quote",
    }),
  ],
});
