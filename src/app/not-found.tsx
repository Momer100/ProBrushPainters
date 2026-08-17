import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="py-32 text-center">
      <div className="container">
        <p className="text-6xl font-extrabold text-primary">404</p>
        <h1 className="mt-4 text-2xl font-extrabold text-primary">
          This wall hasn&apos;t been painted yet
        </h1>
        <p className="mt-3 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/" className={buttonVariants({ className: "mt-8" })}>
          Back to home
        </Link>
      </div>
    </section>
  );
}
