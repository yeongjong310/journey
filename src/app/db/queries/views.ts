import { createClient } from "../server";

export const getViewCount = async ({ slug }: { slug: string }) => {
  "use server";

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return {
      count: 1,
    };
  }

  const db = await createClient();
  const { data, error } = await db
    .from("views")
    .select("count")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("select error", error);
    return {
      count: null,
    };
  }

  return {
    count: data.count || 1,
  };
};

export const incrementViewCount = async ({ slug }: { slug: string }) => {
  "use server";
  const db = await createClient();

  const { error } = await db.rpc("increment_view_count", { slug_input: slug });

  if (error) {
    console.error("Error incrementing view count:", error);
  }

  return;
};
