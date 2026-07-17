

import {
    Compass,
    Settings,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'

import { SchoolSettingsCard } from '@/components/settings/school-form'
import { getCurrentSchoolForUser } from '@/actions/school-actions'
import { getStudents } from '@/actions/student-actions'
import { StudentsPanel } from '@/components/settings/students-panel'
import { StudentsList } from '@/components/settings/studentsList'





export default async function SettingsPage() {

    const schoolSetup = (await getCurrentSchoolForUser()).needsSchoolSetup
    const school = (await getCurrentSchoolForUser()).school



    const schoolId = school.id



    const studentsResult = await getStudents(schoolId)


    return (
        <div className="min-h-screen bg-[#F7FBFD] text-[#163A59]">
            {schoolSetup.valueOf() ?

                <div className="w-[50%] mx-auto mt-10">
                    <SchoolSettingsCard schoolSetup={schoolSetup} school={school} />
                </div>
                :




                <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                    <SettingsHero />

                    <div className="">
                        <div className="space-y-6 flex flex-row justify-center items-center gap-2">
                            <SchoolSettingsCard schoolSetup={schoolSetup} school={school} />

                            {/*  <LogoutCard
                            isLoggingOut={isLoggingOut}
                            onLogout={handleLogout}
                        /> */}
                            <StudentsPanel
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

                        {/*        <StudentsCard
                        students={filteredStudents}
                        studentsCount={students.length}
                        search={search}
                        onSearchChange={setSearch}
                        onAddStudent={handleAddStudent}
                        onRemoveStudent={handleRemoveStudent}
                    /> */}
                    </div>
                </main>}
        </div>
    )
}

function SettingsHero() {
    return (
        <section className="relative mb-8 overflow-hidden rounded-[34px] bg-[#163A59] px-6 py-8 text-white sm:px-8 lg:px-10">
            <div className="absolute -right-14 -top-24 size-80 rounded-full border-[44px] border-[#B4E1EB]/10" />
            <div className="absolute -bottom-20 left-[42%] size-64 rounded-full bg-[#4C8DD8]/15 blur-2xl" />

            <svg
                className="pointer-events-none absolute bottom-0 left-0 h-32 w-full"
                viewBox="0 0 1400 180"
                preserveAspectRatio="none"
                fill="none"
            >
                <path
                    d="M0 110C170 45 330 160 520 100C725 35 865 145 1050 95C1200 55 1310 90 1400 70V180H0V110Z"
                    fill="#78A4CB"
                    opacity="0.18"
                />
                <path
                    d="M0 145C190 90 350 180 560 130C780 80 920 160 1110 120C1240 90 1340 110 1400 105V180H0V145Z"
                    fill="#B4E1EB"
                    opacity="0.12"
                />
            </svg>

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                    <Badge className="mb-4 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[#B4E1EB] hover:bg-white/10">
                        <Settings className="mr-2 size-4" />
                        Ustawienia szkoły
                    </Badge>

                    <h1 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                        Zarządzaj szkołą i kontem
                    </h1>

                    <p className="mt-3 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
                        Zmień dane szkoły, zapraszaj kursantów i zarządzaj dostępem do
                        panelu.
                    </p>
                </div>

                <div className="flex items-center gap-3 rounded-[24px] border border-white/10 bg-white/[0.06] px-5 py-4 backdrop-blur">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-[#4C8DD8]">
                        <Compass className="size-6" />
                    </div>

                    <div>
                        <p className="text-sm text-white/55">Aktywna szkoła</p>
                        <p className="font-bold text-white">Szkoła Błękitna Fala</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

/* 




function AddStudentDialog({
    onAddStudent,
}: {
    onAddStudent: (student: Omit<Student, 'id' | 'status'>) => void
}) {
    const [open, setOpen] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [course, setCourse] = useState('Sternik motorowodny')

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        onAddStudent({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim().toLowerCase(),
            course: course.trim(),
        })

        setFirstName('')
        setLastName('')
        setEmail('')
        setCourse('Sternik motorowodny')
        setOpen(false)

        // Docelowo zamiast lokalnego stanu:
        //
        // 1. utwórz zaproszenie w school_invitations,
        // 2. wyślij wiadomość e-mail,
        // 3. po akceptacji utwórz school_membership z rolą student.
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger >
                <Button className="h-11 rounded-2xl bg-[#4C8DD8] px-5 font-semibold text-white hover:bg-[#397CC9]">
                    <Plus className="mr-2 size-5" />
                    Dodaj kursanta
                </Button>
            </DialogTrigger>

            <DialogContent className="rounded-[30px] border-[#DDECF2] sm:max-w-lg">
                <DialogHeader>
                    <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-[#E1F2F8] text-[#397CC9]">
                        <UserPlus className="size-6" />
                    </div>

                    <DialogTitle className="text-2xl text-[#163A59]">
                        Dodaj kursanta
                    </DialogTitle>

                    <DialogDescription className="leading-6 text-[#68859A]">
                        Kursant otrzyma zaproszenie na podany adres e-mail.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label
                                htmlFor="student-first-name"
                                className="font-semibold text-[#385B73]"
                            >
                                Imię
                            </Label>

                            <Input
                                id="student-first-name"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                                placeholder="Jan"
                                required
                                className={dialogInputClassName}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="student-last-name"
                                className="font-semibold text-[#385B73]"
                            >
                                Nazwisko
                            </Label>

                            <Input
                                id="student-last-name"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                                placeholder="Kowalski"
                                required
                                className={dialogInputClassName}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="student-email"
                            className="font-semibold text-[#385B73]"
                        >
                            Adres e-mail
                        </Label>

                        <Input
                            id="student-email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="jan.kowalski@email.pl"
                            required
                            className={dialogInputClassName}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="student-course"
                            className="font-semibold text-[#385B73]"
                        >
                            Kurs
                        </Label>

                        <Input
                            id="student-course"
                            value={course}
                            onChange={(event) => setCourse(event.target.value)}
                            placeholder="Sternik motorowodny"
                            required
                            className={dialogInputClassName}
                        />
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="rounded-xl border-[#D7E8EF]"
                        >
                            Anuluj
                        </Button>

                        <Button
                            type="submit"
                            className="rounded-xl bg-[#4C8DD8] px-5 text-white hover:bg-[#397CC9]"
                        >
                            <UserPlus className="mr-2 size-4" />
                            Wyślij zaproszenie
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

function LogoutCard({
    isLoggingOut,
    onLogout,
}: {
    isLoggingOut: boolean
    onLogout: () => void
}) {
    return (
        <Card className="rounded-[30px] border-red-100 bg-white shadow-[0_16px_50px_rgba(33,78,110,0.05)]">
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                        <LogOut className="size-6" />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-[#163A59]">Konto</h2>
                        <p className="mt-1 leading-6 text-[#7C98AB]">
                            Zakończ bieżącą sesję w panelu administracyjnym.
                        </p>
                    </div>
                </div>

                <AlertDialog>
                    <AlertDialogTrigger >
                        <Button
                            variant="outline"
                            className="mt-6 h-12 w-full rounded-2xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                            <LogOut className="mr-2 size-5" />
                            Wyloguj się
                        </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="rounded-[28px] border-[#DDECF2]">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-[#163A59]">
                                Wylogować się?
                            </AlertDialogTitle>

                            <AlertDialogDescription className="leading-6 text-[#68859A]">
                                Bieżąca sesja zostanie zakończona. Aby ponownie wejść do panelu,
                                trzeba będzie podać adres e-mail i hasło.
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-xl">
                                Zostań
                            </AlertDialogCancel>

                            <AlertDialogAction
                                onClick={onLogout}
                                disabled={isLoggingOut}
                                className="rounded-xl bg-red-600 text-white hover:bg-red-700"
                            >
                                {isLoggingOut ? (
                                    <>
                                        <Loader2 className="mr-2 size-4 animate-spin" />
                                        Wylogowywanie...
                                    </>
                                ) : (
                                    'Wyloguj się'
                                )}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardContent>
        </Card>
    )
}
 */
const inputClassName =
    'h-12 rounded-2xl border-[#D7E8EF] bg-white pl-12 text-base text-[#163A59] shadow-sm placeholder:text-[#9BBCCE] focus-visible:border-[#78A4CB] focus-visible:ring-[#78A4CB]/20'

const dialogInputClassName =
    'h-12 rounded-2xl border-[#D7E8EF] bg-white text-[#163A59] shadow-sm placeholder:text-[#9BBCCE] focus-visible:border-[#78A4CB] focus-visible:ring-[#78A4CB]/20'