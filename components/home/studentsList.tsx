'use client'

import {
    useMemo,
    useState,
} from 'react'

import {
    Ban,
    ChevronRight,
    Clock3,
    Mail,
    MailCheck,
    MoreHorizontal,
    RefreshCw,
    UserPlus,
    Users,
} from 'lucide-react'

import type {
    SchoolInvitation,
    SchoolStudent,
} from '@/types/student'

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

type ListView = 'students' | 'invitations'

type StudentsListProps = {
    initialStudents: SchoolStudent[]
    existingInvitations: SchoolInvitation[]
    initialError: string | null
}

export function StudentsList({
    initialStudents,
    existingInvitations,
    initialError,
}: StudentsListProps) {
    const [activeView, setActiveView] =
        useState<ListView>('students')

    const sortedStudents = useMemo(() => {
        return [...initialStudents].sort(
            (firstStudent, secondStudent) => {
                const firstName =
                    `${firstStudent.lastName} ${firstStudent.firstName}`.trim()

                const secondName =
                    `${secondStudent.lastName} ${secondStudent.firstName}`.trim()

                return firstName.localeCompare(
                    secondName,
                    'pl',
                )
            },
        )
    }, [initialStudents])

    const sortedInvitations = useMemo(() => {
        return [...existingInvitations].sort(
            (
                firstInvitation,
                secondInvitation,
            ) => {
                const firstName =
                    `${firstInvitation.lastName} ${firstInvitation.firstName}`.trim()

                const secondName =
                    `${secondInvitation.lastName} ${secondInvitation.firstName}`.trim()

                return firstName.localeCompare(
                    secondName,
                    'pl',
                )
            },
        )
    }, [existingInvitations])

    const displayedCount =
        activeView === 'students'
            ? sortedStudents.length
            : sortedInvitations.length

    return (
        <Card className="overflow-hidden rounded-[28px] border-[#DDECF2] shadow-sm">
            <CardHeader className="border-b border-[#E8F1F5]">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <CardTitle className="flex items-center gap-3 text-2xl text-[#163A59]">
                                {activeView ===
                                'students' ? (
                                    <Users className="size-6 text-[#3977A8]" />
                                ) : (
                                    <UserPlus className="size-6 text-[#3977A8]" />
                                )}

                                {activeView ===
                                'students'
                                    ? 'Lista kursantów'
                                    : 'Lista zaproszeń'}
                            </CardTitle>

                            <CardDescription className="mt-2 text-[#68859A]">
                                {activeView ===
                                'students'
                                    ? 'Aktywni kursanci przypisani do szkoły.'
                                    : 'Osoby oczekujące na aktywację konta i dołączenie do szkoły.'}
                            </CardDescription>
                        </div>

                        <Badge
                            variant="secondary"
                            className="rounded-full bg-[#EAF5F9] px-3 py-1 text-[#3977A8]"
                        >
                            {displayedCount}{' '}

                            {activeView ===
                            'students'
                                ? getStudentsCountLabel(
                                      displayedCount,
                                  )
                                : getInvitationsCountLabel(
                                      displayedCount,
                                  )}
                        </Badge>
                    </div>

                    <div className="inline-flex w-fit rounded-2xl bg-[#F0F7FA] p-1">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() =>
                                setActiveView(
                                    'students',
                                )
                            }
                            className={
                                activeView ===
                                'students'
                                    ? 'rounded-xl bg-white text-[#163A59] shadow-sm hover:bg-white'
                                    : 'rounded-xl text-[#68859A] hover:bg-white/70 hover:text-[#163A59]'
                            }
                        >
                            <Users className="mr-2 size-4" />

                            Kursanci

                            <Badge
                                variant="secondary"
                                className="ml-2 rounded-full bg-[#EAF5F9] px-2 text-[#3977A8]"
                            >
                                {sortedStudents.length}
                            </Badge>
                        </Button>

                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() =>
                                setActiveView(
                                    'invitations',
                                )
                            }
                            className={
                                activeView ===
                                'invitations'
                                    ? 'rounded-xl bg-white text-[#163A59] shadow-sm hover:bg-white'
                                    : 'rounded-xl text-[#68859A] hover:bg-white/70 hover:text-[#163A59]'
                            }
                        >
                            <Mail className="mr-2 size-4" />

                            Zaproszenia

                            <Badge
                                variant="secondary"
                                className="ml-2 rounded-full bg-[#EAF5F9] px-2 text-[#3977A8]"
                            >
                                {sortedInvitations.length}
                            </Badge>
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                {initialError ? (
                    <div className="p-6">
                        <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                            {initialError}
                        </div>
                    </div>
                ) : activeView ===
                  'students' ? (
                    <StudentsView
                        students={
                            sortedStudents
                        }
                    />
                ) : (
                    <InvitationsView
                        invitations={
                            sortedInvitations
                        }
                    />
                )}
            </CardContent>
        </Card>
    )
}

type StudentsViewProps = {
    students: SchoolStudent[]
}

function StudentsView({
    students,
}: StudentsViewProps) {
    if (students.length === 0) {
        return (
            <EmptyState
                icon={
                    <Users className="size-8" />
                }
                title="Brak kursantów"
                description="Zaproś pierwszą osobę za pomocą formularza."
            />
        )
    }

    return (
        <div className="divide-y divide-[#E8F1F5]">
            {students.map((student) => (
                <StudentRow
                    key={student.membershipId}
                    student={student}
                />
            ))}
        </div>
    )
}

type InvitationsViewProps = {
    invitations: SchoolInvitation[]
}

