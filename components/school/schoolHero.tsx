import { Badge, Compass, Settings } from "lucide-react";


type schoolNameProps = {
    schoolName: string
}

export function SettingsHero({ schoolName }: schoolNameProps) {
    return (
        <section className="relative mb-8 overflow-hidden rounded-[34px] bg-[#163A59] px-6 py-8 text-white sm:px-8 lg:px-10">
            <div className="absolute -right-14 -top-24 size-80 rounded-full border-[44px] border-[#B4E1EB]/10" />
            <div className="absolute -bottom-20 left-[42%] size-64 rounded-full bg-[#4C8DD8]/15 blur-2xl" />

            <svg
                className="pointer-events-none absolute bottom-0 left-0 h-32 w-full"
                viewBox="0 0 1400 180"
                preserveAspectRatio="none"
                fill="none"
            >
                <path
                    d="M0 110C170 45 330 160 520 100C725 35 865 145 1050 95C1200 55 1310 90 1400 70V180H0V110Z"
                    fill="#78A4CB"
                    opacity="0.18"
                />
                <path
                    d="M0 145C190 90 350 180 560 130C780 80 920 160 1110 120C1240 90 1340 110 1400 105V180H0V145Z"
                    fill="#B4E1EB"
                    opacity="0.12"
                />
            </svg>

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                    <Badge className="mb-4 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[#B4E1EB] hover:bg-white/10">
                        <Settings className="mr-2 size-4" />
                        Ustawienia szkoły
                    </Badge>

                    <h1 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                        Zarządzaj szkołą i kontem
                    </h1>

                    <p className="mt-3 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
                        Zmień dane szkoły, zapraszaj kursantów i zarządzaj dostępem do
                        panelu.
                    </p>
                </div>

                <div className="flex items-center gap-3 rounded-[24px] border border-white/10 bg-white/[0.06] px-5 py-4 backdrop-blur">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-[#4C8DD8]">
                        <Compass className="size-6" />
                    </div>

                    <div>
                        <p className="text-sm text-white/55">Aktywna szkoła</p>
                        <p className="font-bold text-white">{schoolName}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}