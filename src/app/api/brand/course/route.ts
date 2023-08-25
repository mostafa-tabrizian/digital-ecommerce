import { Course } from '@prisma/client'

import { NextResponse } from 'next/server'

type Brand = { courses: Course[] } | null

export async function POST(request: Request) {
   const payload: { name: string } = await request.json()
   const courses = await prisma.brand
      .findFirst({
         where: {
            name: {
               equals: payload.name,
               mode: 'insensitive',
            },
         },
         select: {
            courses: {
               include: {
                  courseLocation: {
                     where: {
                        public: {
                           equals: true,
                        },
                        quantity: {
                           gt: 0,
                        },
                     },
                     include: {
                        color: {
                           select: {
                              color: true,
                           },
                        },
                        size: {
                           select: {
                              size: true,
                           },
                        },
                     },
                  },
                  gallery: {
                     select: {
                        src: true,
                        alt: true,
                     },
                  },
               },
            },
         },
      })
      .then((res: Brand) => res)
      .catch((err: Error) => console.error('err courses api', err))

   return NextResponse.json(courses)
}
