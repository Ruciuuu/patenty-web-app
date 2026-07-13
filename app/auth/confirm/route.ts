import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/lib/auth/supabase-server";

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url);

    const tokenHash = requestUrl.searchParams.get("token_hash");
    const type = requestUrl.searchParams.get("type") as EmailOtpType | null;

    if (!tokenHash || !type) {
        return NextResponse.redirect(
            new URL("/login?error=invalid-confirmation-link", request.url)
        );
    }

    const supabase = await createClient();

    const { data, error: verificationError } =
        await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type,
        });

    if (verificationError || !data.user) {
        return NextResponse.redirect(
            new URL("/login?error=email-confirmation-failed", request.url)
        );
    }

    const user = data.user;
    const metadata = user.user_metadata;

    const registrationType = metadata?.registration_type;
    const schoolName = metadata?.school_name;

    if (
        registrationType !== "school_owner" ||
        typeof schoolName !== "string" ||
        schoolName.trim().length < 2
    ) {
        await supabase.auth.signOut();

        return NextResponse.redirect(
            new URL("/login?error=missing-school-data", request.url)
        );
    }

    const { error: schoolError } = await supabase.rpc(
        "create_school",
        {
            school_name: schoolName.trim(),
        }
    );

    if (schoolError) {
        console.error("Failed to create school:", schoolError);

        return NextResponse.redirect(
            new URL("/onboarding?error=school-creation-failed", request.url)
        );
    }

    return NextResponse.redirect(
        new URL("/dashboard", request.url)
    );
}