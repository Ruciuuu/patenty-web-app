import Link from 'next/link'
import {
    ArrowLeft,
    Compass,

} from 'lucide-react'

import { RegisterForm } from '@/components/auth/registerForm'

export default function RegisterPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#F7FBFD] text-[#163A59]">
            <RegisterBackground />

            <div className="relative z-10 grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
                {/* Desktop presentation */}
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

                    <div className="relative max-w-xl my-auto h-screen">


                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B4E1EB]">
                            Rozpocznij z Helmio
                        </p>

                        <h1 className="mt-5 text-balance text-5xl font-extrabold tracking-[-0.04em] xl:text-6xl">
                            Zbuduj nowoczesne doświadczenie dla kursantów.
                        </h1>

                        <p className="mt-6 max-w-lg text-lg leading-8 text-white/65">
                            Utwórz konto szkoły, zaproś instruktorów i zarządzaj całym
                            procesem szkoleniowym z jednego miejsca.
                        </p>


                    </div>


                </section>

                {/* Registration section */}
                <section className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
                    <div className="w-full max-w-lg">
                        <div className="mb-10 flex items-center justify-between lg:hidden">
                            <Link href="/" className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-2xl bg-[#4C8DD8] text-white">
                                    <Compass className="size-6" />
                                </div>

                                <span className="text-xl font-extrabold text-[#163A59]">
                                    Helmio
                                </span>
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


                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4C8DD8]">
                                Konto właściciela
                            </p>

                            <h2 className="mt-3 text-4xl font-light tracking-[-0.03em] text-[#163A59]">
                                Utwórz swoją szkołę
                            </h2>

                            <p className="mt-3 leading-7 text-[#68859A]">
                                Załóż konto właściciela i rozpocznij konfigurację platformy.
                            </p>
                        </div>

                        <RegisterForm />

                        <p className="mt-8 text-center text-sm text-[#68859A]">
                            Masz już konto?{' '}
                            <Link
                                href="/login"
                                className="font-semibold text-[#397CC9] hover:text-[#286DAB]"
                            >
                                Zaloguj się
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

function RegisterBackground() {
    return (
        <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-40 top-10 size-[480px] rounded-full bg-[#DDF1F7]/70 blur-3xl" />
            <div className="absolute bottom-10 right-[20%] size-72 rounded-full bg-[#F9E8A2]/20 blur-3xl" />
        </div>
    )
}