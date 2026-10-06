import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page Content",
  type: "document",
  fieldsets: [
    { name: "header", title: "Page Header", options: { collapsible: true, collapsed: false } },
    { name: "storyContent", title: "Company Story & Paragraphs", options: { collapsible: true, collapsed: false } },
    { name: "teamMedia", title: "Team & Work Media", options: { collapsible: true, collapsed: true } },
    { name: "companyValues", title: "Core Company Values", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow Subtitle",
      type: "string",
      fieldset: "header",
      initialValue: "About us",
    }),
    defineField({
      name: "title",
      title: "Main Heading",
      type: "string",
      fieldset: "header",
      initialValue: "A painting team you can trust",
    }),

    defineField({
      name: "paragraph1",
      title: "Paragraph 1 (Company Intro)",
      type: "text",
      rows: 3,
      fieldset: "storyContent",
    }),
    defineField({
      name: "paragraph2",
      title: "Paragraph 2 (Quality & Commitment)",
      type: "text",
      rows: 3,
      fieldset: "storyContent",
    }),
    defineField({
      name: "paragraph3",
      title: "Paragraph 3 (Call To Action)",
      type: "text",
      rows: 3,
      fieldset: "storyContent",
    }),

    defineField({
      name: "teamImage",
      title: "Team Photo / Work Showcase",
      type: "image",
      fieldset: "teamMedia",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt Text" }],
    }),

    defineField({
      name: "values",
      title: "Company Values / Promises",
      type: "array",
      fieldset: "companyValues",
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
