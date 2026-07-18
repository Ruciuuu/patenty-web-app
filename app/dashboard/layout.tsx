import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'

import { Header } from '@/components/header'
import { getUserInfo } from '@/actions/user-actions'

export default async function DashboardLayout({
    children,
}: {
    children: ReactNode
}) {


    /* User info */
    const { user } = await getUserInfo()

    if (!user) {
        throw new Error("User does not exist")
    }

    const firstName = user.user_metadata?.first_name ? user.user_metadata?.first_name : ""
    const lastName = user.user_metadata?.last_name ? user.user_metadata?.last_name : ""

    /* Sprawdzam czy użytkownik utworzył swoją szkołę */


    return (
        <>
            <div className="min-h-screen bg-[#F7FBFD]">
                <Header

                    firstName={firstName}
                    lastName={lastName}
                />

                {children}
            </div>
        </>
    )
}