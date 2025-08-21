import { createClient } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  try {
    // get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // fetch posts liked by this user
    const { data, error, count } = await supabase
      .from("likes")
      .select(
        `
        post_id,
        created_at,
        posts (
          id,
          content,
          created_at,
          updated_at,
          profiles!posts_author_id_fkey (
            id,
            username,
            name,
            profile_url,
            is_verified
          ),
          likes (user_id)
        )
      `,
        { count: "exact" }
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // normalize format
    const posts = data.map((like) => {
      const p = Array.isArray(like.posts) ? like.posts[0] : like.posts;

      return {
        id: p.id,
        content: p.content,
        created_at: p.created_at,
        updated_at: p.updated_at,
        author: {
          id: p.profiles.id,
          name: p.profiles.name,
          username: p.profiles.username,
          is_verified: p.profiles.is_verified,
          profile_url: p.profiles.profile_url,
        },
        likeCount: p.likes?.length || 0,
        isLiked: p.likes?.some((l) => l.user_id === user.id) || false,
      };
    });

    return NextResponse.json({ count, payload: posts }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch liked posts" },
      { status: 500 }
    );
  }
}
