import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { getPostBySlug, getPosts } from "@/../sanity/lib/data";
import { urlFor } from "@/../sanity/lib/image";
import CtaBand from "@/components/cta-band";
import { ArrowLeft, Clock } from "lucide-react";
import { site } from "@/config/site";

function calculateReadingTime(body: any[]): number {
  if (!body || !Array.isArray(body)) return 1;
  const text = body
    .filter((block) => block._type === "block" && block.children)
    .map((block) => block.children.map((child: any) => child.text).join(""))
    .join(" ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post: any) => ({
    slug: post.slug?.current,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.metaTitle ? post.metaTitle : `${post.title} | ${site.name} Blog`,
    description: post.metaDescription ? post.metaDescription : post.excerpt,
    openGraph: {
      title: post.metaTitle ? post.metaTitle : `${post.title} | ${site.name} Blog`,
      description: post.metaDescription ? post.metaDescription : post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.mainImage?.url ? [post.mainImage.url] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const portableTextComponents = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref && !value?.url) {
          return null;
        }
        const imageUrl = value.url || urlFor(value).url();
        return (
          <div className="relative my-8 aspect-video overflow-hidden rounded-xl bg-muted">
            <Image
              src={imageUrl}
              alt={value.alt || "Blog image"}
              fill
              className="object-cover"
            />
          </div>
        );
      },
    },
    marks: {
      link: ({ children, value }: any) => {
        const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
        const target = !value.href.startsWith("/") ? "_blank" : undefined;
        return (
          <a href={value.href} rel={rel} target={target} className="text-accent hover:underline font-medium">
            {children}
          </a>
        );
      },
    },
    block: {
      h2: ({ children }: any) => <h2 className="mt-12 mb-6 text-3xl font-extrabold text-primary">{children}</h2>,
      h3: ({ children }: any) => <h3 className="mt-8 mb-4 text-2xl font-bold text-primary">{children}</h3>,
      normal: ({ children }: any) => <p className="mb-6 leading-relaxed text-muted-foreground">{children}</p>,
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-accent pl-4 italic my-6 text-muted-foreground">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => <ul className="mb-6 list-inside list-disc space-y-2 text-muted-foreground">{children}</ul>,
      number: ({ children }: any) => <ol className="mb-6 list-inside list-decimal space-y-2 text-muted-foreground">{children}</ol>,
    },
  };

  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map((faq: any) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <>
      <article className="py-16 lg:py-24 bg-white">
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}
        <div className="container max-w-3xl">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all posts
          </Link>

          <header className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              {post.authorName && (
                <div className="flex items-center">
                  {post.authorImage && (
                    <Image
                      src={post.authorImage.url}
                      alt={post.authorName}
                      width={32}
                      height={32}
                      className="mr-3 rounded-full"
                    />
                  )}
                  <span className="font-medium text-primary">{post.authorName}</span>
                </div>
              )}
              {post.authorName && post.publishedAt && <span>•</span>}
              {post.publishedAt && (
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("en-IE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              )}
              {post.body && (
                <>
                  <span>•</span>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3.5 w-3.5" />
                    {calculateReadingTime(post.body)} min read
                  </div>
                </>
              )}
            </div>
          </header>

          {post.mainImage && (
            <div className="relative mb-12 aspect-video overflow-hidden rounded-2xl shadow-soft">
              <Image
                src={post.mainImage.url}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg prose-gray max-w-none">
            {post.body ? (
              <PortableText value={post.body} components={portableTextComponents} />
            ) : (
              <p className="text-muted-foreground">This post has no content.</p>
            )}
          </div>

          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-16 pt-16 border-t">
              <h2 className="text-3xl font-extrabold text-primary mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {post.faqs.map((faq: any, index: number) => (
                  <details key={index} className="group border rounded-lg bg-gray-50 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-primary">
                      {faq.question}
                      <span className="ml-4 transition-transform group-open:rotate-180 text-muted-foreground">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-muted-foreground whitespace-pre-wrap">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
      <CtaBand />
    </>
  );
}
