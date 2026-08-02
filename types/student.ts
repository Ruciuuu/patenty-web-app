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



export type MembershipRow = {
    id: string
    school_id: string
    user_id: string
    status: string
    created_at: string
}

export type ProfileRow = {
    id: string
    first_name: string | null
    last_name: string | null
    email: string | null
}


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

export type SchoolInvitation = {
    id: string
    schoolId: string
    firstName: string
    lastName: string
    email: string
    status: 'pending' | 'accepted' | 'cancelled' | 'expired'
    expiresAt: string
    emailSentAt: string | null
    createdAt: string
}

export type GetStudentsResult =
    | {
          success: true
          students: SchoolStudent[]
          invitations: SchoolInvitation[]
      }
    | {
          success: false
          error: string
      }