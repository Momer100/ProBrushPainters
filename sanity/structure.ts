import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content Management")
    .items([
      S.listItem()
        .title("Pages & Main Sections")
        .child(
          S.list()
            .title("Pages & Main Sections")
            .items([
              S.listItem()
                .title("Site Settings & Hero")
                .child(
                  S.document()
                    .schemaType("siteSettings")
                    .documentId("siteSettings")
                ),
              S.listItem()
                .title("About Page")
                .child(
                  S.document()
                    .schemaType("aboutPage")
                    .documentId("aboutPage")
                ),
              S.listItem()
                .title("Work & Portfolio")
                .child(
                  S.document()
                    .schemaType("portfolio")
                    .documentId("portfolio")
                ),
            ])
        ),

      S.listItem()
        .title("Services & Pricing")
        .child(
          S.list()
            .title("Services & Pricing")
            .items([
              S.documentTypeListItem("service").title("Services"),
              S.documentTypeListItem("quoteItem").title("Quote Calculator Pricing"),
            ])
        ),

      S.listItem()
        .title("Trust & Social Proof")
        .child(
          S.list()
            .title("Trust & Social Proof")
            .items([
              S.documentTypeListItem("testimonial").title("Customer Reviews"),
              S.documentTypeListItem("processStep").title("How It Works (Steps)"),
            ])
        ),

      S.listItem()
        .title("SEO & Regional Landing Pages")
        .child(
          S.list()
            .title("SEO & Regional Landing Pages")
            .items([
              S.documentTypeListItem("locationPage").title("Location Pages"),
            ])
        ),
    ]);
