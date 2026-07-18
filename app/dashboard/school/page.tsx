




import { getCurrentSchoolForUser } from '@/actions/school-actions'
import { getStudents } from '@/actions/student-actions'
import { StudentsForm } from '@/components/settings/studentsForm'
import { StudentsList } from '@/components/settings/studentsList'
import { SettingsHero } from '@/components/school/schoolHero'
import { SchoolForm } from '@/components/settings/schoolForm'




export default async function SettingsPage() {



    const schoolSetup = (await getCurrentSchoolForUser()).needsSchoolSetup


    if (schoolSetup.valueOf()) {
        const school = (await getCurrentSchoolForUser()).school
        return (
            < div className="min-h-screen bg-[#F7FBFD] text-[#163A59]" >


                <div className="w-[50%] mx-auto mt-10">
                    <SchoolForm schoolSetup={schoolSetup} school={school} />
                </div>
            </div >


        )

    }

    if (!schoolSetup.valueOf()) {
        const school = (await getCurrentSchoolForUser()).school
        const schoolId = school.id
        const studentsResult = await getStudents(schoolId)
        const schoolName = school.name
        console.log(schoolName)

        return (
            <div className="min-h-screen bg-[#F7FBFD] text-[#163A59]">






                <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                    <SettingsHero schoolName={schoolName} />

                    <div className="">
                        <div className="space-y-6 flex flex-row justify-center items-center gap-2">
                            <SchoolForm schoolSetup={schoolSetup} school={school} />

                            {/*  <LogoutCard
                            isLoggingOut={isLoggingOut}
                            onLogout={handleLogout}
                        /> */}
                            <StudentsForm
                                schoolId={schoolId}

                            />
                            <StudentsList
                                initialStudents={
                                    studentsResult.success
                                        ? studentsResult.students
                                        : []
                                }
                                initialError={
                                    studentsResult.success
                                        ? null
                                        : studentsResult.error
                                }
                            />
                        </div>
                    </div>
                </main>
            </div>
        )
    }



}




const inputClassName =
    'h-12 rounded-2xl border-[#D7E8EF] bg-white pl-12 text-base text-[#163A59] shadow-sm placeholder:text-[#9BBCCE] focus-visible:border-[#78A4CB] focus-visible:ring-[#78A4CB]/20'

const dialogInputClassName =
    'h-12 rounded-2xl border-[#D7E8EF] bg-white text-[#163A59] shadow-sm placeholder:text-[#9BBCCE] focus-visible:border-[#78A4CB] focus-visible:ring-[#78A4CB]/20'