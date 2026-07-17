'use client'

import { useMemo } from 'react'
import {
    ChevronRight,
    MoreHorizontal,
    Users,
} from 'lucide-react'

import type { SchoolStudent } from '@/actions/student-actions'

import {
    Avatar,
    AvatarFallback,
} from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'


type StudentsListProps = {
    initialStudents: SchoolStudent[]
    initialError: string | null
}

export function StudentsList({
    initialStudents,
    initialError,
}: StudentsListProps) {
    const sortedStudents = useMemo(() => {
        return [...initialStudents].sort(
            (firstStudent, secondStudent) => {
                const firstName =
                    `${firstStudent.lastName} ${firstStudent.firstName}`.trim()
                const secondName =
                    `${secondStudent.lastName} ${secondStudent.firstName}`.trim()

                return firstName.localeCompare(
                    secondName,
                    'pl'
                )
            }
        )
    }, [initialStudents])



    return (
        <Card className="overflow-hidden rounded-[28px] border-[#DDECF2] shadow-sm">
            <CardHeader className="border-b border-[#E8F1F5]">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <CardTitle className="flex items-center gap-3 text-2xl text-[#163A59]">
                            <Users className="size-6 text-[#3977A8]" />
                            Lista kursantów
                        </CardTitle>

                        <CardDescription className="mt-2 text-[#68859A]">
                            Aktywni członkowie szkoły z
                            rolą kursanta.
                        </CardDescription>
                    </div>

                    <Badge
                        variant="secondary"
                        className="rounded-full bg-[#EAF5F9] px-3 py-1 text-[#3977A8]"
                    >
                        {sortedStudents.length}{' '}
                        {sortedStudents.length === 1
                            ? 'kursant'
                            : 'kursantów'}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                {initialError ? (
                    <div className="p-6">
                        <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                            {initialError}
                        </div>
                    </div>
                ) : sortedStudents.length === 0 ? (
                    <div className="flex flex-col items-center px-6 py-16 text-center">
                        <div className="flex size-16 items-center justify-center rounded-3xl bg-[#EAF5F9] text-[#3977A8]">
                            <Users className="size-8" />
                        </div>

                        <h2 className="mt-5 text-xl font-bold text-[#163A59]">
                            Brak kursantów
                        </h2>

                        <p className="mt-2 max-w-sm leading-6 text-[#68859A]">
                            Zaproś pierwszą osobę za pomocą
                            formularza.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-[#E8F1F5]">
                        {sortedStudents.map((student) => (
                            <StudentRow
                                key={student.membershipId}
                                student={student}
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

type StudentRowProps = {
    student: SchoolStudent
}

function StudentRow({
    student,
}: StudentRowProps) {
    const initials =
        `${student.firstName.charAt(0)}${student.lastName.charAt(0)}`.toUpperCase() ||
        '?'

    const fullName =
        `${student.firstName} ${student.lastName}`.trim() ||
        'Brak danych'

    return (
        <div className="grid gap-4 px-6 py-5 transition hover:bg-[#FAFCFD] sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="flex min-w-0 items-center gap-4">
                <Avatar className="size-11">
                    <AvatarFallback className="bg-[#D9EEF7] font-bold text-[#3977A8]">
                        {initials}
                    </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate font-semibold text-[#163A59]">
                            {fullName}
                        </p>

                        <Badge
                            variant="secondary"
                            className="rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                        >
                            Aktywny
                        </Badge>
                    </div>

                    <p className="mt-1 truncate text-sm text-[#7C98AB]">
                        {student.email ||
                            'Brak adresu e-mail'}
                    </p>

                    <p className="mt-1 text-xs text-[#9BBCCE]">
                        Dołączył:{' '}
                        {new Intl.DateTimeFormat(
                            'pl-PL',
                            {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            }
                        ).format(
                            new Date(student.joinedAt)
                        )}
                    </p>
                </div>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-xl text-[#9BBCCE]"
                    >
                        <MoreHorizontal className="size-5" />
                        <span className="sr-only text-red bg-red">
                            Usuń kursanta
                        </span>
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
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}