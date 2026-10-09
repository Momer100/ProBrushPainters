import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Services",
  type: "document",
  fieldsets: [
    { name: "basicInfo", title: "Basic Information", options: { collapsible: true, collapsed: false } },
    { name: "seo", title: "SEO Settings", options: { collapsible: true, collapsed: false } },
    { name: "hero", title: "Hero Section", options: { collapsible: true, collapsed: false } },
    { name: "pageContent", title: "Page Content", options: { collapsible: true, collapsed: false } },
    { name: "descriptions", title: "Detailed Descriptions", options: { collapsible: true, collapsed: false } },
    { name: "bulletPoints", title: "Key Features & Includes", options: { collapsible: true, collapsed: false } },
    { name: "faqs", title: "Frequently Asked Questions", options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Service Title",
      type: "string",
      fieldset: "basicInfo",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "id",
      title: "URL Slug ID",
      type: "slug",
      fieldset: "basicInfo",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Lucide Icon Name",
      type: "string",
      fieldset: "basicInfo",
      description: "e.g. PaintRoller, Home, SprayCan, Building2, Wallpaper, Hammer, DoorOpen, Paintbrush, PaintBucket, Droplets",
    }),
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      fieldset: "seo",
      description: "Custom page title for search engines. Leave blank for the default.",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 2,
      fieldset: "seo",
      description: "Custom meta description for search engines. Leave blank to use the short blurb.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      fieldset: "hero",
      description: "The main photograph displayed at the top of the service page.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Describe the image for screen readers and search engines.",
          validation: (Rule) => Rule.required(),
        })
      ]
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      fieldset: "hero",
      description: "Custom H1 headline. Leave blank for the default.",
    }),
    defineField({
      name: "heroText",
      title: "Hero Text",
      type: "text",
      rows: 3,
      fieldset: "hero",
      description: "Custom introductory paragraph for the hero section.",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      fieldset: "pageContent",
      description: "The main body content for the service page. Write detailed descriptions with headings, paragraphs, images, and links for SEO.",
      of: [
        { type: "block" },
        { 
          type: "image", 
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative Text",
              description: "Describe the image for screen readers and search engines.",
              validation: (Rule) => Rule.required(),
            })
          ]
        },
      ],
    }),
    defineField({
      name: "blurb",
      title: "Short Blurb (Card Preview)",
      type: "text",
      rows: 2,
      fieldset: "descriptions",
    }),
    defineField({
      name: "long",
      title: "Full Service Description",
      type: "text",
      rows: 4,
      fieldset: "descriptions",
    }),

    defineField({
      name: "includes",
      title: "What's Included (Bullet Points)",
      type: "array",
      of: [{ type: "string" }],
      fieldset: "bulletPoints",
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      fieldset: "faqs",
      description: "Service-specific frequently asked questions. These will appear on the service page with Google FAQ rich snippets.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
});
