import { groq } from "next-sanity";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`;

export const servicesQuery = groq`*[_type == "service"]{
  "id": id.current,
  title,
  icon,
  blurb,
  long,
  includes
}`;

export const portfolioQuery = groq`*[_type == "portfolio"][0]{
  title,
  transformation1 {
    beforeImage { ..., "url": asset->url, alt },
    afterImage { ..., "url": asset->url, alt }
  },
  transformation2 {
    beforeImage { ..., "url": asset->url, alt },
    afterImages[] { ..., "url": asset->url, alt, label }
  },
  gallery[] { ..., "url": asset->url, alt, title }
}`;

export const quoteItemsQuery = groq`*[_type == "quoteItem"]{
  id,
  title,
  unitPrice,
  unit,
  description,
  custom
}`;
