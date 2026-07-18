import { Activity, Anchor, BarChart3, BookOpen, ChevronDown, Compass, GraduationCap, MoreHorizontal, Search, Settings, Users } from "lucide-react"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from "./ui/button"


interface HeaderProps {
    firstName: string,
    lastName: string
}




export function Header({
    firstName,
    lastName
}: HeaderProps) {





    return (
        <header className="sticky top-0 z-40 border-b border-[#E2EDF2] bg-[#F7FBFD]/90 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-[#4C8DD8] text-white shadow-sm">
                        <Compass className="size-6" />
                    </div>

                    <div>
                        <p className="text-lg font-extrabold tracking-tight text-[#163A59]">
                            Helmio
                        </p>
                        <p className="text-[11px] text-[#7C98AB]">Panel szkoły</p>
                    </div>
                </Link>

                <nav className="hidden items-center gap-1 lg:flex">
                    <HeaderNavItem href="/dashboard" active icon={<Activity />}>
                        Dashboard
                    </HeaderNavItem>
                    <HeaderNavItem href="/dashboard/school" icon={<GraduationCap />}>
                        Szkoła
                    </HeaderNavItem>
                    {/*         <HeaderNavItem href="/dashboard/groups" icon={<GraduationCap />}>
                        Grupy
                    </HeaderNavItem> */}
                    {/*      <HeaderNavItem href="/dashboard/materials" icon={<BookOpen />}>
                        Materiały
                    </HeaderNavItem> */}
                    {/*       <HeaderNavItem href="/dashboard/reports" icon={<BarChart3 />}>
                        Raporty
                    </HeaderNavItem> */}
                </nav>

                <div className="flex items-center gap-2">
                    <div className="relative hidden md:block">
                        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#9BBCCE]" />
                        <input
                            placeholder="Szukaj..."
                            className="h-10 w-52 rounded-xl border border-[#DDECF2] bg-white pl-10 pr-3 text-sm text-[#163A59] outline-none placeholder:text-[#9BBCCE] focus:border-[#78A4CB]"
                        />
                    </div>

                    {/* Powiadomienia */}
                    {/*         <Button
            size="icon"
            variant="ghost"
            className="relative rounded-xl text-[#68859A]"
          >
            <Bell className="size-5" />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-[#4C8DD8]" />
          </Button> */}

                    <DropdownMenu>
                        <DropdownMenuTrigger >
                            <Button
                                variant="ghost"
                                className="h-11 gap-3 rounded-2xl px-2 hover:bg-[#EAF5F9]"
                            >
                                <Avatar className="size-9">
                                    <AvatarFallback className="bg-[#D9EEF7] font-bold text-[#3977A8]">
                                        {firstName[0]}{lastName[0]}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="hidden text-left sm:block">
                                    <p className="text-sm font-semibold text-[#163A59]">
                                        {firstName} {lastName}
                                    </p>
                                    <p className="text-xs text-[#7C98AB]">Właściciel</p>
                                </div>

                                <ChevronDown className="hidden size-4 text-[#7C98AB] sm:block" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                            className="w-52 rounded-2xl border-[#DDECF2] p-2"
                        >
                            <DropdownMenuItem className="rounded-xl">
                                <Settings className="mr-2 size-4" />
                                <a href="/dashboard/settings"> Ustawienia</a>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl">
                                <Anchor className="mr-2 size-4" />
                                Profil szkoły
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}

function HeaderNavItem({
    href,
    icon,
    active = false,
    children,
}: {
    href: string
    icon: React.ReactNode
    active?: boolean
    children: React.ReactNode
}) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${active
                ? 'bg-[#E1F2F8] text-[#286DAB]'
                : 'text-[#68859A] hover:bg-[#EEF7FA] hover:text-[#163A59]'
                }`}
        >
            <span className="[&_svg]:size-4">{icon}</span>
            {children}
        </Link>
    )
}

