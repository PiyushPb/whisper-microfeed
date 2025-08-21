/* eslint-disable @typescript-eslint/no-unused-vars */
import { supabase } from "@/lib/supabaseClient";
import { SignupSchema } from "@/schemas/signup";

export class ValidationError extends Error {
  fieldErrors: Record<string, string>;

  constructor(message: string, fieldErrors: Record<string, string>) {
    super(message);
    this.name = "ValidationError";
    this.fieldErrors = fieldErrors;
  }
}

export async function signupUser(formData: unknown) {
  // Step 1: Validate with Zod
  const result = SignupSchema.safeParse(formData);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};

    for (const issue of result.error.issues) {
      const field = issue.path?.[0];
      if (field && typeof field === "string" && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }

    throw new ValidationError("Validation failed", fieldErrors);
  }

  const { name, username, email, password } = result.data;

  // Step 2: Check if username already exists
  const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", username)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error(error.message);
  }

  if (data) {
    throw new ValidationError("Username already exists", {
      username: "Username already exists",
    });
  }

  // Step 3: Signup user
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    throw new Error(signUpError.message);
  }

  // Step 4: Sign in immediately
  const { data: signInData, error: signInError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (signInError || !signInData.session) {
    throw new Error(signInError?.message || "Signin failed");
  }

  const user = signInData.user;

  // Step 5: Insert user profile
  const { error: insertError } = await supabase.from("profiles").insert({
    id: user.id,
    email,
    name,
    username,
  });

  if (insertError) {
    throw new Error("Error saving user profile: " + insertError.message);
  }

  return user;
}
