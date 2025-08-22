import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseServer";

async function getLikeCount(
  supabase: ReturnType<typeof createClient> extends Promise<infer C>
    ? C
    : never,
  postId: string
) {
  const { count, error } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId);

  if (error) throw error;
  return count ?? 0;
}

export async function POST(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const postId = params.id;

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase
    .from("likes")
    .upsert([{ post_id: postId, user_id: user.id }], {
      onConflict: "post_id, user_id",
      ignoreDuplicates: true,
    });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  const likeCount = await getLikeCount(supabase, postId);
  return NextResponse.json({ liked: true, likeCount }, { status: 200 });
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const postId = params.id;

  const supabase = await createClient();

  // Authorization part removed as you said.

  const { error } = await supabase.from("likes").delete().eq("post_id", postId);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  const likeCount = await getLikeCount(supabase, postId);
  return NextResponse.json({ liked: false, likeCount }, { status: 200 });
}
