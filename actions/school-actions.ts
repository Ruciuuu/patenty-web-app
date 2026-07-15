'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { createClient } from '@/lib/auth/supabase-server'
import { getCurrentSchool } from '@/lib/school/get-current-school'

const createSchoolSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Nazwa szkoły musi mieć co najmniej 2 znaki.')
        .max(150, 'Nazwa szkoły jest zbyt długa.'),

    email: z
        .string()
        .trim()
        .email('Podaj poprawny adres e-mail.')
        .optional()
        .or(z.literal('')),

    address: z
        .string()
        .trim()
        .min(3, 'Podaj adres szkoły.')
        .max(250, 'Adres szkoły jest zbyt długi.'),
})

export type CreateSchoolState = {
    success?: boolean
    error?: string | null
    fieldErrors?: {
        name?: string[]
        email?: string[]
        address?: string[]
    }
}

/**
 * Pobiera szkołę przypisaną do obecnie zalogowanego użytkownika.
 *
 * Funkcję wywołuj wyłącznie z Server Componentu,
 * Server Action albo Route Handlera.
 */
export async function getCurrentSchoolForUser() {
    return getCurrentSchool()
}

export async function createSchoolAction(
    _previousState: CreateSchoolState,
    formData: FormData,
): Promise<CreateSchoolState> {
    const parsed = createSchoolSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        address: formData.get('address'),
    })

    if (!parsed.success) {
        return {
            success: false,
            error: 'Sprawdź dane formularza.',
            fieldErrors: parsed.error.flatten().fieldErrors,
        }
    }

    const supabase = await createClient()

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
        return {
            success: false,
            error: 'Sesja wygasła. Zaloguj się ponownie.',
            fieldErrors: {},
        }
    }

    const { data: schoolId, error } = await supabase.rpc('create_school', {
        school_name: parsed.data.name,
        school_email: parsed.data.email || null,
        school_address: parsed.data.address,
    })

    if (error) {
        console.error('create_school error:', error)

        const message = error.message.toLowerCase()

        if (
            message.includes('already owns') ||
            message.includes('already belongs')
        ) {
            return {
                success: false,
                error: 'To konto jest już przypisane do szkoły.',
                fieldErrors: {},
            }
        }

        if (
            message.includes('duplicate key') ||
            message.includes('schools_address_key')
        ) {
            return {
                success: false,
                error: 'Szkoła o takim adresie już istnieje.',
                fieldErrors: {
                    address: ['Ten adres jest już przypisany do innej szkoły.'],
                },
            }
        }

        return {
            success: false,
            error: 'Nie udało się utworzyć szkoły.',
            fieldErrors: {},
        }
    }

    if (!schoolId) {
        return {
            success: false,
            error: 'Nie udało się pobrać identyfikatora utworzonej szkoły.',
            fieldErrors: {},
        }
    }

    revalidatePath('/dashboard')
    revalidatePath('/dashboard/settings')

    redirect('/dashboard')
}