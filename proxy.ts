import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/login", "/register"];

export async function proxy(request: NextRequest) {
    let response = NextResponse.next({
        request,
    });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabasePublishableKey =
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabasePublishableKey) {
        throw new Error(
            "Missing NEXT_PUBLIC_SUPABASE_URL or " +
            "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"
        );
    }

    const supabase = createServerClient(
        supabaseUrl,
        supabasePublishableKey,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },

                setAll(cookiesToSet) {
                    // Aktualizuje cookies requestu przekazywanego dalej.
                    cookiesToSet.forEach(({ name, value }) => {
                        request.cookies.set(name, value);
                    });

                    response = NextResponse.next({
                        request,
                    });

                    // Aktualizuje cookies w odpowiedzi do przeglądarki.
                    cookiesToSet.forEach(({ name, value, options }) => {
                        response.cookies.set(name, value, options);
                    });
                },
            },
        }
    );

    // Weryfikuje JWT i w razie potrzeby odświeża sesję.
    const { data, error } = await supabase.auth.getClaims();

    const isAuthenticated =
        !error && Boolean(data?.claims?.sub);

    const pathname = request.nextUrl.pathname;

    const isProtectedRoute = protectedRoutes.some(
        (route) =>
            pathname === route ||
            pathname.startsWith(`${route}/`)
    );

    const isAuthRoute = authRoutes.some(
        (route) =>
            pathname === route ||
            pathname.startsWith(`${route}/`)
    );

    // Niezalogowany użytkownik próbuje wejść na chronioną stronę.
    if (isProtectedRoute && !isAuthenticated) {
        const loginUrl = request.nextUrl.clone();

        loginUrl.pathname = "/login";
        loginUrl.search = "";

        loginUrl.searchParams.set(
            "redirectTo",
            `${pathname}${request.nextUrl.search}`
        );

        return copyCookiesToRedirect(response, loginUrl);
    }

    // Zalogowany użytkownik próbuje wejść na login lub rejestrację.
    if (isAuthRoute && isAuthenticated) {
        const dashboardUrl = request.nextUrl.clone();

        dashboardUrl.pathname = "/dashboard";
        dashboardUrl.search = "";

        return copyCookiesToRedirect(response, dashboardUrl);
    }

    return response;
}

function copyCookiesToRedirect(
    sourceResponse: NextResponse,
    redirectUrl: URL
) {
    const redirectResponse = NextResponse.redirect(redirectUrl);

    sourceResponse.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(
            cookie.name,
            cookie.value,
            cookie
        );
    });

    return redirectResponse;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};