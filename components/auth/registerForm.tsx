'use client'

import {
    AlertCircle,
    CheckCircle2,
    Eye,
    EyeOff,
    Loader2,
    LockKeyhole,
    Mail,
    User
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/auth/supabase-browser'


export function RegisterForm() {


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const [acceptedTerms, setAcceptedTerms] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<string | null>(null)






    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setError(null)





        if (!firstName.trim() || !lastName.trim()) {
            setError('Podaj imię i nazwisko.')
            return
        }

        if (password.length < 8) {
            setError('Hasło musi zawierać co najmniej 8 znaków.')
            return
        }

        if (password !== confirmPassword) {
            setError('Hasła nie są takie same.')
            return
        }

        if (!acceptedTerms) {
            setError('Zaakceptuj regulamin i politykę prywatności.')
            return
        }

        setIsPending(true)

        try {

            const supabase = await createClient()

            const { data } = await supabase.auth.signUp(
                {
                    email,
                    password,
                    options: {
                        data: {
                            first_name: firstName,
                            last_name: lastName,
                            account_type: "school_user"
                        }


                    }
                }
            )

            if (!data) {
                setError("Problem ze serwerem, skontakuj się z pomocą techniczną")
            }


        } catch (caughtError) {
            setError(
                caughtError instanceof Error
                    ? getRegisterErrorMessage(caughtError.message)
                    : 'Nie udało się utworzyć konta.',
            )
        } finally {
            setIsPending(false)
        }
    }



    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
                <Alert
                    variant="destructive"
                    className="rounded-2xl border-red-200 bg-red-50 text-red-700"
                >
                    <AlertCircle className="size-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}





            <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label
                        htmlFor="firstName"
                        className="text-sm font-semibold text-[#385B73]"
                    >
                        Imię
                    </Label>

                    <InputWrapper icon={<User />}>
                        <Input
                            id="firstName"
                            autoComplete="given-name"
                            placeholder="Jan"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                            disabled={isPending}
                            required
                            className={inputClassName}
                        />
                    </InputWrapper>
                </div>

                <div className="space-y-2">
                    <Label
                        htmlFor="lastName"
                        className="text-sm font-semibold text-[#385B73]"
                    >
                        Nazwisko
                    </Label>

                    <Input
                        id="lastName"
                        autoComplete="family-name"
                        placeholder="Kowalski"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        disabled={isPending}
                        required
                        className="h-14 rounded-2xl border-[#D7E8EF] bg-white px-4 text-base text-[#163A59] shadow-sm placeholder:text-[#9BBCCE] focus-visible:border-[#78A4CB] focus-visible:ring-[#78A4CB]/20"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-[#385B73]"
                >
                    Adres e-mail
                </Label>

                <InputWrapper icon={<Mail />}>
                    <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="admin@szkola.pl"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        disabled={isPending}
                        required
                        className={inputClassName}
                    />
                </InputWrapper>
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="password"
                    className="text-sm font-semibold text-[#385B73]"
                >
                    Hasło
                </Label>

                <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 z-10 size-5 -translate-y-1/2 text-[#9BBCCE]" />

                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        placeholder="Minimum 8 znaków"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        disabled={isPending}
                        required
                        minLength={8}
                        className={`${inputClassName} pr-12`}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        disabled={isPending}
                        aria-label={showPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9BBCCE] transition hover:text-[#4C8DD8]"
                    >
                        {showPassword ? (
                            <EyeOff className="size-5" />
                        ) : (
                            <Eye className="size-5" />
                        )}
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-semibold text-[#385B73]"
                >
                    Powtórz hasło
                </Label>

                <InputWrapper icon={<LockKeyhole />}>
                    <Input
                        id="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        placeholder="Powtórz hasło"
                        value={confirmPassword}
                        onChange={(event) =>
                            setConfirmPassword(event.target.value)
                        }
                        disabled={isPending}
                        required
                        className={inputClassName}
                    />
                </InputWrapper>
            </div>

            <div className="flex items-start gap-3">
                <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) =>
                        setAcceptedTerms(checked === true)
                    }
                    disabled={isPending}
                    className="mt-0.5 border-[#BFD9E4] data-[state=checked]:border-[#4C8DD8] data-[state=checked]:bg-[#4C8DD8]"
                />

                <Label
                    htmlFor="terms"
                    className="cursor-pointer text-sm font-normal leading-6 text-[#68859A]"
                >
                    Akceptuję{' '}
                    <Link
                        href="/terms"
                        className="font-medium text-[#397CC9] hover:text-[#286DAB]"
                    >
                        regulamin
                    </Link>{' '}
                    oraz{' '}
                    <Link
                        href="/privacy"
                        className="font-medium text-[#397CC9] hover:text-[#286DAB]"
                    >
                        politykę prywatności
                    </Link>
                    .
                </Label>
            </div>

            <Button
                type="submit"
                disabled={isPending}
                className="h-14 w-full rounded-2xl bg-blue-900 text-base font-semibold text-white cursor-pointer hover:bg-[#397CC9]"
            >
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 size-5 animate-spin" />
                        Tworzenie szkoły...
                    </>
                ) : (
                    'Utwórz konto szkoły'
                )}
            </Button>

            <div className="rounded-2xl border border-[#DDECF2] bg-white/70 p-4 backdrop-blur">
                <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#4C8DD8]" />

                    <p className="text-sm leading-6 text-[#68859A]">
                        Twoje konto otrzyma rolę właściciela. Po utworzeniu szkoły
                        będziesz mógł zapraszać administratorów, instruktorów
                        i kursantów.
                    </p>
                </div>
            </div>
        </form>
    )
}

function InputWrapper({
    icon,
    children,
}: {
    icon: React.ReactElement
    children: React.ReactNode
}) {
    return (
        <div className="relative">
            <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#9BBCCE] [&_svg]:size-5">
                {icon}
            </div>

            {children}
        </div>
    )
}

const inputClassName =
    'h-14 rounded-2xl border-[#D7E8EF] bg-white pl-12 pr-4 text-base text-[#163A59] shadow-sm placeholder:text-[#9BBCCE] focus-visible:border-[#78A4CB] focus-visible:ring-[#78A4CB]/20'

function createSlug(value: string) {
    return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ł/g, 'l')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 60)
}

function getRegisterErrorMessage(message: string) {
    const normalized = message.toLowerCase()

    if (
        normalized.includes('user already registered') ||
        normalized.includes('already been registered')
    ) {
        return 'Konto z tym adresem e-mail już istnieje.'
    }

    if (
        normalized.includes('duplicate key') &&
        normalized.includes('slug')
    ) {
        return 'Ten adres szkoły jest już zajęty.'
    }

    if (normalized.includes('password')) {
        return 'Hasło nie spełnia wymagań bezpieczeństwa.'
    }

    if (normalized.includes('email rate limit')) {
        return 'Wysłano zbyt wiele wiadomości. Spróbuj ponownie później.'
    }

    return 'Nie udało się utworzyć szkoły. Sprawdź dane i spróbuj ponownie.'
}