import { NextResponse } from 'next/server'
import { getCurrentSchool } from '@/lib/school/get-current-school'

export async function GET() {
    const result = await getCurrentSchool()

    if (!result.user) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 },
        )
    }
    console.log(result.error)

    if (result.error) {
        return NextResponse.json(
            { error: result.error.message },
            { status: 500 },
        )
    }

    return NextResponse.json({
        membership: result.membership,
        school: result.school,
    })
}