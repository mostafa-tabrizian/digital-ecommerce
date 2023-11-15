// import { Course } from '@prisma/client'

// import { NextResponse } from 'next/server'

export async function POST(request: Request) {
//    const payload: { title: string } = await request.json()

//    const searchResult = await prisma.course
//       .findMany({
//          where: {
//             OR: [
//                {
//                   title: {
//                      contains: payload.title,
//                      mode: 'insensitive',
//                   },
//                },
//                {
//                   brand: {
//                      name: {
//                         contains: payload.title,
//                         mode: 'insensitive',
//                      },
//                   },
//                },
//             ],
//          },
//          include: {
//             brand: {
//                select: {
//                   name: true,
//                },
//             },
//             courseLocation: {
//                where: {
//                   public: {
//                      equals: true,
//                   },
//                   quantity: {
//                      gt: 0,
//                   },
//                },
//                include: {
//                   color: {
//                      select: {
//                         color: true,
//                      },
//                   },
//                   size: {
//                      select: {
//                         size: true,
//                      },
//                   },
//                },
//             },
//             gallery: {
//                select: {
//                   src: true,
//                   alt: true,
//                },
//             },
//          },
//       })
//       .then((res: Course[]) => res)
//       .catch((err: Error) => console.error('err courses api', err))

//    return NextResponse.json(searchResult)
}
