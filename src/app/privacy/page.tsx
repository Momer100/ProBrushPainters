import type { Metadata } from "next";
import { site } from "@/config/site";
import LegalPage from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects your personal data, and your rights under GDPR.`,
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="September 2026">
      <p>
        This Privacy Policy explains how {site.name} (&ldquo;we&rdquo;,
        &ldquo;us&rdquo; or &ldquo;our&rdquo;) collects, uses and protects your
        personal data when you visit {site.domain} or contact us for a quote. We are
        the data controller for the information described below. If you have any
        questions, email us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Information we collect</h2>
      <p>We only collect what we need to respond to you and run our website:</p>
      <ul>
        <li>
          <strong>Quote &amp; contact details</strong> — when you use our quote
          form or contact us, we collect your name, phone number, email address,
          your location/town, the job details you provide, and any photos you
          choose to upload.
        </li>
        <li>
          <strong>Analytics data</strong> — if you accept analytics cookies, we use
          Google Analytics to understand how visitors use the site (for example,
          pages viewed, device type and approximate region). This does not run
          unless you consent.
        </li>
        <li>
          <strong>Technical data</strong> — our hosting provider automatically logs
          standard technical information such as IP address and browser type to keep
          the site secure and working.
        </li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>To prepare and send you a quote and respond to your enquiry.</li>
        <li>To carry out painting and decorating work you ask us to do.</li>
        <li>To operate, secure and improve our website.</li>
      </ul>

      <h2>Legal bases</h2>
      <p>Under the GDPR, we rely on:</p>
      <ul>
        <li>
          <strong>Your consent</strong> — for analytics cookies (which you can give
          or refuse in the cookie banner, and change at any time).
        </li>
        <li>
          <strong>Legitimate interests / steps before a contract</strong> — to
          respond to your quote request and provide the services you ask for.
        </li>
      </ul>

      <h2>Who we share it with</h2>
      <p>
        We do not sell your personal data. We use a small number of trusted service
        providers to run the website and deliver your enquiry to us:
      </p>
      <ul>
        <li>
          <strong>Vercel</strong> — website hosting.
        </li>
        <li>
          <strong>Resend</strong> — delivers your quote-form submission to us by
          email.
        </li>
        <li>
          <strong>Google Analytics</strong> — website analytics (only with your
          consent).
        </li>
      </ul>
      <p>
        Some of these providers may process data outside the European Economic Area.
        Where that happens, it is done under appropriate safeguards as required by
        law.
      </p>

      <h2>Cookies</h2>
      <p>
        Cookies are small files stored on your device. We use two types:
      </p>
      <ul>
        <li>
          <strong>Essential cookies</strong> — needed for the website to function.
        </li>
        <li>
          <strong>Analytics cookies</strong> — set by Google Analytics, only if you
          accept them in our cookie banner.
        </li>
      </ul>
      <p>
        You can change your choice at any time by clearing this site&apos;s cookies
        in your browser, which will bring the banner back on your next visit.
      </p>

      <h2>How long we keep your data</h2>
      <p>
        We keep quote enquiries for as long as needed to respond to you and provide
        our services, plus a reasonable period afterwards for our records, and then
        delete them. Analytics data is retained according to our Google Analytics
        settings.
      </p>

      <h2>Your rights</h2>
      <p>Under the GDPR you have the right to:</p>
      <ul>
        <li>access the personal data we hold about you;</li>
        <li>have inaccurate data corrected;</li>
        <li>ask us to erase your data;</li>
        <li>restrict or object to how we use it;</li>
        <li>request a copy of your data (portability); and</li>
        <li>withdraw consent at any time.</li>
      </ul>
      <p>
        To exercise any of these rights, email us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
        <a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a>.
      </p>

      <h2>Complaints</h2>
      <p>
        If you are unhappy with how we handle your data, you can contact us first so
        we can put it right. You also have the right to lodge a complaint with the
        Irish supervisory authority, the Data Protection Commission (
        <a
          href="https://www.dataprotection.ie"
          target="_blank"
          rel="noopener noreferrer"
        >
          dataprotection.ie
        </a>
        ).
      </p>

      <h2>Security</h2>
      <p>
        We take reasonable measures to protect your personal data. However, no
        method of transmission over the internet is completely secure, so we cannot
        guarantee absolute security.
      </p>

      <h2>Children</h2>
      <p>
        Our website and services are intended for adults and are not directed at
        children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The &ldquo;last updated&rdquo;
        date at the top shows when it was last changed.
      </p>

      <h2>Contact us</h2>
      <p>
        {site.name}
        <br />
        Email: <a href={`mailto:${site.email}`}>{site.email}</a>
        <br />
        Phone: <a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a>
      </p>
    </LegalPage>
  );
}
