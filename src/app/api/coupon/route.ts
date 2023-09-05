import { NextResponse } from 'next/server'
import Coupon from '@/models/coupon'
import RecaptchaCheck from '@/lib/recaptchCheck';

export async function POST(req: Request) {

   const { code, gReCaptchaToken }: { code: string, gReCaptchaToken: string } = await req.json()

   const recaptchaRes = await RecaptchaCheck(gReCaptchaToken)
   if (!recaptchaRes) return NextResponse.json({ message: 'recaptcha fail' })

   const coupon = await Coupon.findOne({
      code: code
   })

   return NextResponse.json(coupon)
}
