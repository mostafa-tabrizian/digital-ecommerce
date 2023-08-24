import { NextResponse } from 'next/server'

import { Order } from '@prisma/client'

export async function PATCH(request: Request) {
   const payload = await request.json()

   try {
      const order: Order = await prisma.order.update({
         where: {
            id: payload.id,
         },
         data: {
            trackingCode: payload.code,
         },
      })

      return NextResponse.json({
         order,
      })
   } catch (err) {
      console.error('err api/order/trackingCode', err)

      return NextResponse.json({
         statue: 500,
         undefined,
      })
   }
}
