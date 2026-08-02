'use client'

import {
    CheckCircle2,
    Loader2,
    Mail,
    MailPlus,
    UserPlus,
    Users,
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
import { CreateSchoolInvitationInput } from '@/types/school'

type StudentsPanelProps = {
    action: (
        input: CreateSchoolInvitationInput,
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

const inputClassName =
    'h-12 rounded-2xl border-[#E3E8F1] bg-[#F9FAFC] px-4 text-[#293681] shadow-none placeholder:text-[#A3AABD] focus-visible:border-[#4274D9] focus-visible:ring-[#4274D9]/15'

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
        value: string,
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
                form.email.trim(),
            )
        ) {
            nextErrors.email =
                'Podaj poprawny adres e-mail.'
        }

        setErrors(nextErrors)

        return Object.keys(nextErrors).length === 0
    }

    function handleSubmit(
        event: FormEvent<HTMLFormElement>,
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
                'Zaproszenie zostało utworzone.',
            )

            router.refresh()
        })
    }

    return (
        <Card className="relative h-fit overflow-hidden rounded-none bg-white shadow-none">
            <BackgroundDecoration />

            <div className="relative z-10">
                <CardHeader className="border-b border-[#EDF0F5] px-6 pb-6 pt-6">
                    <div className="flex items-start gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-[18px] bg-[#EEF3FC] text-[#4274D9]">
                            <UserPlus className="size-6" />
                        </div>

                        <div className="max-w-md">
                            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8B92A5]">
                                Nowy kursant
                            </p>

                            <CardTitle className="mt-2 text-[26px] font-semibold tracking-[-0.03em] text-[#293681]">
                                Zaproś kursanta
                            </CardTitle>

                            <CardDescription className="mt-2 text-sm leading-6 text-[#747B8F]">
                                Utwórz zaproszenie przypisane do bieżącej szkoły.
                                Kursant otrzyma dostęp po zakończeniu rejestracji.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-6">
                

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        <div className="grid gap-5 sm:grid-cols-2">
                            <FormField
                                id="firstName"
                                label="Imię"
                                value={form.firstName}
                                placeholder="Jan"
                                autoComplete="given-name"
                                disabled={isPending}
                                error={errors.firstName}
                                onChange={(value) =>
                                    updateField(
                                        'firstName',
                                        value,
                                    )
                                }
                            />

                            <FormField
                                id="lastName"
                                label="Nazwisko"
                                value={form.lastName}
                                placeholder="Kowalski"
                                autoComplete="family-name"
                                disabled={isPending}
                                error={errors.lastName}
                                onChange={(value) =>
                                    updateField(
                                        'lastName',
                                        value,
                                    )
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="text-sm font-semibold text-[#293681]"
                            >
                                Adres e-mail
                            </Label>

                            <div className="relative">
                                <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#9AA7BC]" />

                                <Input
                                    id="email"
                                    type="email"
                                    value={form.email}
                                    onChange={(event) =>
                                        updateField(
                                            'email',
                                            event.target.value,
                                        )
                                    }
                                    disabled={isPending}
                                    placeholder="jan@example.com"
                                    autoComplete="email"
                                    className={`${inputClassName} pl-12`}
                                />
                            </div>

                            {errors.email ? (
                                <p className="text-sm font-medium text-[#C65353]">
                                    {errors.email}
                                </p>
                            ) : null}
                        </div>

                        {errors.general ? (
                            <div className="rounded-[18px] border border-[#F0DADA] bg-[#FFF5F5] px-4 py-3 text-sm font-medium text-[#B54C4C]">
                                {errors.general}
                            </div>
                        ) : null}

                        {successMessage ? (
                            <div className="flex items-center gap-3 rounded-[18px] border border-[#D6E7E6] bg-[#EEF7F7] px-4 py-3">
                                <div className="flex size-9 items-center justify-center rounded-xl bg-white">
                                    <CheckCircle2 className="size-5 text-[#4274D9]" />
                                </div>

                                <p className="text-sm font-semibold text-[#293681]">
                                    {successMessage}
                                </p>
                            </div>
                        ) : null}

                        <div className="border-t border-[#EDF0F5] pt-5">
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="h-12 w-full rounded-2xl bg-[#293681] font-semibold text-white shadow-none hover:bg-[#222D70]"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 size-4 animate-spin" />
                                        Tworzenie zaproszenia...
                                    </>
                                ) : (
                                    <>
                                        <MailPlus className="mr-2 size-4" />
                                        Wyślij zaproszenie
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </div>
        </Card>
    )
}

function FormField({
    id,
    label,
    value,
    placeholder,
    autoComplete,
    disabled,
    error,
    onChange,
}: {
    id: string
    label: string
    value: string
    placeholder: string
    autoComplete: string
    disabled: boolean
    error?: string
    onChange: (value: string) => void
}) {
    return (
        <div className="space-y-2">
            <Label
                htmlFor={id}
                className="text-sm font-semibold text-[#293681]"
            >
                {label}
            </Label>

            <Input
                id={id}
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                disabled={disabled}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className={inputClassName}
            />

            {error ? (
                <p className="text-sm font-medium text-[#C65353]">
                    {error}
                </p>
            ) : null}
        </div>
    )
}

function BackgroundDecoration() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-24 -top-24 size-56 rounded-full bg-[#D0E7E6]/30" />
            <div className="absolute -bottom-28 -left-24 size-64 rounded-full bg-[#EEF3FC]" />
        </div>
    )
}