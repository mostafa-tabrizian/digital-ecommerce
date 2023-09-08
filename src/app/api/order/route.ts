import authOptions from '@/lib/auth'

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import Order from '@/models/order'
import dbConnect from '@/lib/dbConnect'
import RecaptchaCheck from '@/lib/recaptchCheck'

type PayloadType = {
   price: number
   discount: number,
   coupon: number,
   items: string[],
   gReCaptchaToken: string
}

// export async function GET() {
//    try {
//       const res = await prisma.order.findMany({
//          include: {
//             client: true,
//             items: {
//                include: {
//                   item: {
//                      include: {
//                         course: {
//                            include: {
//                               gallery: true,
//                            },
//                         },
//                         color: true,
//                         size: true,
//                      },
//                   },
//                },
//             },
//          },
//       })
//       return NextResponse.json(res)
//    } catch (err) {
//       console.error('api/brand err:', err)
//       return NextResponse.json(err)
//    }
// }

export async function POST(request: Request) {
   try {
      const { price, discount, coupon, items, gReCaptchaToken }: PayloadType = await request.json()

      const recaptchaRes = await RecaptchaCheck(gReCaptchaToken)
      if (!recaptchaRes) return NextResponse.json({ message: 'recaptcha fail' })

      const session: { _doc: { _id: string } } | null = await getServerSession(authOptions)
      if (!session) return NextResponse.json({ status: 403 })

      dbConnect()
      const order = await Order.create({
         user: session._doc._id,
         price: price,
         discount: discount,
         coupon: coupon,
         items: items
      })

      return NextResponse.json({
         _id: order._id,
         message: 'order submitted'
      })
   } catch (err) {
      return NextResponse.json({ status: 500 })
   }
}
