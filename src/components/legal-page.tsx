// Shared shell for legal pages (Privacy, Terms). Styles the prose children via
// Tailwind arbitrary variants so the pages can use plain <h2>/<p>/<ul>/<a> tags.
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-accent">
            Legal
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Last updated: {updated}
          </p>

          <div
            className="mt-8 text-base leading-relaxed text-muted-foreground
              [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-primary
              [&_p]:mt-3
              [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5
              [&_strong]:font-semibold [&_strong]:text-foreground
              [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:decoration-accent/40 [&_a]:underline-offset-2 hover:[&_a]:text-accent"
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
