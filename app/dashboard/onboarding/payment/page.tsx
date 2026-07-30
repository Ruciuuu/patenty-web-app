import { redirect } from "next/navigation";

import { activateSchoolTestAction } from "@/actions/subscription";
import { Button } from "@/components/ui/button";
import { getCurrentSchool } from "@/lib/school/get-current-school";

export default async function PaymentPage() {
    const school = await getCurrentSchool();

    if (!school) {
        redirect("/dashboard/onboarding");
    }

    if (school.status === "active") {
        redirect("/dashboard");
    }

    if (school.status === "suspended") {
        redirect("/dashboard/suspended");
    }

    return (
        <main className="flex min-h-[70vh] items-center justify-center">
            <div className="w-full max-w-md rounded-3xl border bg-white p-8">
                <h1 className="text-2xl font-semibold">
                    Aktywuj szkołę
                </h1>

                <p className="mt-3 text-sm text-muted-foreground">
                    To jest tymczasowy krok testowy. Później w tym
                    miejscu będzie płatność RevenueCat.
                </p>

                <form
                    action={activateSchoolTestAction}
                    className="mt-8"
                >
                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Aktywuj testowo
                    </Button>
                </form>
            </div>
        </main>
    );
}