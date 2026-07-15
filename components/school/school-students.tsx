

type Student = {
    id: string
    firstName: string
    lastName: string
    email: string
    course: string
    status: 'active' | 'invited'
}

const initialStudents: Student[] = [
    {
        id: '1',
        firstName: 'Anna',
        lastName: 'Kowalska',
        email: 'anna.kowalska@email.pl',
        course: 'Sternik motorowodny',
        status: 'active',
    },
    {
        id: '2',
        firstName: 'Michał',
        lastName: 'Nowak',
        email: 'michal.nowak@email.pl',
        course: 'Żeglarz jachtowy',
        status: 'active',
    },
    {
        id: '3',
        firstName: 'Karolina',
        lastName: 'Wójcik',
        email: 'karolina.wojcik@email.pl',
        course: 'Sternik motorowodny',
        status: 'invited',
    },
]



export default async function StudentRow() {
    const initials = `${student.firstName.charAt(0)}${student.lastName.charAt(0)}`

    return (
        <div className="grid gap-4 px-6 py-5 transition hover:bg-[#FAFCFD] sm:grid-cols-[1fr_0.8fr_auto] sm:items-center">
            <div className="flex min-w-0 items-center gap-4">
                <Avatar className="size-11">
                    <AvatarFallback className="bg-[#D9EEF7] font-bold text-[#3977A8]">
                        {initials}
                    </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate font-semibold text-[#163A59]">
                            {student.firstName} {student.lastName}
                        </p>

                        <Badge
                            variant="secondary"
                            className={
                                student.status === 'active'
                                    ? 'rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-50'
                                    : 'rounded-full bg-[#FFF5CC] text-[#9A7720] hover:bg-[#FFF5CC]'
                            }
                        >
                            {student.status === 'active' ? 'Aktywny' : 'Zaproszony'}
                        </Badge>
                    </div>

                    <p className="mt-1 truncate text-sm text-[#7C98AB]">
                        {student.email}
                    </p>
                </div>
            </div>

            <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#9BBCCE]">
                    Kurs
                </p>
                <p className="mt-1 text-sm font-medium text-[#385B73]">
                    {student.course}
                </p>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger >
                    <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-xl text-[#9BBCCE]"
                    >
                        <MoreHorizontal className="size-5" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    className="w-52 rounded-2xl border-[#DDECF2] p-2"
                >
                    <DropdownMenuItem className="rounded-xl">
                        <ChevronRight className="mr-2 size-4" />
                        Otwórz profil
                    </DropdownMenuItem>

                    <AlertDialog>
                        <AlertDialogTrigger >
                            <DropdownMenuItem
                                onSelect={(event) => event.preventDefault()}
                                className="rounded-xl text-red-600 focus:bg-red-50 focus:text-red-700"
                            >
                                <Trash2 className="mr-2 size-4" />
                                Usuń kursanta
                            </DropdownMenuItem>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="rounded-[28px] border-[#DDECF2]">
                            <AlertDialogHeader>
                                <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                                    <AlertTriangle className="size-6" />
                                </div>

                                <AlertDialogTitle className="text-[#163A59]">
                                    Usunąć kursanta?
                                </AlertDialogTitle>

                                <AlertDialogDescription className="leading-6 text-[#68859A]">
                                    {student.firstName} {student.lastName} utraci dostęp do
                                    materiałów oraz danych szkoły. Tej operacji nie można cofnąć.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel className="rounded-xl">
                                    Anuluj
                                </AlertDialogCancel>

                                <AlertDialogAction
                                    onClick={onRemove}
                                    className="rounded-xl bg-red-600 text-white hover:bg-red-700"
                                >
                                    Usuń kursanta
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}