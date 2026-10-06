import { defineField, defineType } from "sanity";

export const quoteItem = defineType({
  name: "quoteItem",
  title: "Quote Calculator Pricing",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "Item Key ID",
      type: "string",
      description: "Unique key ID (e.g. room, living_room, hall_stairs, full_house, kitchen_cabinets, door, woodwork, exterior)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Item Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "unitPrice",
      title: "Unit Price (€)",
      type: "number",
      description: "Starting price per unit (set to 0 for custom quotes)",
    }),
    defineField({
      name: "unit",
      title: "Pricing Unit Label",
      type: "string",
      description: "e.g. 'per room', 'flat', 'from', 'per door', 'custom'",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "custom",
      title: "Is Custom Quote? (No fixed price)",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      unitPrice: "unitPrice",
      unit: "unit",
      custom: "custom",
    },
    prepare({ title, unitPrice, unit, custom }) {
      const priceStr = custom ? "Custom Quote" : `€${unitPrice ?? 0} (${unit || "per item"})`;
      return {
        title: title || "New Pricing Item",
        subtitle: priceStr,
      };
    },
  },
});
