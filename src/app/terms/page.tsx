import type { Metadata } from "next";
import { site } from "@/config/site";
import LegalPage from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms and conditions for using the ${site.name} website and requesting quotes.`,
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="September 2026">
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the{" "}
        {site.domain} website operated by {site.name} (&ldquo;we&rdquo;,
        &ldquo;us&rdquo; or &ldquo;our&rdquo;). By using this website, you agree to
        these Terms. If you do not agree, please do not use the site.
      </p>

      <h2>About us and our services</h2>
      <p>
        {site.name} provides professional painting and decorating services across
        Ireland. This website lets you learn about our services and request a quote.
      </p>

      <h2>Quotes and estimates</h2>
      <p>
        Any prices shown on this website — including the instant estimate from our
        quote form — are <strong>indicative starting estimates only</strong>. They
        are not a formal quote, offer, or binding contract. A firm, fixed price is
        provided separately once we have assessed the details of your job. Work only
        proceeds once a quote has been agreed between us.
      </p>

      <h2>Photos and information you provide</h2>
      <p>
        When you upload photos or provide details through our quote form, you confirm
        that you are entitled to share them and that the information is accurate. We
        use what you provide solely to prepare your quote and carry out your work, as
        described in our{" "}
        <a href="/privacy/">Privacy Policy</a>.
      </p>

      <h2>Acceptable use</h2>
      <p>
        You agree to use this website lawfully and not to misuse it, interfere with
        its operation, or attempt to gain unauthorised access to it.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The content on this website — including text, images, logos and branding — is
        owned by or licensed to {site.name} and may not be copied or reused without
        our permission.
      </p>

      <h2>Disclaimers</h2>
      <p>
        The website and its content are provided &ldquo;as is&rdquo;. While we take
        care to keep information accurate and up to date, we do not warrant that it is
        complete or error-free, and estimated prices are not guaranteed.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by Irish law, {site.name} will not be liable
        for any indirect or consequential loss arising from your use of this website.
        Nothing in these Terms limits any liability that cannot be limited by law.
      </p>

      <h2>Third-party links</h2>
      <p>
        This website may link to third-party websites. We are not responsible for the
        content or practices of those sites.
      </p>

      <h2>Governing law</h2>
      <p>
        These Terms are governed by the laws of Ireland, and any disputes are subject
        to the jurisdiction of the Irish courts.
      </p>

      <h2>Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. The &ldquo;last updated&rdquo;
        date at the top shows when they were last changed.
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
