import { createClient } from "@/lib/auth/supabase-server";
import { SchoolData } from "@/types/school";



export async function getCurrentSchool(): Promise<SchoolData | null> {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        console.log("user")
        return null;

    }

    const { data: membership, error } = await supabase
        .from("school_memberships")
        .select(`
            role,
            schools!inner (
                id,
                name,
                email,
                address,
                status
            )
        `)
        .eq("user_id", user.id)
        .eq("status", "active")
        .in("role", ["owner", "admin"])
        .limit(1)
        .maybeSingle();

    if (error) {
        console.error("getCurrentSchool error:", error);
        throw new Error("Failed to load current school");
    }

    if (!membership?.schools) {
        console.log("membership", membership)
        return null;

    }

    const school = Array.isArray(membership.schools)
        ? membership.schools[0]
        : membership.schools;

    if (!school) {
        console.log("school")
        return null;
    }

    return {
        id: school.id,
        name: school.name,
        email: school.email,
        address: school.address,
        status: school.status,
        role: membership.role,
    };
}