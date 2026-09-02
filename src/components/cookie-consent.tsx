"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { site } from "@/config/site";

const STORAGE_KEY = "pbp-cookie-consent";
type Consent = "granted" | "denied";

// GDPR/ePrivacy: Google Analytics only loads AFTER the visitor accepts. The choice is
// remembered so the banner shows once. Declining means GA never loads.
export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Consent | null;
    if (stored === "granted" || stored === "denied") setConsent(stored);
    setReady(true);
  }, []);

  function choose(value: Consent) {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  }

  return (
    <>
      {/* Load Google Analytics only once consent is granted */}
      {consent === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${site.analyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${site.analyticsId}');
            `}
          </Script>
        </>
      )}

      {/* Consent banner — shown only when no choice has been made yet */}
      {ready && consent === null && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-[4.5rem] z-[60] px-4 md:bottom-0 md:px-6 md:pb-6"
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-border bg-white p-5 shadow-lift sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-muted-foreground">
              We use cookies to analyse site traffic and improve your experience.
              You can accept or decline analytics cookies — essential site functions
              work either way.
            </p>
            <div className="flex shrink-0 gap-2.5">
              <button
                type="button"
                onClick={() => choose("denied")}
                className="rounded-xl border border-border px-4 py-2 text-sm font-bold text-primary transition-colors hover:border-primary/40"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => choose("granted")}
                className="rounded-xl bg-accent px-5 py-2 text-sm font-bold text-white shadow-md transition-opacity hover:opacity-90"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
