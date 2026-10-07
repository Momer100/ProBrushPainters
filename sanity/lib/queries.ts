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

export const testimonialsQuery = groq`*[_type == "testimonial"]{
  author,
  location,
  rating,
  reviewText,
  serviceCategory
}`;

export const processStepsQuery = groq`*[_type == "processStep"] | order(stepNumber asc){
  stepNumber,
  title,
  text
}`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  eyebrow,
  title,
  paragraph1,
  paragraph2,
  paragraph3,
  teamImage { ..., "url": asset->url, alt },
  values[] { icon, title, text }
}`;

export const locationPageQuery = groq`*[_type == "locationPage" && slug.current == $slug][0]{
  townName,
  county,
  customHeadline,
  customDescription
}`;

export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc){
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage { ..., "url": asset->url, alt },
  "authorName": author->name
}`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  slug,
  publishedAt,
  mainImage { ..., "url": asset->url, alt },
  "authorName": author->name,
  "authorImage": author->image { ..., "url": asset->url, alt },
  body
}`;
