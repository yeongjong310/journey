"use client";

import { Card, Text, Group, Badge, Stack } from "@mantine/core";

type BlogPostCardProps = {
  title: string;
  summary: string;
  date: string;
};

export function BlogPostCard({ title, summary, date }: BlogPostCardProps) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ height: "100%", cursor: "pointer" }}
    >
      <Stack gap="md">
        <Group justify="space-between">
          <Badge color="blue" variant="light">
            {date}
          </Badge>
        </Group>

        <Text fw={600} size="lg" lineClamp={2}>
          {title}
        </Text>

        <Text size="sm" c="dimmed" lineClamp={3}>
          {summary}
        </Text>
      </Stack>
    </Card>
  );
}
