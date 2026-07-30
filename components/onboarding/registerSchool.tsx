'use client'

import {
    ArrowLeft,
    Building2,
    CheckCircle2,
    Loader2,
    Mail,
    MapPin,
} from 'lucide-react'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export type CreateSchoolState = {
    error?: string | null
    success?: boolean
    fieldErrors?: {
        name?: string[]
        email?: string[]
        address?: string[]
    }
}

type CreateSchoolFormProps = {
    action: (
        prevState: CreateSchoolState,
        formData: FormData,
    ) => Promise<CreateSchoolState>

    onBack?: () => void
}

const initialState: CreateSchoolState = {
    error: null,
    success: false,
    fieldErrors: {},
}

const inputClassName = `
    h-12
    rounded-2xl
    border-[#E0E5ED]
    bg-white/80
    pl-11
    text-[15px]
    text-[#293681]
    shadow-none
    backdrop-blur-sm
    transition
    placeholder:text-[#A3AABD]
    hover:border-[#CFD7E5]
    focus-visible:border-[#4274D9]
    focus-visible:ring-4
    focus-visible:ring-[#4274D9]/10
`

export function CreateSchoolForm({
    action,
    onBack,
}: CreateSchoolFormProps) {
    const [state, formAction] = useActionState(
        action,
        initialState,
    )

    return (
        <div className="w-full">
            {/* HEADER FORMULARZA */}
            <div className="mb-7">
                <div className="mb-5 flex size-11 items-center justify-center rounded-[15px] border border-[#DDE5F1] bg-white/70 text-[#4274D9] shadow-sm shadow-[#293681]/[0.03] backdrop-blur-sm">
                    <Building2 className="size-5" />
                </div>

                <h1 className="max-w-[580px] text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#293681] md:text-5xl lg:text-[46px] xl:text-[52px]">
                    Utwórz swoją szkołę
                </h1>

                <p className="mt-4 max-w-lg text-base leading-7 text-[#747B8F]">
                    Dodaj podstawowe dane. Za chwilę otrzymasz
                    dostęp do panelu szkoły i będziesz mógł
                    zaprosić pierwszych kursantów.
                </p>
            </div>

            <form action={formAction}>
                <div className="space-y-4">

                    {state.error ? (
                        <div className="rounded-2xl border border-[#F0DADA] bg-[#FFF5F5]/90 px-4 py-3 text-sm font-medium text-[#B54C4C] backdrop-blur-sm">
                            {state.error}
                        </div>
                    ) : null}

                    {state.success ? (
                        <div className="flex items-center gap-3 rounded-2xl border border-[#CFE3E2] bg-[#EFF8F7]/90 px-4 py-3 backdrop-blur-sm">
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-white">
                                <CheckCircle2 className="size-4 text-[#4274D9]" />
                            </div>

                            <span className="text-sm font-semibold text-[#293681]">
                                Szkoła została utworzona.
                            </span>
                        </div>
                    ) : null}

                    <Field
                        id="school-name"
                        name="name"
                        label="Nazwa szkoły"
                        placeholder="Szkoła Żeglarska Błękitna Fala"
                        icon={
                            <Building2 className="size-[18px]" />
                        }
                        error={state.fieldErrors?.name?.[0]}
                        required
                    />

                    <Field
                        id="school-email"
                        name="email"
                        type="email"
                        label="Adres e-mail szkoły"
                        placeholder="kontakt@szkola.pl"
                        icon={
                            <Mail className="size-[18px]" />
                        }
                        error={state.fieldErrors?.email?.[0]}
                    />

                    <Field
                        id="school-address"
                        name="address"
                        label="Adres szkoły"
                        placeholder="ul. Portowa 12, Gdynia"
                        icon={
                            <MapPin className="size-[18px]" />
                        }
                        error={state.fieldErrors?.address?.[0]}
                        required
                    />

                    <div className="flex flex-col gap-3 pt-3 sm:flex-row">
                        {onBack ? (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onBack}
                                className="h-12 min-w-32 rounded-2xl border-[#E0E5ED] bg-white/80 px-5 font-semibold text-[#293681] shadow-none backdrop-blur-sm hover:bg-white"
                            >
                                <ArrowLeft className="mr-2 size-4" />
                                Wstecz
                            </Button>
                        ) : null}

                        <SubmitButton />
                    </div>
                </div>
            </form>

            <p className="mt-5 max-w-md text-xs leading-5 text-[#9299AB]">
                Dane szkoły będzie można później edytować
                w ustawieniach panelu.
            </p>
        </div>
    )
}

function Field({
    id,
    name,
    label,
    placeholder,
    icon,
    type = 'text',
    error,
    required = false,
}: {
    id: string
    name: string
    label: string
    placeholder: string
    icon: React.ReactNode
    type?: string
    error?: string
    required?: boolean
}) {
    const { pending } = useFormStatus()

    return (
        <div>
            <Label
                htmlFor={id}
                className="mb-2 block text-[13px] font-semibold text-[#293681]"
            >
                {label}

                {required ? (
                    <span className="ml-1 text-[#4274D9]">
                        *
                    </span>
                ) : null}
            </Label>

            <div className="relative">
                <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#8FA0B9]">
                    {icon}
                </div>

                <Input
                    id={id}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    disabled={pending}
                    required={required}
                    aria-invalid={Boolean(error)}
                    className={`${inputClassName} ${error
                            ? 'border-[#E4BABA] focus-visible:border-[#C65353] focus-visible:ring-[#C65353]/10'
                            : ''
                        }`}
                />
            </div>

            {error ? (
                <p className="mt-1.5 text-xs font-medium text-[#C65353]">
                    {error}
                </p>
            ) : null}
        </div>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button
            type="submit"
            disabled={pending}
            className="h-12 min-w-48 flex-1 rounded-2xl bg-[#293681] px-6 font-semibold text-white shadow-none transition hover:bg-[#222D70] disabled:opacity-70"
        >
            {pending ? (
                <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Tworzenie szkoły...
                </>
            ) : (
                <>
                    Utwórz szkołę
                    <CheckCircle2 className="ml-2 size-4" />
                </>
            )}
        </Button>
    )
}