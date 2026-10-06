import { defineField, defineType } from "sanity";

export const portfolio = defineType({
  name: "portfolio",
  title: "Work & Portfolio",
  type: "document",
  fieldsets: [
    { name: "header", title: "Section Heading", options: { collapsible: true, collapsed: false } },
    { name: "beforeAfter1", title: "Before & After #1 (Side-by-Side)", options: { collapsible: true, collapsed: false } },
    { name: "transformation2", title: "Room Transformation #2", options: { collapsible: true, collapsed: true } },
    { name: "generalGallery", title: "General Portfolio Gallery", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      fieldset: "header",
      initialValue: "Our Work & Transformations",
    }),

    defineField({
      name: "transformation1",
      title: "Before & After #1",
      type: "object",
      fieldset: "beforeAfter1",
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
      title: "Room Transformation #2",
      type: "object",
      fieldset: "transformation2",
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
      fieldset: "generalGallery",
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
