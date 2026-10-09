import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fieldsets: [
    { name: "seo", title: "SEO Settings" },
    { name: "faqs", title: "Frequently Asked Questions" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
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
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      description: "A short summary of the post.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
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
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      fieldset: "seo",
      description: "Custom meta title for the <title> tag and OG title. Leave blank to use the post title.",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 2,
      fieldset: "seo",
      description: "Custom meta description. Leave blank to use the excerpt.",
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      fieldset: "faqs",
      description: "Add frequently asked questions related to this post. These will appear at the bottom of the post and generate Google FAQ rich snippets.",
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

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return {
        ...selection,
        subtitle: author && `by ${author}`,
      };
    },
  },
});
