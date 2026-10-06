import { type SchemaTypeDefinition } from "sanity";
import { siteSettings } from "./siteSettings";
import { service } from "./service";
import { portfolio } from "./portfolio";
import { quoteItem } from "./quoteItem";
import { testimonial } from "./testimonial";
import { processStep } from "./processStep";
import { aboutPage } from "./aboutPage";
import { locationPage } from "./locationPage";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  aboutPage,
  portfolio,
  service,
  quoteItem,
  testimonial,
  processStep,
  locationPage,
];
