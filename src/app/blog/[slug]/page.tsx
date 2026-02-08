import { notFound } from "next/navigation";
import { CustomMDX } from "@/app/components/mdx";
import { formatDate, getBlogPosts } from "@/app/blog/utils";
import { baseUrl } from "@/app/sitemap";
import { Metadata } from "next";
import { getViewCount, incrementViewCount } from "@/app/db/queries/views";

export async function generateStaticParams() {
  // production 빌드 시 hidden 포스트는 제외
  const posts = getBlogPosts(false);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  // metadata 생성 시에는 모든 포스트 포함 (development에서 접근 가능하도록)
  const post = getBlogPosts(true).find((post) => post.slug === slug);
  if (!post) {
    return {};
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  // development에서는 hidden 포스트도 볼 수 있도록
  const includeHidden = process.env.NODE_ENV === "development";
  const post = getBlogPosts(includeHidden).find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  // production에서 hidden 포스트 접근 시 404
  if (process.env.NODE_ENV === "production" && post.metadata.hidden) {
    notFound();
  }

  if (process.env.NODE_ENV === "production") {
    await incrementViewCount({ slug });
  }

  const { count } = await getViewCount({ slug });
  const countWithFallback = count || 1;

  return (
    <section className="mb-8">
      {post.metadata.hidden && process.env.NODE_ENV === "development" && (
        <div className="mb-6 p-4 rounded-md bg-orange-100 dark:bg-orange-900 border border-orange-300 dark:border-orange-700">
          <p className="text-orange-800 dark:text-orange-200 text-sm font-medium">
            ⚠️ This post is hidden and will not be visible in production.
          </p>
        </div>
      )}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "My Portfolio",
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-4xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {countWithFallback.toLocaleString()} views
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
