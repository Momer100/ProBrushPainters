import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page Content",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow Subtitle",
      type: "string",
      initialValue: "About us",
    }),
    defineField({
      name: "title",
      title: "Main Heading",
      type: "string",
      initialValue: "A painting team you can trust",
    }),
    defineField({
      name: "paragraph1",
      title: "Paragraph 1 (Intro)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "paragraph2",
      title: "Paragraph 2 (Quality & Process)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "paragraph3",
      title: "Paragraph 3 (Call to Action)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "teamImage",
      title: "Team / Work Photo",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt Text" }],
    }),
    defineField({
      name: "values",
      title: "Company Values / Promises",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon Name",
              type: "string",
              description: "e.g. BadgeCheck, Clock, Sparkles, ShieldCheck",
            }),
            defineField({ name: "title", title: "Value Title", type: "string" }),
            defineField({ name: "text", title: "Value Description", type: "text", rows: 2 }),
          ],
        },
      ],
    }),
  ],
});
