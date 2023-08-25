import { hashSync, genSaltSync } from 'bcryptjs'
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/user'

export async function POST(req: Request) {
   try {
      await dbConnect()

      const { mobileNumber, password } = (await req.json()) as {
         mobileNumber: string
         password: string
      }

      const hashedPassword = hashSync(password, genSaltSync(10))

      const user = await User.create({
         mobileNumber: mobileNumber.toLowerCase(),
         password: hashedPassword,
      })

      return NextResponse.json({
         user: {
            mobileNumber: user.mobileNumber,
         },
      })
   } catch (error) {
      // @ts-ignore
      return NextResponse.json({ status: 500, message: error.message })
   }
}
