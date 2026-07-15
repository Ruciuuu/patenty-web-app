import { createClient } from '../auth/supabase-server'

export async function getUserInfo() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return {
      user: null,
      profile: null,
      authError:
        userError ??
        new Error('Brak zalogowanego użytkownika'),
      profileError: null,
    }
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('first_name, last_name')
    .eq('id', user.id)
    .maybeSingle()

  return {
    user,
    profile,
    authError: null,
    profileError,
  }
}