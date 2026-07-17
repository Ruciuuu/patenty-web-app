'use server'

import { createClient } from "@/lib/auth/supabase-server"

export type SchoolStudent = {
    membershipId: string
    userId: string
    schoolId: string
    firstName: string
    lastName: string
    email: string
    status: string
    joinedAt: string
}

export type GetStudentsResult =
    | {
        success: true
        students: SchoolStudent[]
    }
    | {
        success: false
        error: string
    }

type MembershipRow = {
    id: string
    school_id: string
    user_id: string
    status: string
    created_at: string
}

type ProfileRow = {
    id: string
    first_name: string | null
    last_name: string | null
    email: string | null
}

function isValidUuid(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        value
    )
}

export async function getStudents(
    schoolId: string
): Promise<GetStudentsResult> {
    const normalizedSchoolId = schoolId.trim()

    if (!normalizedSchoolId) {
        return {
            success: false,
            error: 'Brak identyfikatora szkoły.',
        }
    }

    if (!isValidUuid(normalizedSchoolId)) {
        return {
            success: false,
            error: 'Nieprawidłowy identyfikator szkoły.',
        }
    }

    const supabase = await createClient()

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
        console.error(
            'Nie udało się pobrać zalogowanego użytkownika:',
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

    /*
     * Sprawdzamy, czy aktualnie zalogowany użytkownik
     * należy do wskazanej szkoły.
     */
    const {
        data: currentUserMembership,
        error: currentUserMembershipError,
    } = await supabase
        .from('school_memberships')
        .select(`
            id,
            role,
            status
        `)
        .eq('school_id', normalizedSchoolId)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .maybeSingle()

    if (currentUserMembershipError) {
        console.error(
            'Nie udało się sprawdzić członkostwa użytkownika:',
            currentUserMembershipError
        )

        return {
            success: false,
            error: 'Nie udało się sprawdzić uprawnień do szkoły.',
        }
    }

    if (!currentUserMembership) {
        return {
            success: false,
            error: 'Nie należysz do tej szkoły.',
        }
    }

    /*
     * Najpierw pobieramy członkostwa studentów.
     *
     * Nie wykonujemy tutaj relacji do profiles,
     * ponieważ school_memberships.user_id ma klucz obcy
     * do auth.users, a nie bezpośrednio do profiles.
     */
    const {
        data: membershipsData,
        error: membershipsError,
    } = await supabase
        .from('school_memberships')
        .select(`
            id,
            school_id,
            user_id,
            status,
            created_at
        `)
        .eq('school_id', normalizedSchoolId)
        .eq('role', 'student')
        .eq('status', 'active')
        .order('created_at', {
            ascending: false,
        })

    if (membershipsError) {
        console.error(
            'Nie udało się pobrać członkostw studentów:',
            membershipsError
        )

        return {
            success: false,
            error: 'Nie udało się pobrać studentów.',
        }
    }

    const memberships =
        (membershipsData ?? []) as MembershipRow[]

    if (memberships.length === 0) {
        return {
            success: true,
            students: [],
        }
    }

    const userIds = Array.from(
        new Set(
            memberships.map(
                (membership) =>
                    membership.user_id
            )
        )
    )

    /*
     * Drugim zapytaniem pobieramy profile użytkowników.
     */
    const {
        data: profilesData,
        error: profilesError,
    } = await supabase
        .from('profiles')
        .select(`
            id,
            first_name,
            last_name,
            email
        `)
        .in('id', userIds)

    if (profilesError) {
        console.error(
            'Nie udało się pobrać profili studentów:',
            profilesError
        )

        return {
            success: false,
            error: 'Nie udało się pobrać danych studentów.',
        }
    }

    const profiles =
        (profilesData ?? []) as ProfileRow[]

    const profilesByUserId = new Map<
        string,
        ProfileRow
    >(
        profiles.map((profile) => [
            profile.id,
            profile,
        ])
    )

    const students: SchoolStudent[] =
        memberships.map((membership) => {
            const profile =
                profilesByUserId.get(
                    membership.user_id
                )

            return {
                membershipId: membership.id,
                userId: membership.user_id,
                schoolId: membership.school_id,
                firstName:
                    profile?.first_name?.trim() ??
                    '',
                lastName:
                    profile?.last_name?.trim() ??
                    '',
                email:
                    profile?.email?.trim() ?? '',
                status: membership.status,
                joinedAt:
                    membership.created_at,
            }
        })

    students.sort((firstStudent, secondStudent) => {
        const firstFullName =
            `${firstStudent.lastName} ${firstStudent.firstName}`.trim()

        const secondFullName =
            `${secondStudent.lastName} ${secondStudent.firstName}`.trim()

        return firstFullName.localeCompare(
            secondFullName,
            'pl'
        )
    })

    return {
        success: true,
        students,
    }
}