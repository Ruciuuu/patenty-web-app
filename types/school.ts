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

export type CreateSchoolState = {
    success?: boolean
    error?: string | null
    fieldErrors?: {
        name?: string[]
        email?: string[]
        address?: string[]
    }
}

/* ---------------------------------- */


export type CreateSchoolInvitationInput = {
    schoolId: string
    email: string
    firstName: string
    lastName: string
}

export type CreateSchoolInvitationResult =
    | {
        success: true
        invitationId: string
    }
    | {
        success: false
        error: string
        field?: keyof CreateSchoolInvitationInput
    }



export type SchoolMembership = {
    id: string
    role: string
    status: string
}