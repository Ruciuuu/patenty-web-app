import { NextResponse } from 'next/server'
import { getSchoolStudents } from '@/lib/school/get-school-students'


export async function GET() {
    const result = await getSchoolStudents()

  /*   if (!result.user) {
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
    } */

    return NextResponse.json({
        result
    })
}