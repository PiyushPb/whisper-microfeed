import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseServer";

type Ctx = { params: Promise<{ id: string }> };

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
