import { CourseLocation } from '@prisma/client'

import { NextResponse } from 'next/server'

export async function PATCH(request: Request) {
   const payload = await request.json()

   let price, discount, qty

   if (payload.price) price = parseInt(payload.price)
   if (payload.discount) discount = parseInt(payload.discount)
   if (payload.qty) qty = parseInt(payload.qty)

   const location = await prisma.courseLocation
      .update({
         where: {
            id: payload.id,
         },
         data: {
            price: price,
            discount: discount,
            quantity: qty,
         },
      })
      .then((res: CourseLocation) => {
         return res
      })

   return NextResponse.json(location)
}
