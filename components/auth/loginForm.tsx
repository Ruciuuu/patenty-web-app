'use client'

import {
    AlertCircle,
    Eye,
    EyeOff,
    Loader2,
    LockKeyhole,
    Mail,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export type LoginState = {
    success: boolean
    error?: string | null
    redirectTo?: string | null
}

type LoginFormProps = {
    action: (
        previousState: LoginState,
        formData: FormData,
    ) => Promise<LoginState>
}

const initialState: LoginState = {
    success: false,
    error: null,
    redirectTo: null,
}

export function LoginForm({
    action,
}: LoginFormProps) {
    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(true)

    const [state, formAction, isPending] =
        useActionState(action, initialState)

    useEffect(() => {
        if (!state.success || !state.redirectTo) {
            return
        }

        router.replace(state.redirectTo)
        router.refresh()
    }, [state, router])

    return (
        <form
            action={formAction}
            className="space-y-5"
        >
            {state.error && (
                <Alert
                    variant="destructive"
                    className="rounded-2xl border-red-200 bg-red-50 text-red-700"
                >
                    <AlertCircle className="size-4" />

                    <AlertDescription>
                        {state.error}
                    </AlertDescription>
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
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="admin@szkola.pl"
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
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        placeholder="Wprowadź hasło"
                        disabled={isPending}
                        required
                        className="h-14 rounded-2xl border-[#D7E8EF] bg-white pl-12 pr-12 text-base text-[#163A59] shadow-sm placeholder:text-[#9BBCCE] focus-visible:border-[#78A4CB] focus-visible:ring-[#78A4CB]/20"
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword((current) => !current)
                        }
                        disabled={isPending}
                        aria-label={
                            showPassword
                                ? 'Ukryj hasło'
                                : 'Pokaż hasło'
                        }
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
                    onCheckedChange={(checked) =>
                        setRememberMe(checked === true)
                    }
                    className="border-[#BFD9E4] data-[state=checked]:border-[#4C8DD8] data-[state=checked]:bg-[#4C8DD8]"
                />

                <Label
                    htmlFor="remember"
                    className="cursor-pointer text-sm font-normal text-[#68859A]"
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