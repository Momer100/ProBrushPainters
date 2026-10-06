import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
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
  ],
});
