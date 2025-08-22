import { createClient } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

type Ctx = { params: Promise<{ user: string }> };

export async function GET(req: Request, context: Ctx) {
  const supabase = await createClient();
  const { user: username } = await context.params;
  const formattedUsername = username.toLowerCase();

  // Extract current user ID from header (adjust as per your auth system)
  const currentUserId = req.headers.get("x-user-id") || null;

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  // 1 Fetch user profile by username with extra fields
  const { data: userProfile, error: userError } = await supabase
    .from("profiles")
    .select("id, username, bio, url, created_at, name, is_verified, profile_url")
    .eq("username", formattedUsername)
    .maybeSingle();

  if (userError) {
    return NextResponse.json({ error: userError.message }, { status: 500 });
  }
  if (!userProfile) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // 2 Fetch posts (all posts, not just liked)
  const { data: postsData, error: postsError } = await supabase
    .from("posts")
    .select(
      `
      id,
      content,
      created_at,
      updated_at,
      author:posts_author_id_fkey (
        id,
        name,
        username,
        is_verified,
        profile_url
      ),
      likes:likes(post_id)
    `
    )
    .eq("author_id", userProfile.id)
    .order("created_at", { ascending: false });

  if (postsError) {
    return NextResponse.json({ error: postsError.message }, { status: 500 });
  }

  // 3 Count likes per post (likes array length)
  // 4 Get posts liked by current user to set isLiked
  let likedPostIds: string[] = [];
  if (currentUserId) {
    const { data: likedData, error: likedError } = await supabase
      .from("likes")
      .select("post_id")
      .eq("user_id", currentUserId);

    if (!likedError && likedData) {
      likedPostIds = likedData.map((like) => like.post_id);
    }
  }

  // 5 Format posts with likeCount and isLiked
  const formattedPosts = (postsData || []).map((post) => ({
    id: post.id,
    content: post.content,
    created_at: post.created_at,
    updated_at: post.updated_at,
    author: post.author,
    likeCount: post.likes?.length ?? 0,
    isLiked: likedPostIds.includes(post.id),
  }));

  // 6 Prepare user object without posts
  const { ...user } = userProfile;

  return NextResponse.json({ user, posts: formattedPosts }, { status: 200 });
}
