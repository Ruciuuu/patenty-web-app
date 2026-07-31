'use server'

import { randomInt } from 'crypto'
import { z } from 'zod'

import { createClient } from '@/lib/auth/supabase-server'
import { sendStudentInvitation } from '@/lib/email/resend'
import { getCurrentSchool } from '@/lib/school/get-current-school'
import type { CreateSchoolInvitationInput } from '@/types/school'

export type CreateStudentInvitationResult =
    | {
        success: true
    }
    | {
        success: false
        error: string
        field?: 'firstName' | 'lastName' | 'email'
    }

const schema = z.object({
    firstName: z
        .string()
        .trim()
        .min(2, 'Imię musi mieć minimum 2 znaki.'),

    lastName: z
        .string()
        .trim()
        .min(2, 'Nazwisko musi mieć minimum 2 znaki.'),

    email: z
        .string()
        .trim()
        .toLowerCase()
        .email('Podaj poprawny adres e-mail.'),
})

export async function createStudentInvitationAction(
    input: CreateSchoolInvitationInput,
): Promise<CreateStudentInvitationResult> {
    const parsed = schema.safeParse(input)

    if (!parsed.success) {
        const fieldErrors =
            parsed.error.flatten().fieldErrors

        if (fieldErrors.firstName?.[0]) {
            return {
                success: false,
                field: 'firstName',
                error: fieldErrors.firstName[0],
            }
        }

        if (fieldErrors.lastName?.[0]) {
            return {
                success: false,
                field: 'lastName',
                error: fieldErrors.lastName[0],
            }
        }

        if (fieldErrors.email?.[0]) {
            return {
                success: false,
                field: 'email',
                error: fieldErrors.email[0],
            }
        }

        return {
            success: false,
            error: 'Sprawdź dane formularza.',
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
        }
    }

    const school = await getCurrentSchool()

    if (!school) {
        return {
            success: false,
            error: 'Nie znaleziono szkoły.',
        }
    }

    if (school.status !== 'active') {
        return {
            success: false,
            error: 'Szkoła nie jest aktywna.',
        }
    }

    const {
        firstName,
        lastName,
        email,
    } = parsed.data

    /*
     * Sprawdzamy, czy dla tego adresu
     * istnieje już aktywne zaproszenie
     * w tej samej szkole.
     */
    const {
        data: existingInvitation,
        error: existingError,
    } = await supabase
        .from('school_invitations')
        .select('id')
        .eq('school_id', school.id)
        .eq('email', email)
        .eq('status', 'pending')
        .gt(
            'expires_at',
            new Date().toISOString(),
        )
        .limit(1)
        .maybeSingle()

    if (existingError) {
        console.error(
            'existing invitation error:',
            existingError,
        )

        return {
            success: false,
            error: 'Nie udało się sprawdzić zaproszeń.',
        }
    }

    if (existingInvitation) {
        return {
            success: false,
            field: 'email',
            error: 'Ten kursant ma już aktywne zaproszenie.',
        }
    }

    /*
     * Generujemy kod 6-cyfrowy.
     */
    const invitationCode = randomInt(
        0,
        1_000_000,
    )
        .toString()
        .padStart(6, '0')

    /*
     * Tworzymy zaproszenie.
     *
     * .select('id') jest potrzebne,
     * żeby później zapisać email_sent_at.
     */
    const {
        data: invitation,
        error: insertError,
    } = await supabase
        .from('school_invitations')
        .insert({
            school_id: school.id,
            invited_by_user_id: user.id,
            first_name: firstName,
            last_name: lastName,
            email,
            invitation_code: invitationCode,
            status: 'pending',
        })
        .select('id')
        .single()

    if (insertError) {
        console.error(
            'create invitation error:',
            insertError,
        )

        return {
            success: false,
            error: 'Nie udało się utworzyć zaproszenia.',
        }
    }

    /*
     * Wysyłamy email przez Resend.
     *
     * Nie usuwamy invitation, jeżeli
     * email się nie wyśle.
     * Dzięki temu później możemy zrobić
     * funkcję "Wyślij ponownie".
     */
    try {
        await sendStudentInvitation({
            email,
            firstName,
            schoolName: school.name,
            invitationCode,
        })
    } catch (error) {
        console.error(
            'send student invitation error:',
            error,
        )

        return {
            success: false,
            error:
                'Zaproszenie zostało utworzone, ale nie udało się wysłać wiadomości e-mail.',
        }
    }

    /*
     * Opcjonalnie zapisujemy informację,
     * że wiadomość została wysłana.
     *
     * Wymaga kolumny:
     * email_sent_at timestamptz
     */
    const { error: emailSentUpdateError } =
        await supabase
            .from('school_invitations')
            .update({
                email_sent_at:
                    new Date().toISOString(),
            })
            .eq('id', invitation.id)

    if (emailSentUpdateError) {
        console.error(
            'email_sent_at update error:',
            emailSentUpdateError,
        )

        /*
         * Nie zwracamy błędu użytkownikowi,
         * bo zaproszenie i email zostały
         * już poprawnie utworzone/wysłane.
         */
    }

    return {
        success: true,
    }
}