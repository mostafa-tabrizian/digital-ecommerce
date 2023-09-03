import { NextResponse } from 'next/server'
import Coupon from '@/models/coupon'

export async function POST(req: Request) {

   const { code } = await req.json()

   const coupon = await Coupon.findOne({
      code: code
   })


   return NextResponse.json(coupon)
}
