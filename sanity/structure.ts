import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content Management")
    .items([
      // Singletons
      S.listItem()
        .title("⚙️ Site Settings & Hero")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
      S.listItem()
        .title("ℹ️ About Page")
        .child(
          S.document()
            .schemaType("aboutPage")
            .documentId("aboutPage")
        ),
      S.listItem()
        .title("🖼️ Work & Portfolio")
        .child(
          S.document()
            .schemaType("portfolio")
            .documentId("portfolio")
        ),
      S.divider(),
      // Document Collections
      S.documentTypeListItem("service").title("🛠️ Services"),
      S.documentTypeListItem("testimonial").title("⭐ Customer Reviews"),
      S.documentTypeListItem("processStep").title("📋 How It Works (Steps)"),
      S.documentTypeListItem("quoteItem").title("💰 Quote Calculator Pricing"),
      S.documentTypeListItem("locationPage").title("📍 Location Pages (SEO)"),
    ]);
