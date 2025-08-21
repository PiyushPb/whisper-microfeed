import { createClient } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const searchTerm = searchParams.get("search") || "";

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  try {
    // get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Create search filter if searchTerm is provided
    const searchFilter = searchTerm
      ? supabase
          .from("posts")
          .select(
            `id, content, created_at, updated_at, profiles!posts_author_id_fkey(id, username, name, profile_url, is_verified), likes(user_id)`,
            { count: "exact" }
          )
          .ilike("content", `%${searchTerm}%`) // Case-insensitive search for the term in the content
      : supabase
          .from("posts")
          .select(
            `id, content, created_at, updated_at, profiles!posts_author_id_fkey(id, username, name, profile_url, is_verified), likes(user_id)`,
            { count: "exact" }
          );

    // fetch posts with author + likes, applying search filter if necessary
    const { data, error, count } = await searchFilter
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // transform posts to include likeCount + isLiked
    const posts = data.map((p) => ({
      id: p.id,
      content: p.content,
      created_at: p.created_at,
      updated_at: p.updated_at,
      author: p.profiles,
      likeCount: p.likes?.length || 0,
      isLiked: p.likes?.some((l) => l.user_id === user.id) || false,
    }));

    return NextResponse.json({ count, payload: posts }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
