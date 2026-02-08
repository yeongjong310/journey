"use client";

import { Card, Text, Group, Badge, Stack } from "@mantine/core";

type BlogPostCardProps = {
  title: string;
  summary: string;
  date: string;
  isHidden?: boolean;
};

export function BlogPostCard({ title, summary, date, isHidden }: BlogPostCardProps) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        height: "100%",
        cursor: "pointer",
        opacity: isHidden ? 0.6 : 1,
        border: isHidden ? "2px dashed #868e96" : undefined
      }}
    >
      <Stack gap="md">
        <Group justify="space-between">
          <Badge color="blue" variant="light">
            {date}
          </Badge>
          {isHidden && (
            <Badge color="gray" variant="filled">
              Hidden
            </Badge>
          )}
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
