'use client'

import { SchoolData } from '@/types/school'
import {
    Building2,
    Mail,
    MapPin
} from 'lucide-react'



interface SchoolCardProps {
    school: SchoolData
}

export function SchoolCard({
    school,
}: SchoolCardProps) {
    return (
        <section className="relative overflow-hidden  border border-[#E4E9F2] bg-white">
            <BackgroundDecoration />

            <div className="relative z-10">
                {/* HEADER */}
                <div className="flex items-start justify-between gap-5 border-b border-[#E8ECF2] px-6 py-6 md:px-7">
                    <div className="flex min-w-0 items-start gap-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-[#EEF3FC] text-[#4274D9]">
                            <Building2 className="size-5" />
                        </div>

                        <div className="min-w-0">
                            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#9299AB]">
                                Twoja szkoła
                            </p>

                            <h2 className="mt-1 truncate text-xl font-semibold tracking-[-0.025em] text-[#293681] md:text-2xl">
                                {school.name}
                            </h2>

                            <p className="mt-1.5 text-sm leading-6 text-[#747B8F]">
                                Podstawowe informacje o Twojej szkole.
                            </p>
                        </div>
                    </div>


                </div>

                {/* CONTENT */}
                <div className="grid md:grid-cols-2">
                    <SchoolDataItem
                        icon={<Mail />}
                        label="Adres e-mail"
                        value={school.email || 'Nie podano'}
                    />

                    <SchoolDataItem
                        icon={<MapPin />}
                        label="Adres szkoły"
                        value={school.address || 'Nie podano'}
                        bordered
                    />
                </div>

                {/* FOOTER */}

            </div>
        </section>
    )
}

function SchoolDataItem({
    icon,
    label,
    value,
    bordered = false,
}: {
    icon: React.ReactNode
    label: string
    value: string
    bordered?: boolean
}) {
    return (
        <div
            className={`flex min-w-0 items-center gap-4 px-6 py-5 md:px-7 ${bordered
                    ? 'border-t border-[#E8ECF2] md:border-l md:border-t-0'
                    : ''
                }`}
        >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-[13px] bg-[#F3F6FB] text-[#4274D9] [&_svg]:size-[18px]">
                {icon}
            </div>

            <div className="min-w-0">
                <p className="text-xs font-medium text-[#9299AB]">
                    {label}
                </p>

                <p className="mt-1 truncate text-sm font-semibold text-[#293681]">
                    {value}
                </p>
            </div>
        </div>
    )
}

function BackgroundDecoration() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
        >
            <div className="absolute -right-20 -top-28 size-56 rounded-full bg-[#D0E7E6]/30 blur-[70px]" />

            <div className="absolute right-[10%] top-0 h-32 w-48 rounded-full bg-[#95CCDD]/10 blur-[55px]" />

            <svg
                className="absolute -right-8 top-0 h-28 w-64 opacity-30"
                viewBox="0 0 260 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M-10 54C36 24 73 27 111 49C151 72 184 76 270 31"
                    stroke="#95CCDD"
                    strokeWidth="1"
                />

                <path
                    d="M-8 71C37 43 75 44 115 64C155 84 192 88 269 48"
                    stroke="#4274D9"
                    strokeOpacity="0.35"
                    strokeWidth="1"
                />
            </svg>
        </div>
    )
}