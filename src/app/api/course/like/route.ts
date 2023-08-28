import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

import authOptions from '@/lib/auth'
import Course, { ICourse } from '@/models/course'

export async function POST(req: Request) {
    const { courseId } = (await req.json()) as {
        courseId: string
    }

    const session: { _doc: { _id: string } } | null = await getServerSession(authOptions)

    if (!session) return

    const course = await Course.findOne({
        _id: courseId
    }).exec()
        .then((res: ICourse) => res)

    const userId = session._doc._id

    // @ts-ignore
    if (course.likes.includes(userId)) {
        // @ts-ignore
        const index = course.likes.indexOf(userId)
        course.likes.splice(index, 1)
        console.log(course);
        // @ts-ignore
        course.save()

    } else {
        // @ts-ignore
        course.likes.push(userId)
        // @ts-ignore
        course.save()
    }


    return NextResponse.json({ message: 'like submitted.' })
}

// export async function PATCH(request: Request) {
//     const session: { _doc: { mobileNumber: string } } | null = await getServerSession(authOptions)
//     const payload = await request.json()

//     if (!session) return

//     try {
//         const user = await User.findOneAndUpdate(
//             { mobileNumber: session._doc.mobileNumber },
//             { name: payload.name }
//         )

//         const { password: _, ...filteredUser } = user._doc

//         return NextResponse.json(filteredUser)
//     } catch (err) {
//         console.error('err api/user', err)

//         return NextResponse.json({
//             statue: 500,
//             undefined,
//         })
//     }
// }
