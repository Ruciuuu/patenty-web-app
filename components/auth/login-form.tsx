'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
    AlertCircle,
    Eye,
    EyeOff,
    Loader2,
    LockKeyhole,
    Mail,
} from 'lucide-react'

import { createClient } from '@/lib/auth/supabase-browser'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function LoginForm() {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isPending, setIsPending] = useState(false)


    const supabase = createClient()

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setError(null)
        setIsPending(true)

        try {
            const { data, error: loginError } =
                await supabase.auth.signInWithPassword({
                    email: email.trim(),
                    password,
                })

            if (loginError) {
                throw loginError
            }

            if (!data.user) {
                throw new Error('Nie udało się pobrać danych użytkownika.')
            }

            /*     const { data: membership, error: membershipError } = await supabase
                    .from('school_memberships')
                    .select('school_id, role, status')
                    .eq('user_id', data.user.id)
                    .eq('status', 'active')
                    .in('role', ['owner', 'admin', 'instructor'])
                    .maybeSingle()
    
                if (membershipError) {
                    throw membershipError
                }
    
                if (!membership) {
                    await supabase.auth.signOut()
    
                    setError(
                        'To konto nie ma dostępu do panelu szkoły. Zaloguj się jako administrator lub instruktor.',
                    )
    
                    return
                }
     */
            router.replace('/dashboard')
            router.refresh()
        } catch (error) {
            setError(
                error instanceof Error
                    ? getAuthErrorMessage(error.message)
                    : 'Wystąpił nieoczekiwany błąd.',
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

            <div className="space-y-2">
                <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-[#385B73]"
                >
                    Adres e-mail
                </Label>

                <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#9BBCCE]" />

                    <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="admin@szkola.pl"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        disabled={isPending}
                        required
                        className="h-14 rounded-2xl border-[#D7E8EF] bg-white pl-12 pr-4 text-base text-[#163A59] shadow-sm placeholder:text-[#9BBCCE] focus-visible:border-[#78A4CB] focus-visible:ring-[#78A4CB]/20"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label
                        htmlFor="password"
                        className="text-sm font-semibold text-[#385B73]"
                    >
                        Hasło
                    </Label>

                    <Link
                        href="/forgot-password"
                        className="text-sm font-medium text-[#397CC9] hover:text-[#286DAB]"
                    >
                        Nie pamiętasz hasła?
                    </Link>
                </div>

                <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#9BBCCE]" />

                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        placeholder="Wprowadź hasło"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        disabled={isPending}
                        required
                        className="h-14 rounded-2xl border-[#D7E8EF] bg-white pl-12 pr-12 text-base text-[#163A59] shadow-sm placeholder:text-[#9BBCCE] focus-visible:border-[#78A4CB] focus-visible:ring-[#78A4CB]/20"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
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

            <div className="flex items-center space-x-2">
                <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                    className="border-[#BFD9E4] data-[state=checked]:border-[#4C8DD8] data-[state=checked]:bg-[#4C8DD8]"
                />

                <Label
                    htmlFor="remember"
                    className="cursor-pointer text-sm font-normal text-[#68859A] "

                >
                    Zapamiętaj mnie na tym urządzeniu
                </Label>
            </div>

            <Button
                type="submit"
                disabled={isPending}
                className="h-14 w-full rounded-2xl bg-[#4C8DD8] text-base font-semibold text-white shadow-[0_12px_30px_rgba(76,141,216,0.25)] hover:bg-[#397CC9]"
            >
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 size-5 animate-spin" />
                        Logowanie...
                    </>
                ) : (
                    'Zaloguj się'
                )}
            </Button>
        </form>
    )
}

function getAuthErrorMessage(message: string) {
    const normalizedMessage = message.toLowerCase()

    if (
        normalizedMessage.includes('invalid login credentials') ||
        normalizedMessage.includes('invalid credentials')
    ) {
        return 'Nieprawidłowy adres e-mail lub hasło.'
    }

    if (normalizedMessage.includes('email not confirmed')) {
        return 'Potwierdź adres e-mail przed zalogowaniem.'
    }

    if (normalizedMessage.includes('rate limit')) {
        return 'Wykonano zbyt wiele prób. Spróbuj ponownie za chwilę.'
    }

    return 'Nie udało się zalogować. Sprawdź dane i spróbuj ponownie.'
}