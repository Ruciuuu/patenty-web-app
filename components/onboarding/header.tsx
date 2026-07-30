import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, LogOutIcon, Settings } from "lucide-react"
import Link from "next/link"
import { Button } from '../ui/button'


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


                    <div>
                        <p className="text-lg font-extrabold tracking-tight text-[#163A59]">
                            Helmio
                        </p>
                        <p className="text-[11px] text-[#7C98AB]">Panel szkoły</p>
                    </div>
                </Link>


                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger >
                            <Button
                                variant="ghost"
                                className="h-11 gap-3 rounded-2xl px-2 hover:bg-[#EAF5F9] cursor-pointer"
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

                                <ChevronDown className="hidden size-4 text-slate-800 sm:block" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                            className="w-52 rounded-2xl border-black p-2"
                        >
                            <DropdownMenuItem className="rounded-xl">
                                <Settings className="mr-2 size-4" />

                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl text-red-600 hover:text-red-500 cursor-pointer">
                                <LogOutIcon className="mr-2 size-4" />
                                Wyloguj się
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

