#!/usr/bin/env node
// Submit all site URLs to IndexNow (Bing, Yandex, etc.) so search engines re-crawl
// quickly after content changes. Reads the LIVE sitemap so it always matches what's
// deployed. Run after a deploy: `npm run indexnow`.
//
// IndexNow keys are public by design (the key file is world-readable), so this key is
// safe to keep in the repo.

const HOST = "www.probrushpainters.ie";
const KEY = "a9b0b1bc1c054a138a95674ca7bf3a3e";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

async function main() {
  console.log(`Fetching sitemap: ${SITEMAP_URL}`);
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap (${res.status}). Is the site deployed?`);
  }
  const xml = await res.text();

  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (urlList.length === 0) {
    throw new Error("No <loc> URLs found in sitemap.");
  }
  console.log(`Submitting ${urlList.length} URLs to IndexNow…`);

  const submit = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });

  const text = await submit.text();
  console.log(`IndexNow responded: ${submit.status} ${submit.statusText}`);
  if (text) console.log(text);

  // 200 = accepted, 202 = accepted (validation pending). Both are success.
  if (submit.status !== 200 && submit.status !== 202) {
    process.exitCode = 1;
    console.error("Submission was not accepted — check the key file is live.");
  } else {
    console.log("Done ✅");
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exitCode = 1;
});
