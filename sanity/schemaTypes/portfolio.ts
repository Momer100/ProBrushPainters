import { defineField, defineType } from "sanity";

export const portfolio = defineType({
  name: "portfolio",
  title: "Work & Portfolio",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Our Work & Transformations",
    }),
    defineField({
      name: "transformation1",
      title: "Before & After #1 (Side-by-Side)",
      type: "object",
      fields: [
        defineField({
          name: "beforeImage",
          title: "Before Image",
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt Text" }],
        }),
        defineField({
          name: "afterImage",
          title: "After Image",
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt Text" }],
        }),
      ],
    }),
    defineField({
      name: "transformation2",
      title: "Room Transformation #2 (Detailed)",
      type: "object",
      fields: [
        defineField({
          name: "beforeImage",
          title: "Before / During Image",
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt Text" }],
        }),
        defineField({
          name: "afterImages",
          title: "After Images (Grid)",
          type: "array",
          of: [
            {
              type: "image",
              options: { hotspot: true },
              fields: [
                { name: "alt", type: "string", title: "Alt Text" },
                { name: "label", type: "string", title: "Label / Tag" },
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "General Portfolio Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt Text" },
            { name: "title", type: "string", title: "Project Title / Location" },
          ],
        },
      ],
    }),
  ],
});
