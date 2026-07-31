'use server'

import { createClient } from '@/lib/auth/supabase-server'

export type LoginState = {
    success: boolean
    error?: string | null
    redirectTo?: string | null
}

export async function loginAction(
    _previousState: LoginState,
    formData: FormData,
): Promise<LoginState> {
    const email = String(formData.get('email') ?? '').trim()
    const password = String(formData.get('password') ?? '')

    if (!email || !password) {
        return {
            success: false,
            error: 'Podaj adres e-mail i hasło.',
        }
    }

    const supabase = await createClient()

    const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
            email,
            password,
        })

    if (loginError) {
        return {
            success: false,
            error: getAuthErrorMessage(loginError.message),
        }
    }

    if (!data.user) {
        return {
            success: false,
            error: 'Nie udało się pobrać danych użytkownika.',
        }
    }

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('account_type')
        .eq('id', data.user.id)
        .single()

    if (profileError || !profile) {
        await supabase.auth.signOut()

        return {
            success: false,
            error: 'Nie udało się pobrać profilu użytkownika.',
        }
    }

    if (profile.account_type !== 'school_user') {
        await supabase.auth.signOut()

        return {
            success: true,
            redirectTo: '/no-access',
        }
    }

    return {
        success: true,
        redirectTo: '/dashboard',
    }
}

function getAuthErrorMessage(message: string) {
    const normalizedMessage = message.toLowerCase()

    if (
        normalizedMessage.includes('invalid login credentials') ||
        normalizedMessage.includes('invalid credentials')
    ) {
        return 'Nieprawidłowy adres e-mail lub hasło.'
    }

    if (normalizedMessage.includes('email not confirmed')) {
        return 'Potwierdź adres e-mail przed zalogowaniem.'
    }

    if (normalizedMessage.includes('rate limit')) {
        return 'Wykonano zbyt wiele prób. Spróbuj ponownie za chwilę.'
    }

    return 'Nie udało się zalogować. Sprawdź dane i spróbuj ponownie.'
}