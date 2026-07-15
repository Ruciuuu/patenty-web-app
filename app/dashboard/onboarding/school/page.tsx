'use client'

import { useState } from 'react'
import {
    Anchor,
    Building2,
    MapPin,
    Upload,
    ArrowRight,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SchoolOnboardingPage() {
    const [schoolName, setSchoolName] = useState('')
    const [address, setAddress] = useState('')
    const [logoUrl, setLogoUrl] = useState('')

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#F7FBFD]">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-[#D9EEF7]" />
                <div className="absolute bottom-0 left-0 h-[260px] w-full bg-[#D9EEF7]/40" />
                <div className="absolute bottom-0 left-0 h-40 w-full rounded-t-[100%] bg-[#B4E1EB]/30" />
            </div>

            <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center justify-between gap-20 px-8 py-16">
                {/* LEFT */}

                <div className="max-w-xl">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3478D9]/10">
                        <Anchor className="h-7 w-7 text-[#3478D9]" />
                    </div>

                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#3478D9]">
                        Pierwsza konfiguracja
                    </p>

                    <h1 className="text-5xl font-extrabold leading-tight text-[#163A59]">
                        Utwórz swoją szkołę
                    </h1>

                    <p className="mt-6 text-lg leading-relaxed text-[#68859A]">
                        To jednorazowa konfiguracja. Po utworzeniu szkoły będziesz mógł
                        zapraszać kursantów, tworzyć instruktorów i zarządzać całym
                        panelem administracyjnym.
                    </p>

                    <div className="mt-10 flex gap-4">
                        <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
                            <p className="text-sm font-semibold text-[#163A59]">
                                ✓ Nieograniczona liczba kursantów
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
                            <p className="text-sm font-semibold text-[#163A59]">
                                ✓ Gotowe w 30 sekund
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}

                <Card className="w-full max-w-xl rounded-[34px] border-0 bg-white p-10 shadow-[0_25px_80px_rgba(23,71,99,0.08)]">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-[#163A59]">
                            Dane szkoły
                        </h2>

                        <p className="mt-2 text-[#68859A]">
                            Informacje będą widoczne dla Twoich kursantów.
                        </p>
                    </div>

                    <div className="space-y-7">
                        <div className="space-y-2">
                            <Label>Nazwa szkoły</Label>

                            <div className="relative">
                                <Building2 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8BA5B7]" />

                                <Input
                                    value={schoolName}
                                    onChange={(e) => setSchoolName(e.target.value)}
                                    placeholder="Szkoła Żeglarska Helmio"
                                    className="h-14 rounded-2xl border-[#DCEAF1] pl-12"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Adres szkoły</Label>

                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8BA5B7]" />

                                <Input
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Gdynia, ul. Portowa 12"
                                    className="h-14 rounded-2xl border-[#DCEAF1] pl-12"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Logo szkoły (opcjonalnie)</Label>

                            <div className="rounded-3xl border-2 border-dashed border-[#DCEAF1] p-8 transition hover:border-[#3478D9]">
                                <div className="flex flex-col items-center">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D9EEF7]">
                                        <Upload className="h-7 w-7 text-[#3478D9]" />
                                    </div>

                                    <p className="font-semibold text-[#163A59]">
                                        Dodaj logo szkoły
                                    </p>

                                    <p className="mt-1 text-sm text-[#68859A]">
                                        PNG lub JPG
                                    </p>

                                    <Button
                                        variant="secondary"
                                        className="mt-6 rounded-xl"
                                    >
                                        Wybierz plik
                                    </Button>
                                </div>
                            </div>

                            {/* później podmień na upload do storage */}

                            <Input
                                value={logoUrl}
                                onChange={(e) => setLogoUrl(e.target.value)}
                                placeholder="lub wklej adres URL logo"
                                className="mt-4 h-12 rounded-xl border-[#DCEAF1]"
                            />
                        </div>

                        <Button
                            className="mt-3 h-14 w-full rounded-2xl bg-[#3478D9] text-base hover:bg-[#2968C3]"
                        >
                            Utwórz szkołę

                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </Card>
            </div>
        </main>
    )
}