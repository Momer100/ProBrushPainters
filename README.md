# ProBrush Painters — probrushpainters.ie

A high-converting marketing website for a painting & decorating business.
Built with **Next.js 15 (App Router) + TypeScript + Tailwind CSS**, exported as a
fast static site.

## Pages

- `/` — landing page: hero, trust stats, services, before/after sliders, process, reviews, areas served, CTAs
- `/get-a-quote/` — chat-style quote form that sends the request via WhatsApp or email (no server needed)
- `/about/` — story, values, gallery, reviews

## Editing content (the important file)

**Everything business-specific lives in one file:**

```
src/config/site.ts
```

Phone number, WhatsApp, email, services, reviews, areas served, stats — change them
there and the whole site updates. Photos live in `public/images/` — replace the
placeholder images with real project photos using the same file names.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build

```bash
npm run build      # outputs a static site to /out
```

## Deploy: GitHub → Vercel

### 1. Push to GitHub

Create a new (empty) repository on GitHub, then in this folder:

```bash
git remote add origin https://github.com/YOUR-USERNAME/probrush-painters.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New → Project**
2. **Import** the `probrush-painters` GitHub repo
3. Vercel auto-detects Next.js — just click **Deploy** (no settings needed)

Every push to `main` after that auto-deploys.

### 3. Connect probrushpainters.ie

1. In the Vercel project → **Settings → Domains** → add `probrushpainters.ie`
2. At the domain registrar, point DNS to Vercel:
   - `A` record: `@` → `76.76.21.21`
   - `CNAME` record: `www` → `cname.vercel-dns.com`
3. Wait for DNS to propagate (usually minutes to a few hours) — Vercel handles SSL automatically.

## How the quote form works

The form collects the job details step-by-step (service, photos, contact info), then
POSTs to the `/api/quote` route, which emails the request — with the photos attached —
via **Resend** to `site.quoteEmail`. Photos are compressed in the browser before upload
to stay under Vercel's ~4.5 MB request limit.

**Required env var:** set `RESEND_API_KEY` in Vercel (**Settings → Environment
Variables**) for the form to send. The Resend Marketplace integration usually adds it
automatically. Without it, submissions are logged but no email is sent.

The sender address (`quoteFrom`) and recipient (`quoteEmail`) live in
`src/config/site.ts`. The `quoteFrom` domain must be **Verified in Resend**. The page
also offers WhatsApp / call / email options for visitors who prefer them.

The quote form's line items and starting prices are also in `src/config/site.ts`
(`quoteItems`) — edit titles/prices there and the builder updates automatically.

## Bing IndexNow (fast re-indexing)

The IndexNow key file is served at `/a9b0b1bc1c054a138a95674ca7bf3a3e.txt`. After
deploying new or changed pages, notify Bing/Yandex to re-crawl:

```bash
npm run indexnow    # reads the live sitemap and submits every URL
```

(The key file must be live on the domain first — i.e. deploy before running.)
