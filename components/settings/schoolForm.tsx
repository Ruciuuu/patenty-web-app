'use client'

import { useActionState } from 'react'
import {
    Building2,
    CheckCircle2,
    Loader2,
    Mail,
    MapPin,
    Save,
    School,
} from 'lucide-react'

import {
    createSchoolAction,
    type CreateSchoolState,
} from '@/actions/school-actions'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

type SchoolData = {
    name: string
    email: string
    address: string
}

interface SchoolSettingsCardProps {
    schoolSetup: boolean
    school: SchoolData
}

const initialState: CreateSchoolState = {
    success: false,
    fieldErrors: {},
}

export function SchoolForm({
    schoolSetup,
    school,
}: SchoolSettingsCardProps) {
    const [state, formAction, pending] = useActionState(
        createSchoolAction,
        initialState,
    )

    /*
     * schoolSetup === true:
     * użytkownik nie posiada jeszcze szkoły.
     */
    if (schoolSetup) {
        return (
            <Card className="overflow-hidden rounded-[30px]  bg-white">
                <CardHeader className="border-b border-[#E8F1F5] px-6 py-5">
                    <div className="flex items-start gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#E1F2F8] text-[#397CC9]">
                            <Building2 className="size-6" />
                        </div>

                        <div>
                            <CardTitle className="text-xl text-[#163A59]">
                                Utwórz swoją szkołę
                            </CardTitle>

                            <CardDescription className="mt-1 leading-6 text-[#7C98AB]">
                                Uzupełnij podstawowe dane szkoły, aby rozpocząć korzystanie
                                z panelu.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-6">
                    <form action={formAction} className="space-y-6">
                        <div className="rounded-2xl border border-[#D7E8EF] bg-[#F0F7FA] p-4">
                            <div className="flex items-start gap-3">
                                <School className="mt-0.5 size-5 shrink-0 text-[#4C8DD8]" />

                                <p className="text-sm leading-6 text-[#5A7A95]">
                                    Po utworzeniu szkoły Twoje konto otrzyma rolę właściciela.
                                    Będziesz mógł dodawać instruktorów i kursantów.
                                </p>
                            </div>
                        </div>

                        {state.error && (
                            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {state.error}
                            </div>
                        )}

                        {state.success && (
                            <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                                <CheckCircle2 className="size-5" />
                                Szkoła została utworzona.
                            </div>
                        )}

                        <Separator className="bg-[#E8F1F5]" />

                        <div className="space-y-2">
                            <Label
                                htmlFor="school-name"
                                className="text-sm font-semibold text-[#385B73]"
                            >
                                Nazwa szkoły
                            </Label>

                            <div className="relative">
                                <Building2 className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#9BBCCE]" />

                                <Input
                                    id="school-name"
                                    name="name"
                                    placeholder="Szkoła Żeglarska Błękitna Fala"
                                    disabled={pending}
                                    required
                                    className={inputClassName}
                                />
                            </div>

                            {state.fieldErrors?.name?.[0] && (
                                <p className="text-sm text-red-600">
                                    {state.fieldErrors.name[0]}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="school-email"
                                className="text-sm font-semibold text-[#385B73]"
                            >
                                Adres e-mail szkoły
                            </Label>

                            <div className="relative">
                                <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#9BBCCE]" />

                                <Input
                                    id="school-email"
                                    name="email"
                                    type="email"
                                    placeholder="kontakt@szkola.pl"
                                    disabled={pending}
                                    className={inputClassName}
                                />
                            </div>

                            {state.fieldErrors?.email?.[0] && (
                                <p className="text-sm text-red-600">
                                    {state.fieldErrors.email[0]}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="school-address"
                                className="text-sm font-semibold text-[#385B73]"
                            >
                                Adres szkoły
                            </Label>

                            <div className="relative">
                                <MapPin className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#9BBCCE]" />

                                <Input
                                    id="school-address"
                                    name="address"
                                    placeholder="ul. Portowa 12, Gdynia"
                                    disabled={pending}
                                    required
                                    className={inputClassName}
                                />
                            </div>

                            {state.fieldErrors?.address?.[0] && (
                                <p className="text-sm text-red-600">
                                    {state.fieldErrors.address[0]}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={pending}
                            className="h-12 w-full rounded-2xl bg-[#4C8DD8] font-semibold text-white shadow-[0_10px_26px_rgba(76,141,216,0.22)] hover:bg-[#397CC9]"
                        >
                            {pending ? (
                                <>
                                    <Loader2 className="mr-2 size-5 animate-spin" />
                                    Tworzenie szkoły...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 size-5" />
                                    Utwórz szkołę
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        )
    }


    return (
        <Card className="overflow-hidden rounded-[30px] border-[#DDECF2] bg-white shadow-[0_16px_50px_rgba(33,78,110,0.06)]">
            <CardHeader className="border-b border-[#E8F1F5] px-6 py-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#E1F2F8] text-[#397CC9]">
                            <Building2 className="size-6" />
                        </div>

                        <div>
                            <CardTitle className="text-xl text-[#163A59]">
                                Profil szkoły
                            </CardTitle>

                            <CardDescription className="mt-1 leading-6 text-[#7C98AB]">
                                Dane szkoły widoczne dla kursantów.
                            </CardDescription>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
                        <CheckCircle2 className="size-4" />
                        Aktywna
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6 p-6">
                <SchoolDataRow
                    icon={<Building2 />}
                    label="Nazwa szkoły"
                    value={school.name}
                />

                <Separator className="bg-[#E8F1F5]" />

                <SchoolDataRow
                    icon={<Mail />}
                    label="Adres e-mail"
                    value={school.email}
                />

                <Separator className="bg-[#E8F1F5]" />

                <SchoolDataRow
                    icon={<MapPin />}
                    label="Adres szkoły"
                    value={school.address}
                />

                <div className="rounded-2xl border border-[#D7E8EF] bg-[#F8FBFC] p-4">
                    <p className="text-sm leading-6 text-[#68859A]">
                        Edycja danych szkoły nie jest jeszcze dostępna. Zostanie dodana
                        w kolejnej wersji panelu.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

function SchoolDataRow({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode
    label: string
    value: string
}) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF5F9] text-[#4C8DD8] [&_svg]:size-5">
                {icon}
            </div>

            <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#9BBCCE]">
                    {label}
                </p>

                <p className="mt-1 truncate text-base font-semibold text-[#163A59]">
                    {value}
                </p>
            </div>
        </div>
    )
}

const inputClassName =
    'h-12 rounded-2xl border-[#D7E8EF] bg-white pl-12 text-base text-[#163A59] shadow-sm placeholder:text-[#9BBCCE] focus-visible:border-[#78A4CB] focus-visible:ring-[#78A4CB]/20'