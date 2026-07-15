type UserState = {
    needsSchoolSetup: boolean
}


export function getUserDestination(user: UserState) {
    if (user.needsSchoolSetup) {
        return "/dashboard/onboarding/school"
    }

    return "/dashboard"
}