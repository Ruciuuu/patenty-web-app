
import { createSchoolAction } from '@/actions/school-actions';
import { SchoolOnboarding } from '@/components/onboarding/schoolOnboarding';
import { getCurrentSchool } from '@/lib/school/get-current-school';
import { redirect } from 'next/navigation';

export default async function OnboardingPage() {
    const school = await getCurrentSchool()
    console.log(school)

    if (school?.status === 'onboarding') {
        redirect('/dashboard/onboarding/payment')
    }

    if (school?.status === 'active') {
        redirect('/dashboard')
    }

    if (school?.status === 'suspended') {
        redirect('/dashboard/suspended')
    }

    return (
        <SchoolOnboarding
            createSchoolAction={createSchoolAction}
        />
    )
}