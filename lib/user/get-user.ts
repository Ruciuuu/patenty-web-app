import { createClient } from "../auth/supabase-server";

export async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      user: null,
      profile: null,
      error: userError ?? new Error("Brak zalogowanego użytkownika"),
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("first_name, last_name")
    .single();

  if (profileError) {
    return {
      user,
      profile: null,
      error: profileError,
    };
  }
  
  console.log(user, profile)
  return {
    user,
    profile,
    error: null,
  };
}