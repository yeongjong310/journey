import { BlogPosts } from "@/app/components/posts";
import { Title, Space } from "@mantine/core";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section>
      <Title order={1} mb="xl">
        My Blog
      </Title>
      <BlogPosts />
      <Space h="xl" />
    </section>
  );
}
