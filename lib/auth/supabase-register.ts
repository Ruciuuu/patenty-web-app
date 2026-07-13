"use client";

import { createClient } from "@/lib/auth/supabase-browser";

type RegisterData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    schoolName: string;
};

export async function registerOwner({
    email,
    password,
    firstName,
    lastName,
    schoolName,
}: RegisterData) {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${window.location.origin}/auth/confirm`,
            data: {
                first_name: firstName.trim(),
                last_name: lastName.trim(),
                school_name: schoolName.trim(),
                registration_type: "school_owner",
            },
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}