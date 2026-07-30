"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/auth/supabase-server";
import { getCurrentSchool } from "@/lib/school/get-current-school";

/* UWAGA 

    owners can update their own schools - testowa polityka która zmienia status z onboarding na active
    
    ZAMIAST TEGO W PRODUKCJI BĘDZIE REVENUECAT I JAKIŚ HOOK

*/


export async function activateSchoolTestAction() {
    const supabase = await createClient();

    const school = await getCurrentSchool();

    if (!school) {
        redirect("/dashboard/onboarding");
    }

    if (school.status === "active") {
        redirect("/dashboard");
    }

    if (school.status !== "onboarding") {
        throw new Error(
            `Nie można aktywować szkoły ze statusem: ${school.status}`,
        );
    }

    const { data, error } = await supabase
        .from("schools")
        .update({
            status: "active",
        })
        .eq("id", school.id)
        .eq("status", "onboarding")
        .select("id, status")
        .maybeSingle();

    console.log("activateSchoolTestAction data:", data);
    console.log("activateSchoolTestAction error:", error);

    if (error) {
        throw new Error(error.message);
    }

    if (!data) {
        throw new Error(
            "Szkoła nie została zaktualizowana. Sprawdź RLS oraz obecny status szkoły.",
        );
    }

    redirect("/dashboard");
}