import { defineField, defineType } from "sanity";

export const processStep = defineType({
  name: "processStep",
  title: "Process Steps (How It Works)",
  type: "document",
  fields: [
    defineField({
      name: "stepNumber",
      title: "Step Number (1-4)",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Step Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Step Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Step Number Ascending",
      name: "stepAsc",
      by: [{ field: "stepNumber", direction: "asc" }],
    },
  ],
});
