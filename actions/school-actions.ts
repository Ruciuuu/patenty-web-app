'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { createClient } from '@/lib/auth/supabase-server'
import { generateInvitationCode } from '@/lib/school/generate-code'
import { CreateSchoolInvitationInput, CreateSchoolInvitationResult, CreateSchoolState, CurrentSchoolData, CurrentSchoolMembership, SchoolMembership } from '@/types/school'






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
    error?: string | null;
    success?: boolean;
    fieldErrors?: {
        name?: string[];
        email?: string[];
        address?: string[];
    };
};



export async function createSchoolAction(
    _previousState: CreateSchoolState,
    formData: FormData,
): Promise<CreateSchoolState> {
    const parsed = createSchoolSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        address: formData.get("address"),
    });

    if (!parsed.success) {
        return {
            success: false,
            error: "Sprawdź dane formularza.",
            fieldErrors: parsed.error.flatten().fieldErrors,
        };
    }

    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return {
            success: false,
            error: "Sesja wygasła. Zaloguj się ponownie.",
            fieldErrors: {},
        };
    }

    const { data: schoolId, error } = await supabase.rpc(
        "create_school",
        {
            school_name: parsed.data.name,
            school_email: parsed.data.email || null,
            school_address: parsed.data.address,
        },
    );

    if (error) {
        console.error("create_school error:", error);

        const message = error.message.toLowerCase();

        if (
            message.includes("already owns") ||
            message.includes("already belongs")
        ) {
            return {
                success: false,
                error: "To konto jest już przypisane do szkoły.",
                fieldErrors: {},
            };
        }

        if (
            message.includes("duplicate key") ||
            message.includes("schools_address_key")
        ) {
            return {
                success: false,
                error: "Szkoła o takim adresie już istnieje.",
                fieldErrors: {
                    address: [
                        "Ten adres jest już przypisany do innej szkoły.",
                    ],
                },
            };
        }

        return {
            success: false,
            error: "Nie udało się utworzyć szkoły.",
            fieldErrors: {},
        };
    }

    if (!schoolId) {
        return {
            success: false,
            error: "Nie udało się pobrać identyfikatora utworzonej szkoły.",
            fieldErrors: {},
        };
    }

    redirect("/dashboard/onboarding/payment");
}


/**
 * Pobiera szkołę przypisaną do obecnie zalogowanego użytkownika.
 *
 * Funkcję wywołuj wyłącznie z Server Componentu,
 * Server Action albo Route Handlera.
 */









/**
 * Dostosuj te role do wartości znajdujących się
 * w enumie public.school_role.
 */
const ALLOWED_INVITER_ROLES = [
    'owner',
    'admin',
] as const

function normalizeEmail(email: string): string {
    return email.trim().toLowerCase()
}

function normalizeName(name: string): string {
    return name.trim().replace(/\s+/g, ' ')
}

