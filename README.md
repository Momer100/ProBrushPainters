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

No backend required: the form collects the job details step-by-step, then opens
WhatsApp (or the visitor's email app) with everything pre-filled — photos can be
attached right there. To change where requests go, edit the phone/WhatsApp/email
in `src/config/site.ts`.
