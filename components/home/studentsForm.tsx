'use client'

import {
    Loader2,
    MailPlus,
    UserPlus,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
    FormEvent,
    useState,
    useTransition,
} from 'react'

import { CreateStudentInvitationResult } from '@/actions/student-invitations'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    CreateSchoolInvitationInput
} from '@/types/school'

type StudentsPanelProps = {
    action: (
        input: CreateSchoolInvitationInput
    ) => Promise<CreateStudentInvitationResult>
}

type FormErrors = Partial<
    Record<
        keyof CreateSchoolInvitationInput | 'general',
        string
    >
>

const EMPTY_FORM: CreateSchoolInvitationInput = {
    firstName: '',
    lastName: '',
    email: '',
}

export function StudentsForm({
    action,
}: StudentsPanelProps) {
    const router = useRouter()

    const [form, setForm] = useState(EMPTY_FORM)

    const [errors, setErrors] =
        useState<FormErrors>({})

    const [successMessage, setSuccessMessage] =
        useState<string | null>(null)

    const [isPending, startTransition] =
        useTransition()

    function updateField(
        field: keyof typeof EMPTY_FORM,
        value: string
    ) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }))

        setErrors((current) => ({
            ...current,
            [field]: undefined,
            general: undefined,
        }))

        setSuccessMessage(null)
    }

    function validateForm(): boolean {
        const nextErrors: FormErrors = {}

        if (!form.firstName.trim()) {
            nextErrors.firstName = 'Podaj imię.'
        }

        if (!form.lastName.trim()) {
            nextErrors.lastName = 'Podaj nazwisko.'
        }

        if (!form.email.trim()) {
            nextErrors.email = 'Podaj adres e-mail.'
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                form.email.trim()
            )
        ) {
            nextErrors.email =
                'Podaj poprawny adres e-mail.'
        }

        setErrors(nextErrors)

        return Object.keys(nextErrors).length === 0
    }

    function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault()

        if (!validateForm()) {
            return
        }

        setErrors({})
        setSuccessMessage(null)

        startTransition(async () => {
            const result = await action({
                firstName: form.firstName.trim(),
                lastName: form.lastName.trim(),
                email: form.email
                    .trim()
                    .toLowerCase(),
            })

            if (!result.success) {
                if (result.field) {
                    setErrors({
                        [result.field]: result.error,
                    })
                } else {
                    setErrors({
                        general: result.error,
                    })
                }

                return
            }

            setForm(EMPTY_FORM)

            setSuccessMessage(
                'Zaproszenie zostało utworzone.'
            )

            router.refresh()
        })
    }

    return (
        <Card className="h-fit rounded-[28px]">
            <CardHeader>
                <div className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-[#D9EEF7] text-[#3977A8]">
                    <UserPlus className="size-6" />
                </div>

                <CardTitle className="text-2xl text-[#163A59]">
                    Zaproś kursanta
                </CardTitle>

                <CardDescription className="leading-6 text-[#68859A]">
                    Utwórz zaproszenie dla nowej osoby.
                    Zaproszenie będzie przypisane do
                    bieżącej szkoły.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div className="space-y-2">
                        <Label htmlFor="firstName">
                            Imię
                        </Label>

                        <Input
                            id="firstName"
                            value={form.firstName}
                            onChange={(event) =>
                                updateField(
                                    'firstName',
                                    event.target.value
                                )
                            }
                            disabled={isPending}
                            placeholder="Jan"
                            autoComplete="given-name"
                            className="h-11 rounded-xl border-[#DDECF2]"
                        />

                        {errors.firstName && (
                            <p className="text-sm text-red-600">
                                {errors.firstName}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="lastName">
                            Nazwisko
                        </Label>

                        <Input
                            id="lastName"
                            value={form.lastName}
                            onChange={(event) =>
                                updateField(
                                    'lastName',
                                    event.target.value
                                )
                            }
                            disabled={isPending}
                            placeholder="Kowalski"
                            autoComplete="family-name"
                            className="h-11 rounded-xl border-[#DDECF2]"
                        />

                        {errors.lastName && (
                            <p className="text-sm text-red-600">
                                {errors.lastName}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">
                            Adres e-mail
                        </Label>

                        <Input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={(event) =>
                                updateField(
                                    'email',
                                    event.target.value
                                )
                            }
                            disabled={isPending}
                            placeholder="jan@example.com"
                            autoComplete="email"
                            className="h-11 rounded-xl border-[#DDECF2]"
                        />

                        {errors.email && (
                            <p className="text-sm text-red-600">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {errors.general && (
                        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                            {errors.general}
                        </div>
                    )}

                    {successMessage && (
                        <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                            {successMessage}
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="h-11 w-full rounded-xl bg-[#3478D9] font-semibold text-white hover:bg-[#2D68BE]"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 size-4 animate-spin" />
                                Zapraszanie...
                            </>
                        ) : (
                            <>
                                <MailPlus className="mr-2 size-4" />
                                Wyślij zaproszenie
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}