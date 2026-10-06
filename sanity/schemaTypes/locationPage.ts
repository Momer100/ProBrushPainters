import { defineField, defineType } from "sanity";

export const locationPage = defineType({
  name: "locationPage",
  title: "Location Pages (SEO)",
  type: "document",
  fields: [
    defineField({
      name: "townName",
      title: "Town / Area Name",
      type: "string",
      description: "e.g. Ranelagh, Bray, Naas, Clontarf",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Page URL Slug",
      type: "slug",
      options: { source: "townName" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "county",
      title: "County",
      type: "string",
      description: "e.g. Dublin, Wicklow, Kildare",
    }),
    defineField({
      name: "customHeadline",
      title: "Custom Headline (Optional)",
      type: "string",
      description: "Custom hero headline for this location page",
    }),
    defineField({
      name: "customDescription",
      title: "Custom Description / Copy (Optional)",
      type: "text",
      rows: 4,
      description: "Custom introductory text for SEO on this location page",
    }),
  ],
});
