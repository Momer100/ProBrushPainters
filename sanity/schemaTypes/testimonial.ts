import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Customer Reviews & Testimonials",
  type: "document",
  fields: [
    defineField({
      name: "author",
      title: "Customer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location / Town",
      type: "string",
      description: "e.g. Dublin, Bray, Naas, Ranelagh",
    }),
    defineField({
      name: "rating",
      title: "Star Rating (1 to 5)",
      type: "number",
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: "reviewText",
      title: "Review Comment",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "serviceCategory",
      title: "Service Category / Tag",
      type: "string",
      description: "e.g. Interior Painting, Kitchen Respraying, Exterior",
    }),
  ],
  preview: {
    select: {
      title: "author",
      location: "location",
      serviceCategory: "serviceCategory",
    },
    prepare({ title, location, serviceCategory }) {
      const sub = [location, serviceCategory].filter(Boolean).join(" · ");
      return {
        title: title || "Anonymous Customer",
        subtitle: sub || "Customer Review",
      };
    },
  },
});
