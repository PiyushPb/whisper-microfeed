import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseServer";
import { postSchema } from "@/schemas/post";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: Request, context: Ctx) {
  const supabase = await createClient();
  const { id: postId } = await context.params;

  // 1️⃣ fetch post
  const { data: post, error: postError } = await supabase
    .from("posts")
    .select()
    .eq("id", postId)
    .single();

  if (postError || !post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  // 2️⃣ fetch author
  const { data: author, error: authorError } = await supabase
    .from("profiles")
    .select("id, username, created_at")
    .eq("id", post.author_id)
    .single();

  if (authorError || !author) {
    return NextResponse.json({ error: "Author not found" }, { status: 404 });
  }

  // 3️⃣ map to authorSchema
  const mappedAuthor = {
    id: author.id,
    name: author.username, // fallback if no full name column
    username: author.username,
    profile_url: "", // default empty if no URL column
    is_verified: false, // default false if no column
    created_at: author.created_at,
  };

  // 4️⃣ map post to postSchema
  const mappedPost = {
    id: post.id,
    author_id: post.author_id,
    content: post.content,
    created_at: post.created_at,
    updated_at: post.updated_at,
    author: mappedAuthor,
    isLiked: false, // default
    likeCount: 0, // default
  };

  // 5️⃣ validate with Zod
  const validatedPost = postSchema.parse(mappedPost);

  return NextResponse.json({ post: validatedPost }, { status: 200 });
}

export async function DELETE(req: Request, context: Ctx) {
  const supabase = await createClient();
  const { id: postId } = await context.params;

  // 👇 check which user Supabase thinks is logged in
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  console.log("Auth check:", { user, userError });

  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId)
    .select();

  console.log("Delete result:", { data, error });

  return NextResponse.json({ data, error });
}

export async function PATCH(req: Request, context: Ctx) {
  const supabase = await createClient();
  const { id: postId } = await context.params;

  const { content } = await req.json();

  // 1. Check user auth
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Fetch post and verify ownership
  const { data: post, error: fetchError } = await supabase
    .from("posts")
    .select()
    .eq("id", postId)
    .single();

  if (fetchError || !post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  if (post.author_id !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 3. Update post
  const { data: updatedPost, error: updateError } = await supabase
    .from("posts")
    .update({ content, updated_at: new Date() })
    .eq("id", postId)
    .select()
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ post: updatedPost }, { status: 200 });
}
