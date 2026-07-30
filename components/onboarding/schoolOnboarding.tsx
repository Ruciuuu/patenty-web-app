'use client'

import { CreateSchoolForm, CreateSchoolState } from '@/components/onboarding/registerSchool'
import { Button } from '@/components/ui/button'
import {
    ArrowLeft,
    ArrowRight,
    BarChart3,
    BookOpen,
    CheckCircle2,
    GraduationCap,
    Sparkles,
    Users,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

type OnboardingStep = {
    id: number
    title: string
    description: string
    image: string
    imageAlt: string
    features?: {
        icon: React.ReactNode
        title: string
        description: string
    }[]
}

const steps: OnboardingStep[] = [
    {
        id: 0,
        title: 'Prowadź szkołę z jednego miejsca',
        description:
            'Kursanci, instruktorzy, kursy i wyniki nauki w jednym prostym panelu.',
        image: '/image/onboarding.jpg',
        imageAlt: 'Panel szkoły',
        features: [
            {
                icon: <Users className="size-4" />,
                title: 'Kursanci',
                description:
                    'Zarządzaj osobami zapisanymi do szkoły.',
            },
            {
                icon: <GraduationCap className="size-4" />,
                title: 'Instruktorzy',
                description:
                    'Dodawaj zespół i organizuj dostęp.',
            },
        ],
    },
    {
        id: 1,
        title: 'Daj kursantom nowoczesny sposób nauki',
        description:
            'Lekcje, testy, pytania egzaminacyjne i powtórki działają razem jako jeden system przygotowania do patentu.',
        image: '/onboarding.jpg',
        imageAlt: 'Widok nauki kursanta',
        features: [
            {
                icon: <BookOpen className="size-4" />,
                title: 'Materiały',
                description:
                    'Kursy i lekcje dostępne również na telefonie.',
            },
            {
                icon: <CheckCircle2 className="size-4" />,
                title: 'Testy',
                description:
                    'Nauka na pytaniach z bazy egzaminacyjnej.',
            },
        ],
    },
    {
        id: 2,
        title: 'Wiesz, kto jest gotowy do egzaminu',
        description:
            'Zamiast zgadywać, obserwujesz aktywność, postęp i wyniki kursantów.',
        image: '/onboarding.jpg',
        imageAlt: 'Statystyki kursantów',
        features: [
            {
                icon: <BarChart3 className="size-4" />,
                title: 'Postęp',
                description:
                    'Szybko sprawdzisz wyniki i ukończone materiały.',
            },
            {
                icon: <Sparkles className="size-4" />,
                title: 'Powtórki',
                description:
                    'System pomaga kursantom wracać do trudnych pytań.',
            },
        ],
    },
    {
        id: 3,
        title: 'Utwórz swoją szkołę',
        description:
            'Dodaj podstawowe dane szkoły i uruchom swój panel.',
        image: '/onboarding.jpg',
        imageAlt: 'Szkoła żeglarska',
    },
]

type SchoolOnboardingProps = {
    createSchoolAction: (
        prevState: CreateSchoolState,
        formData: FormData,
    ) => Promise<CreateSchoolState>

    onSkip?: () => void
}

export function SchoolOnboarding({
    createSchoolAction,
    onSkip,
}: SchoolOnboardingProps) {
    const [stepIndex, setStepIndex] = useState(0)

    const currentStep = steps[stepIndex]

    const isFirst = stepIndex === 0
    const isLast = stepIndex === steps.length - 1

    function nextStep() {
        setStepIndex((current) =>
            Math.min(current + 1, steps.length - 1),
        )
    }

    function previousStep() {
        setStepIndex((current) =>
            Math.max(current - 1, 0),
        )
    }

    return (
        <main className="min-h-screen bg-[#F8FAFC]">
            <div className="grid min-h-screen lg:h-screen lg:grid-cols-2 lg:overflow-hidden">

                {/* LEWA STRONA */}
                <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#F9FBFD] px-5 py-5 md:px-8 md:py-8 lg:min-h-0 lg:px-12 xl:px-16">
                    <LeftBackground />

                    <div className="relative z-10 grid min-h-full flex-1 grid-rows-[auto_1fr_auto]">
                        <Header
                            step={stepIndex}
                            count={steps.length}
                            onSkip={onSkip}
                        />

                        <div className="flex min-h-0 items-center py-8 lg:py-6">
                            <section className="mx-auto w-full max-w-xl lg:mx-0">

                                {isLast ? (
                                    /*
                                     * OSTATNI SLAJD:
                                     * formularz zamiast standardowej treści.
                                     */
                                    <div
                                        key="create-school"
                                        className="animate-in fade-in slide-in-from-bottom-2 duration-300"
                                    >
                                        <CreateSchoolForm
                                            action={createSchoolAction}
                                            onBack={previousStep}
                                        />
                                    </div>
                                ) : (
                                    <>
                                        {/*
                                         * Stała wysokość zawartości.
                                         * CTA nie skacze pomiędzy slajdami.
                                         */}
                                        <div className="min-h-[430px] md:min-h-[450px] lg:min-h-[465px] xl:min-h-[490px]">
                                            <div
                                                key={currentStep.id}
                                                className="animate-in fade-in slide-in-from-bottom-2 duration-300"
                                            >
                                                <h1 className="max-w-[580px] text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#293681] md:text-5xl xl:text-[58px]">
                                                    {currentStep.title}
                                                </h1>

                                                <p className="mt-5 max-w-lg text-base leading-7 text-[#747B8F] md:text-lg md:leading-8">
                                                    {currentStep.description}
                                                </p>

                                                {currentStep.features ? (
                                                    <div className="mt-9 grid gap-3 sm:grid-cols-2">
                                                        {currentStep.features.map(
                                                            (feature) => (
                                                                <FeatureCard
                                                                    key={
                                                                        feature.title
                                                                    }
                                                                    {...feature}
                                                                />
                                                            ),
                                                        )}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <div className="mt-4">
                                            <div className="flex flex-col gap-3 sm:flex-row">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={previousStep}
                                                    disabled={isFirst}
                                                    aria-hidden={isFirst}
                                                    tabIndex={
                                                        isFirst ? -1 : 0
                                                    }
                                                    className={`h-12 min-w-32 rounded-2xl border-[#E0E5ED] bg-white px-5 text-[#293681] shadow-none hover:bg-[#F7F9FC] ${isFirst
                                                        ? 'invisible'
                                                        : ''
                                                        }`}
                                                >
                                                    <ArrowLeft className="mr-2 size-4" />
                                                    Wstecz
                                                </Button>

                                                <Button
                                                    type="button"
                                                    onClick={nextStep}
                                                    className="h-12 min-w-44 rounded-2xl bg-[#293681] px-6 font-semibold text-white shadow-none hover:bg-[#222D70]"
                                                >
                                                    <span className="inline-flex min-w-[106px] items-center justify-center">
                                                        {stepIndex ===
                                                            steps.length - 2 ? (
                                                            <>
                                                                Stwórz szkołę
                                                                <ArrowRight className="ml-2 size-4" />
                                                            </>
                                                        ) : (
                                                            <>
                                                                Dalej
                                                                <ArrowRight className="ml-2 size-4" />
                                                            </>
                                                        )}
                                                    </span>
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </section>
                        </div>

                        <FooterProgress
                            activeStep={stepIndex}
                            steps={steps}
                            onStepChange={setStepIndex}
                        />
                    </div>
                </div>

                {/* PRAWA STRONA — BEZ ZMIAN */}
                <Visual
                    key={currentStep.id}
                    step={currentStep}
                    stepIndex={stepIndex}
                />
            </div>
        </main>
    )
}

function LeftBackground() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
        >
            <div className="absolute inset-0 bg-[#F9FBFD]" />

            {/* Glow lewy górny */}
            <div className="absolute -left-32 -top-36 hidden h-[420px] w-[420px] rounded-full bg-[#D0E7E6]/45 blur-[110px] md:block" />

            <div className="absolute left-[12%] top-[4%] hidden h-[240px] w-[340px] rounded-full bg-[#95CCDD]/15 blur-[100px] lg:block" />

            {/* Glow przy zdjęciu */}
            <div className="absolute -right-28 top-[16%] hidden h-[520px] w-[260px] rounded-full bg-[#4274D9]/[0.055] blur-[100px] lg:block" />

            {/* Delikatna siatka */}
            <div
                className="absolute left-0 top-0 hidden h-[42%] w-[58%] opacity-[0.38] md:block"
                style={{
                    backgroundImage: `
                        linear-gradient(
                            to right,
                            rgba(66, 116, 217, 0.055) 1px,
                            transparent 1px
                        ),
                        linear-gradient(
                            to bottom,
                            rgba(66, 116, 217, 0.055) 1px,
                            transparent 1px
                        )
                    `,
                    backgroundSize: '40px 40px',
                    maskImage:
                        'linear-gradient(to bottom right, black, transparent 76%)',
                    WebkitMaskImage:
                        'linear-gradient(to bottom right, black, transparent 76%)',
                }}
            />

            {/* Linie topograficzne */}
            <svg
                className="absolute -left-20 top-4 hidden h-[360px] w-[520px] opacity-[0.22] md:block"
                viewBox="0 0 520 360"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M-30 97C33 44 96 30 153 52C213 75 235 132 299 141C369 151 402 96 551 76"
                    stroke="#95CCDD"
                    strokeWidth="1.2"
                />

                <path
                    d="M-37 121C31 65 99 53 160 75C220 97 251 151 314 158C383 166 424 110 552 97"
                    stroke="#95CCDD"
                    strokeWidth="1"
                />

                <path
                    d="M-48 147C21 92 94 79 159 100C222 121 258 173 321 179C391 185 433 133 566 117"
                    stroke="#4274D9"
                    strokeWidth="0.9"
                />

                <path
                    d="M-42 174C21 125 91 106 162 125C225 142 270 193 333 198C396 203 447 153 574 140"
                    stroke="#95CCDD"
                    strokeWidth="0.85"
                />
            </svg>

            {/* Małe akcenty */}
            <div className="absolute left-[8%] top-[19%] hidden size-1.5 rounded-full bg-[#4274D9]/35 lg:block" />

            <div className="absolute left-[18%] top-[12%] hidden size-1 rounded-full bg-[#95CCDD]/70 lg:block" />

            <div className="absolute right-[7%] top-[29%] hidden size-1.5 rounded-full bg-[#95CCDD]/50 lg:block" />

            {/* Dolna fala */}
            <svg
                className="absolute bottom-0 left-0 h-[220px] w-[155%] md:h-[270px] lg:h-[310px]"
                viewBox="0 0 1400 320"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 190C176 154 301 246 472 220C645 193 779 113 957 136C1109 156 1228 228 1400 172V320H0V190Z"
                    fill="#D0E7E6"
                    fillOpacity="0.34"
                />

                <path
                    d="M0 224C174 187 314 260 497 237C669 215 827 158 989 177C1130 194 1253 247 1400 213V320H0V224Z"
                    fill="#95CCDD"
                    fillOpacity="0.12"
                />

                <path
                    d="M0 184C162 150 300 228 462 214C643 198 778 120 953 135C1119 150 1231 227 1400 176"
                    stroke="#95CCDD"
                    strokeOpacity="0.32"
                    strokeWidth="1.4"
                />

                <path
                    d="M0 208C167 176 301 245 477 229C649 214 806 145 971 161C1126 176 1242 239 1400 197"
                    stroke="#4274D9"
                    strokeOpacity="0.12"
                    strokeWidth="1"
                />
            </svg>

            {/* Glow za CTA */}
            <div className="absolute bottom-[10%] left-[20%] hidden h-[180px] w-[320px] rounded-full bg-[#95CCDD]/10 blur-[80px] md:block" />

            {/* Akcent przy podziale */}
            <div className="absolute bottom-[8%] right-0 hidden h-[38%] w-px bg-gradient-to-b from-transparent via-[#95CCDD]/35 to-transparent lg:block" />

            {/* Mobile */}
            <div className="absolute -bottom-24 -left-28 h-[220px] w-[320px] rounded-full bg-[#D0E7E6]/30 blur-[70px] md:hidden" />

            <svg
                className="absolute bottom-0 left-0 h-[110px] w-[180%] opacity-70 md:hidden"
                viewBox="0 0 900 120"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 70C123 44 218 92 337 75C467 57 555 32 683 49C768 61 836 82 900 70"
                    stroke="#95CCDD"
                    strokeOpacity="0.35"
                />

                <path
                    d="M0 88C124 62 216 103 341 91C474 78 568 51 690 65C779 75 841 95 900 87V120H0V88Z"
                    fill="#D0E7E6"
                    fillOpacity="0.22"
                />
            </svg>
        </div>
    )
}

function Header({
    step,
    count,
    onSkip,
}: {
    step: number
    count: number
    onSkip?: () => void
}) {
    return (
        <header className="flex items-center justify-between">
            <div className="flex items-center gap-3" />

            <div className="flex items-center gap-5">
                <span className="hidden text-xs font-semibold text-[#9299AB] sm:block">
                    {step + 1} / {count}
                </span>

                {onSkip ? (
                    <button
                        type="button"
                        onClick={onSkip}
                        className="text-sm font-semibold text-[#747B8F] transition-colors hover:text-[#293681]"
                    >
                        Pomiń
                    </button>
                ) : null}
            </div>
        </header>
    )
}

function FeatureCard({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode
    title: string
    description: string
}) {
    return (
        <div className="rounded-[20px] border border-[#E4E9F2] bg-white/85 p-4 backdrop-blur-sm">
            <div className="flex size-9 items-center justify-center rounded-[12px] bg-[#EEF3FC] text-[#4274D9]">
                {icon}
            </div>

            <h3 className="mt-4 text-sm font-bold text-[#293681]">
                {title}
            </h3>

            <p className="mt-1 text-sm leading-5 text-[#747B8F]">
                {description}
            </p>
        </div>
    )
}

function Visual({
    step,
    stepIndex,
}: {
    step: OnboardingStep
    stepIndex: number
}) {
    return (
        <section className="relative min-h-[500px] w-full overflow-hidden lg:h-screen lg:min-h-0">
            <div
                key={step.id}
                className="absolute inset-0 animate-in fade-in duration-500"
            >
                <Image
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    priority={stepIndex === 0}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#293681]/20 via-transparent to-transparent" />
            </div>
        </section>
    )
}

function FooterProgress({
    activeStep,
    steps,
    onStepChange,
}: {
    activeStep: number
    steps: OnboardingStep[]
    onStepChange: (index: number) => void
}) {
    return (
        <footer className="flex items-center justify-between border-t border-[#E8ECF2] pt-5">
            <div className="flex items-center gap-2">
                {steps.map((step, index) => (
                    <button
                        key={step.id}
                        type="button"
                        onClick={() => onStepChange(index)}
                        aria-label={`Przejdź do kroku ${index + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${index === activeStep
                            ? 'w-10 bg-[#4274D9]'
                            : index < activeStep
                                ? 'w-5 bg-[#95CCDD]'
                                : 'w-5 bg-[#DDE2EB]'
                            }`}
                    />
                ))}
            </div>
        </footer>
    )
}