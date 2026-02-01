import Link from "next/link";
import { formatDate, getBlogPosts } from "@/app/blog/utils";
import { BlogPostCard } from "./BlogPostCard";
import { SimpleGrid } from "@mantine/core";

export function BlogPosts() {
  const allBlogs = getBlogPosts();

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{ textDecoration: "none" }}
          >
            <BlogPostCard
              title={post.metadata.title}
              summary={post.metadata.summary}
              date={formatDate(post.metadata.publishedAt, false)}
            />
          </Link>
        ))}
    </SimpleGrid>
  );
}
