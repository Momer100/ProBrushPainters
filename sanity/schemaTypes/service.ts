import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Services",
  type: "document",
  fieldsets: [
    { name: "basicInfo", title: "Basic Information", options: { collapsible: true, collapsed: false } },
    { name: "descriptions", title: "Detailed Descriptions", options: { collapsible: true, collapsed: false } },
    { name: "bulletPoints", title: "Key Features & Includes", options: { collapsible: true, collapsed: false } },
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
  ],
});
