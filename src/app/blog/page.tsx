import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/../sanity/lib/data";
import SectionHeading from "@/components/section-heading";
import CtaBand from "@/components/cta-band";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Read the latest articles, tips, and news from ${site.name}.`,
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <section className="py-16 lg:py-24 bg-white">
        <div className="container">
          <SectionHeading
            as="h1"
            center={true}
            eyebrow="Our Blog"
            title="Painting tips, news & inspiration"
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.length > 0 ? (
              posts.map((post: any) => (
                <Link key={post.slug?.current} href={`/blog/${post.slug?.current}`} className="group block h-full">
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:shadow-lift hover:-translate-y-1">
                    <div className="relative aspect-[3/2] overflow-hidden bg-accent/5">
                      {post.mainImage ? (
                        <Image
                          src={post.mainImage.url}
                          alt={post.mainImage.alt || post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-muted">
                          <span className="text-muted-foreground">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        {post.publishedAt && (
                          <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString("en-IE", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </time>
                        )}
                        {post.authorName && <span>By {post.authorName}</span>}
                      </div>
                      <h2 className="text-xl font-extrabold text-primary mb-2 group-hover:text-accent transition-colors">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="mt-auto font-semibold text-accent flex items-center text-sm">
                        Read more <span className="ml-1">→</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground">
                No blog posts found. Check back later!
              </p>
            )}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
