import { createClient } from '@/lib/auth/supabase-server'

export type CurrentSchoolData = {
    id: string
    name: string
    email: string | null
    address: string
    status: string
}

export type CurrentSchoolMembership = {
    id: string
    school_id: string
    role: string
    status: string
}

export async function getCurrentSchool() {
    const supabase = await createClient()

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
        return {
            user: null,
            membership: null,
            school: null,
            needsSchoolSetup: false,
            error:
                userError ??
                new Error('Brak zalogowanego użytkownika'),
        }
    }

    const { data: membership, error: membershipError } = await supabase
        .from('school_memberships')
        .select(`
      id,
      role,
      status,
      school_id,
      school:schools (
        id,
        name,
        email,
        address,
        status
      )
    `)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .maybeSingle()



    if (membershipError) {
        return {
            user,
            membership: null,
            school: null,
            needsSchoolSetup: false,
            error: membershipError,
        }
    }

    if (!membership) {
        return {
            user,
            membership: null,
            school: null,
            needsSchoolSetup: true,
            error: null,
        }
    }

    /*
     * Przy poprawnej relacji Supabase zwróci obiekt szkoły.
     * Cast upraszcza typy do czasu wygenerowania Database types.
     */
    const school = membership.school as unknown as CurrentSchoolData | null



    return {
        user,
        membership: {
            id: membership.id,
            school_id: membership.school_id,
            role: membership.role,
            status: membership.status,
        } satisfies CurrentSchoolMembership,
        school,
        needsSchoolSetup: false,
        error: null,
    }
}