import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Services",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "Service Slug ID",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Service Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Lucide Icon Name",
      type: "string",
      description: "e.g. PaintRoller, Home, SprayCan, Building2, Wallpaper, Hammer, DoorOpen, Paintbrush, PaintBucket, Droplets",
    }),
    defineField({
      name: "blurb",
      title: "Short Blurb",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "long",
      title: "Long Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "includes",
      title: "What's Included (Bullet points)",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
