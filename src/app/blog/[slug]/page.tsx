import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { getPostBySlug, getPosts } from "@/../sanity/lib/data";
import CtaBand from "@/components/cta-band";
import { ArrowLeft } from "lucide-react";
import { site } from "@/config/site";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post: any) => ({
    slug: post.slug?.current,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | ${site.name} Blog`,
    description: post.excerpt,
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
        return (
          <div className="relative my-8 aspect-video overflow-hidden rounded-xl bg-muted">
            <Image
              src={value.url || ""}
              alt={value.alt || "Blog image"}
              fill
              className="object-cover"
            />
          </div>
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

  return (
    <>
      <article className="py-16 lg:py-24 bg-white">
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
        </div>
      </article>
      <CtaBand />
    </>
  );
}
