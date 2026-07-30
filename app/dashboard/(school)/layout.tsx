import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { getUserInfo } from "@/actions/user-actions";
import { createClient } from "@/lib/auth/supabase-server";

export default async function SchoolLayout({
    children,
}: {
    children: ReactNode;
}) {
    const { user } = await getUserInfo();

    if (!user) {
        redirect("/login");
    }

    const supabase = await createClient();

    /*
     * Sprawdzamy, czy użytkownik należy do przynajmniej
     * jednej szkoły i ma aktywny dostęp do panelu.
     */
    const {
        data: membership,
        error: membershipError,
    } = await supabase
        .from("school_memberships")
        .select(`
            id,
            school_id,
            role,
            status
        `)
        .eq("user_id", user.id)
        .eq("status", "active")
        .in("role", ["owner", "admin"])
        .limit(1)
        .maybeSingle();

    if (membershipError) {
        console.error(
            "Failed to load school membership:",
            membershipError
        );

        throw new Error(
            "Failed to load school membership"
        );
    }

    /*
     * School user istnieje, ale nie ma jeszcze szkoły.
     *
     * Kierujemy go do onboardingu.
     */
    if (!membership) {
        redirect("/dashboard/onboarding");
    }

    return children;
}