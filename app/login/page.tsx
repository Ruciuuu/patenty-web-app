import Link from 'next/link'
import {
    ArrowLeft,
} from 'lucide-react'

import { LoginForm } from '@/components/auth/loginForm'

export default function LoginPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#F7FBFD] text-[#163A59]">
            <LoginBackground />

            <div className="relative z-10 grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
                {/* Lewa część */}
                <section className="relative hidden overflow-hidden bg-[#163A59] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
                    <div className="absolute -left-32 top-24 size-[420px] rounded-full bg-[#4C8DD8]/20 blur-3xl" />
                    <div className="absolute -bottom-40 -right-28 size-[520px] rounded-full border-[80px] border-[#B4E1EB]/10" />

                    <svg
                        className="pointer-events-none absolute bottom-0 left-0 h-72 w-full"
                        viewBox="0 0 900 300"
                        fill="none"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0 165C120 100 250 220 390 155C540 85 645 205 780 145C830 120 870 120 900 125V300H0V165Z"
                            fill="#78A4CB"
                            opacity="0.24"
                        />
                        <path
                            d="M0 215C150 155 275 260 430 205C590 145 705 240 900 175V300H0V215Z"
                            fill="#B4E1EB"
                            opacity="0.15"
                        />
                    </svg>

                    <Link href="/" className="relative flex items-center gap-3">


                        <span className="text-2xl font-extrabold tracking-tight">
                            Helmio
                        </span>
                    </Link>

                    <div className="relative max-w-xl my-auto">


                        <p className="text-sm font-normal  uppercase tracking-[0.2em] text-[#B4E1EB]">
                            Panel szkoły
                        </p>

                        <h1 className="mt-5 text-balance text-5xl font-light tracking-[-0.04em] xl:text-6xl">
                            Zarządzaj szkołą z jednego miejsca.
                        </h1>

                        <p className="mt-6 max-w-lg text-lg leading-8 text-white/65 font-light">
                            Kontroluj postępy kursantów, materiały szkoleniowe, grupy oraz
                            wyniki egzaminacyjne w przejrzystym panelu.
                        </p>


                    </div>


                </section>

                {/* Formularz */}
                <section className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
                    <div className="w-full max-w-md">
                        <div className="mb-10 flex items-center justify-between lg:hidden">
                            <Link href="/" className="flex items-center gap-3">

                            </Link>
                        </div>

                        <Link
                            href="/"
                            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#68859A] transition hover:text-[#163A59]"
                        >
                            <ArrowLeft className="size-4" />
                            Wróć na stronę główną
                        </Link>

                        <div className="mb-8">


                            <p className="text-sm font-light uppercase tracking-[0.18em] text-[#4C8DD8]">
                                Panel administracyjny
                            </p>

                            <h2 className="mt-3 text-4xl font-normal tracking-[-0.03em] text-[#163A59]">
                                Witaj z powrotem
                            </h2>

                            <p className="mt-3 leading-7 text-[#68859A]">
                                Zaloguj się do panelu swojej szkoły żeglarskiej.
                            </p>
                        </div>

                        <LoginForm />

                        <div className="mt-8 rounded-2xl border border-[#dce4e7] bg-white/70 p-4 backdrop-blur">
                            <div className="flex items-start gap-3">


                                <p className="text-sm leading-6 text-[#68859A]">
                                    Panel jest dostępny wyłącznie dla właścicieli,
                                    administratorów i instruktorów szkół.
                                </p>
                            </div>
                        </div>

                        <p className="mt-8 text-center text-sm text-[#68859A]">
                            Nie masz jeszcze konta szkoły?{' '}
                            <Link
                                href="/register"
                                className="font-semibold text-[#397CC9] hover:text-[#286DAB]"
                            >
                                Rozpocznij bezpłatnie
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
        </main>
    )
}

function FeatureItem({
    icon,
    text,
}: {
    icon: React.ReactElement
    text: string
}) {
    return (
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#B4E1EB]">
                {icon}
            </div>

            <span className="text-sm font-medium text-white/80">{text}</span>
        </div>
    )
}

function LoginBackground() {
    return (
        <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-40 top-10 size-[480px] rounded-full bg-[#DDF1F7]/70 blur-3xl" />
            <div className="absolute bottom-10 right-[20%] size-72 rounded-full bg-[#F9E8A2]/20 blur-3xl" />
        </div>
    )
}