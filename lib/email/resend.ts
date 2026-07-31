import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

type SendStudentInvitationParams = {
    email: string
    firstName: string
    schoolName: string
    invitationCode: string
}

export async function sendStudentInvitation({
    email,
    firstName,
    schoolName,
    invitationCode,
}: SendStudentInvitationParams) {
    const from = process.env.RESEND_FROM_EMAIL

    if (!from) {
        throw new Error('Missing RESEND_FROM_EMAIL')
    }

    const { data, error } = await resend.emails.send({
        from,
        to: email,
        subject: `Zaproszenie od ${schoolName}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
                <h2>Cześć ${firstName}!</h2>

                <p>
                    Szkoła <strong>${schoolName}</strong>
                    zaprosiła Cię do aplikacji.
                </p>

                <p>Twój kod aktywacyjny:</p>

                <div style="
                    font-size: 32px;
                    font-weight: 700;
                    letter-spacing: 6px;
                    margin: 24px 0;
                ">
                    ${invitationCode}
                </div>

                <p>
                    Pobierz aplikację i użyj swojego adresu e-mail
                    oraz powyższego kodu, aby aktywować konto.
                </p>

                <p>
                    Zaproszenie jest ważne przez 7 dni.
                </p>
            </div>
        `,
    })

    if (error) {
        throw new Error(error.message)
    }

    return data
}