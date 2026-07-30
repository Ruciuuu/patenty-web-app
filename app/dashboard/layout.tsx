import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { getUserInfo } from "@/actions/user-actions";
import { createClient } from "@/lib/auth/supabase-server";

export default async function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    const { user } = await getUserInfo();

    if (!user) {
        redirect("/login");
    }

    const supabase = await createClient();

    const { data: profile, error } = await supabase
        .from("profiles")
        .select("account_type")
        .eq("id", user.id)
        .single();

    if (error || !profile) {
        redirect("/no-access");
    }

    if (profile.account_type !== "school_user") {
        redirect("/no-access");
    }


    return (
        <div className="min-h-screen bg-[#F7FBFD]">

            {children}
        </div>
    );
}