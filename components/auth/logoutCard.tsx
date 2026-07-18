/* 




function LogoutCard({
    isLoggingOut,
    onLogout,
}: {
    isLoggingOut: boolean
    onLogout: () => void
}) {
    return (
        <Card className="rounded-[30px] border-red-100 bg-white shadow-[0_16px_50px_rgba(33,78,110,0.05)]">
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                        <LogOut className="size-6" />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-[#163A59]">Konto</h2>
                        <p className="mt-1 leading-6 text-[#7C98AB]">
                            Zakończ bieżącą sesję w panelu administracyjnym.
                        </p>
                    </div>
                </div>

                <AlertDialog>
                    <AlertDialogTrigger >
                        <Button
                            variant="outline"
                            className="mt-6 h-12 w-full rounded-2xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                            <LogOut className="mr-2 size-5" />
                            Wyloguj się
                        </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="rounded-[28px] border-[#DDECF2]">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-[#163A59]">
                                Wylogować się?
                            </AlertDialogTitle>

                            <AlertDialogDescription className="leading-6 text-[#68859A]">
                                Bieżąca sesja zostanie zakończona. Aby ponownie wejść do panelu,
                                trzeba będzie podać adres e-mail i hasło.
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-xl">
                                Zostań
                            </AlertDialogCancel>

                            <AlertDialogAction
                                onClick={onLogout}
                                disabled={isLoggingOut}
                                className="rounded-xl bg-red-600 text-white hover:bg-red-700"
                            >
                                {isLoggingOut ? (
                                    <>
                                        <Loader2 className="mr-2 size-4 animate-spin" />
                                        Wylogowywanie...
                                    </>
                                ) : (
                                    'Wyloguj się'
                                )}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardContent>
        </Card>
    )
}
 */