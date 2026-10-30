import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Keep the CDN OFF so next-sanity honours the App Router data cache directives we pass in
  // sanityFetch (`next: { revalidate: 60, tags: ["sanity"] }`). With useCdn:true the fetch is
  // force-cached and the 60s revalidate never fires, which froze the /blog listing at its
  // (empty) build-time state. Next's data cache still throttles real API calls to ~1/60s per
  // query, so performance is unaffected.
  useCdn: false,
});