function isValidUuid(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        value
    )
}

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function createSchoolInvitationAction(
    input: CreateSchoolInvitationInput
): Promise<CreateSchoolInvitationResult> {
    const schoolId = input.schoolId.trim()
    const email = normalizeEmail(input.email)
    const firstName = normalizeName(input.firstName)
    const lastName = normalizeName(input.lastName)

    console.log('createSchoolInvitation started', {
        schoolId: input.schoolId,
        email: input.email,
    })

    if (!schoolId) {
        return {
            success: false,
            field: 'schoolId',
            error: 'Brak identyfikatora szkoły.',
        }
    }

    if (!isValidUuid(schoolId)) {
        return {
            success: false,
            field: 'schoolId',
            error: 'Nieprawidłowy identyfikator szkoły.',
        }
    }

    if (!email) {
        return {
            success: false,
            field: 'email',
            error: 'Podaj adres e-mail.',
        }
    }

    if (!isValidEmail(email)) {
        return {
            success: false,
            field: 'email',
            error: 'Podaj poprawny adres e-mail.',
        }
    }

    if (!firstName) {
        return {
            success: false,
            field: 'firstName',
            error: 'Podaj imię zapraszanej osoby.',
        }
    }

    if (firstName.length > 100) {
        return {
            success: false,
            field: 'firstName',
            error: 'Imię jest zbyt długie.',
        }
    }

    if (!lastName) {
        return {
            success: false,
            field: 'lastName',
            error: 'Podaj nazwisko zapraszanej osoby.',
        }
    }

    if (lastName.length > 100) {
        return {
            success: false,
            field: 'lastName',
            error: 'Nazwisko jest zbyt długie.',
        }
    }

    const supabase = await createClient()

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
        console.error(
            'Nie udało się pobrać użytkownika:',
            userError
        )

        return {
            success: false,
            error: 'Nie udało się zweryfikować użytkownika.',
        }
    }

    if (!user) {
        return {
            success: false,
            error: 'Musisz być zalogowany.',
        }
    }

    const {
        data: membershipData,
        error: membershipError,
    } = await supabase
        .from('school_memberships')
        .select(`
            id,
            role,
            status
        `)
        .eq('school_id', schoolId)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .maybeSingle()

    if (membershipError) {
        console.error(
            'Nie udało się sprawdzić członkostwa w szkole:',
            membershipError
        )

        return {
            success: false,
            error: 'Nie udało się sprawdzić uprawnień.',
        }
    }

    const membership =
        membershipData as SchoolMembership | null

    if (!membership) {
        return {
            success: false,
            error:
                'Nie należysz do tej szkoły lub Twoje członkostwo jest nieaktywne.',
        }
    }

    const canInvite = ALLOWED_INVITER_ROLES.includes(
        membership.role as (typeof ALLOWED_INVITER_ROLES)[number]
    )

    if (!canInvite) {
        return {
            success: false,
            error:
                'Nie masz uprawnień do zapraszania użytkowników.',
        }
    }

    const {
        data: existingInvitation,
        error: existingInvitationError,
    } = await supabase
        .from('school_invitations')
        .select(`
            id,
            status,
            expires_at
        `)
        .eq('school_id', schoolId)
        .ilike('email', email)
        .eq('status', 'pending')
        .maybeSingle()

    if (existingInvitationError) {
        console.error(
            'Nie udało się sprawdzić istniejącego zaproszenia:',
            existingInvitationError
        )

        return {
            success: false,
            error:
                'Nie udało się sprawdzić istniejących zaproszeń.',
        }
    }

    if (existingInvitation) {
        return {
            success: false,
            field: 'email',
            error:
                'Aktywne zaproszenie dla tego adresu e-mail już istnieje.',
        }
    }

    const invitationCode = generateInvitationCode();

    const expiresAt = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toISOString()

    const { data, error } = await supabase
        .from('school_invitations')
        .insert({
            school_id: schoolId,
            invited_by_user_id: user.id,
            email,
            first_name: firstName,
            last_name: lastName,
            status: 'pending',
            invitation_code: invitationCode,
            expires_at: expiresAt,
        })
        .select('id')
        .single()

    if (error) {
        console.error(
            'Nie udało się utworzyć zaproszenia:',
            error
        )

        if (error.code === '23505') {
            return {
                success: false,
                field: 'email',
                error:
                    'Aktywne zaproszenie dla tego adresu e-mail już istnieje.',
            }
        }

        if (error.code === '42501') {
            return {
                success: false,
                error:
                    'Brak uprawnień do utworzenia zaproszenia.',
            }
        }

        return {
            success: false,
            error: 'Nie udało się utworzyć zaproszenia.',
        }
    }

    revalidatePath('/dashboard')
    revalidatePath('/dashboard/school')
    revalidatePath('/dashboard/school/invitations')

    return {
        success: true,
        invitationId: data.id,

    }
}




export async function getSchoolInvitations(school_id: string) {

    const supabase = await createClient();




    const {
        data: existingInvitations,
        error: existingInvitationError,
    } = await supabase
        .from('school_invitations')
        .select(`
            id, email, first_name, last_name, invitation_code
            
        `)

        .eq("school_id", school_id)
        .eq("status", "pending")


    if (existingInvitationError) {
        console.error(
            'Nie udało się sprawdzić istniejących zaproszeń:',
            existingInvitationError
        )

        return {
            success: false,
            error: 'Nie udało się sprawdzić istniejących zaproszeń.',
        }
    }


    console.log(existingInvitations)

    return {
        existingInvitations
    }


}