function InvitationsView({
    invitations,
}: InvitationsViewProps) {
    if (invitations.length === 0) {
        return (
            <EmptyState
                icon={
                    <UserPlus className="size-8" />
                }
                title="Brak zaproszeń"
                description="Nie ma obecnie żadnych wysłanych zaproszeń."
            />
        )
    }

    return (
        <div className="divide-y divide-[#E8F1F5]">
            {invitations.map(
                (invitation) => (
                    <InvitationRow
                        key={invitation.id}
                        invitation={
                            invitation
                        }
                    />
                ),
            )}
        </div>
    )
}

type StudentRowProps = {
    student: SchoolStudent
}

function StudentRow({
    student,
}: StudentRowProps) {
    const initials =
        `${student.firstName.charAt(0)}${student.lastName.charAt(0)}`
            .toUpperCase() || '?'

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
                        {formatDate(
                            student.joinedAt,
                        )}
                    </p>
                </div>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-xl text-[#9BBCCE]"
                    >
                        <MoreHorizontal className="size-5" />

                        <span className="sr-only">
                            Opcje kursanta
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

type InvitationRowProps = {
    invitation: SchoolInvitation
}

function InvitationRow({
    invitation,
}: InvitationRowProps) {
    const initials =
        `${invitation.firstName.charAt(0)}${invitation.lastName.charAt(0)}`
            .toUpperCase() || '?'

    const fullName =
        `${invitation.firstName} ${invitation.lastName}`.trim() ||
        'Brak danych'

    return (
        <div className="grid gap-4 px-6 py-5 transition hover:bg-[#FAFCFD] lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex min-w-0 items-center gap-4">
                <Avatar className="size-11">
                    <AvatarFallback className="bg-amber-50 font-bold text-amber-700">
                        {initials}
                    </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate font-semibold text-[#163A59]">
                            {fullName}
                        </p>

                        <InvitationStatusBadge
                            status={
                                invitation.status
                            }
                        />
                    </div>

                    <p className="mt-1 truncate text-sm text-[#7C98AB]">
                        {invitation.email}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#9BBCCE]">
                        <span>
                            Utworzono:{' '}
                            {formatDate(
                                invitation.createdAt,
                            )}
                        </span>

                        <span>
                            Wysłano:{' '}
                            {invitation.emailSentAt
                                ? formatDate(
                                      invitation.emailSentAt,
                                  )
                                : 'nie wysłano'}
                        </span>

                        <span>
                            Wygasa:{' '}
                            {formatDate(
                                invitation.expiresAt,
                            )}
                        </span>
                    </div>
                </div>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-xl text-[#9BBCCE]"
                    >
                        <MoreHorizontal className="size-5" />

                        <span className="sr-only">
                            Opcje zaproszenia
                        </span>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    className="w-56 rounded-2xl border-[#DDECF2] p-2"
                >
                    <DropdownMenuItem className="rounded-xl">
                        <RefreshCw className="mr-2 size-4" />
                        Wyślij ponownie
                    </DropdownMenuItem>

                    <DropdownMenuItem className="rounded-xl text-red-600 focus:text-red-600">
                        <Ban className="mr-2 size-4" />
                        Anuluj zaproszenie
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

function InvitationStatusBadge({
    status,
}: {
    status: SchoolInvitation['status']
}) {
    if (status === 'expired') {
        return (
            <Badge
                variant="secondary"
                className="rounded-full bg-red-50 text-red-700 hover:bg-red-50"
            >
                <Clock3 className="mr-1 size-3" />
                Wygasło
            </Badge>
        )
    }

    if (status === 'cancelled') {
        return (
            <Badge
                variant="secondary"
                className="rounded-full bg-slate-100 text-slate-600 hover:bg-slate-100"
            >
                <Ban className="mr-1 size-3" />
                Anulowane
            </Badge>
        )
    }

    return (
        <Badge
            variant="secondary"
            className="rounded-full bg-amber-50 text-amber-700 hover:bg-amber-50"
        >
            <MailCheck className="mr-1 size-3" />
            Oczekuje
        </Badge>
    )
}

type EmptyStateProps = {
    icon: React.ReactNode
    title: string
    description: string
}

function EmptyState({
    icon,
    title,
    description,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center px-6 py-16 text-center">
            <div className="flex size-16 items-center justify-center rounded-3xl bg-[#EAF5F9] text-[#3977A8]">
                {icon}
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#163A59]">
                {title}
            </h2>

            <p className="mt-2 max-w-sm leading-6 text-[#68859A]">
                {description}
            </p>
        </div>
    )
}

function formatDate(
    value: string,
): string {
    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return 'Brak daty'
    }

    return new Intl.DateTimeFormat(
        'pl-PL',
        {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        },
    ).format(date)
}

function getStudentsCountLabel(
    count: number,
): string {
    if (count === 1) {
        return 'kursant'
    }

    const lastTwoDigits = count % 100
    const lastDigit = count % 10

    if (
        lastDigit >= 2 &&
        lastDigit <= 4 &&
        !(
            lastTwoDigits >= 12 &&
            lastTwoDigits <= 14
        )
    ) {
        return 'kursantów'
    }

    return 'kursantów'
}

function getInvitationsCountLabel(
    count: number,
): string {
    if (count === 1) {
        return 'zaproszenie'
    }

    const lastTwoDigits = count % 100
    const lastDigit = count % 10

    if (
        lastDigit >= 2 &&
        lastDigit <= 4 &&
        !(
            lastTwoDigits >= 12 &&
            lastTwoDigits <= 14
        )
    ) {
        return 'zaproszenia'
    }

    return 'zaproszeń'
}