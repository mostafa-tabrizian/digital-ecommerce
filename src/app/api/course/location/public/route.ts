import { CourseLocation } from '@prisma/client'

import { NextResponse } from 'next/server'

export async function PATCH(request: Request) {
   const payload = await request.json()

   const location = await prisma.courseLocation
      .update({
         where: {
            id: payload.id,
         },
         data: {
            public: {
               set: payload.public,
            },
         },
      })
      .then((res: CourseLocation) => {
         return res
      })

   return NextResponse.json(location)
}
