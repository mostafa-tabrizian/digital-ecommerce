// import { Course } from '@prisma/client'
//

import dbConnect from '@/lib/dbConnect'
import Course from '@/models/course'

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'

export async function GET() {
   await dbConnect()

   const courses = await Course.find()

   return NextResponse.json(courses)
}

// export async function POST(request: Request) {

//    const p = await request.json()

//    await dbConnect()

//    const courses = await Course.find()

//    return NextResponse.json(courses)
// }

// export async function PATCH(request: Request) {
//    const session: { email: string; role: string } | null = await getServerSession(authOptions) // ! try lib
//    const reqData = await request.json()

//    //  @ts-ignore
//    if (!session?.role == 'ADMIN') return

//    try {
//       const course: Course | null = await prisma.course.update({
//          where: {
//             id: reqData.id,
//          },
//          data: reqData.data,
//       })

//       return NextResponse.json(course)
//    } catch (err) {
//       console.error('err api/course/update', err)
//       NextResponse.error()
//    }
// }
