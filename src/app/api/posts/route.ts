// api/posts

import { createClient } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";
import { createPostSchema } from "@/schemas/post";

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
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // fetch posts with author + likes
    const { data, error, count } = await supabase
      .from("posts")
      .select(
        `
        id,
        content,
        created_at,
        updated_at,
        profiles!posts_author_id_fkey(id, username, name, profile_url, is_verified),
        likes(user_id)
      `,
        { count: "exact" }
      )
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

export async function POST(req: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const validated = createPostSchema.safeParse(body);

  if (!validated.success) {
    return NextResponse.json(
      { error: validated.error.flatten() },
      { status: 400 }
    );
  }

  const { content } = validated.data;

  const { data, error } = await supabase
    .from("posts")
    .insert([{ content, author_id: user.id }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
