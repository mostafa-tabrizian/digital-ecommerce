import { hashSync, genSaltSync, compareSync } from 'bcryptjs'
import { NextResponse } from 'next/server'
import User from '@/models/user'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'

export async function POST(req: Request) {
   try {
      const { oldPass, newPass } = (await req.json()) as {
         oldPass: string
         newPass: string
      }

      const session: { _doc: { _id: string } } | null = await getServerSession(authOptions)

      if (!session) return NextResponse.json({ status: 403 })

      const user = await User.findOne({
         _id: session._doc._id
      })
      
      const passwordMatched = compareSync(oldPass, user.password)

      if (!passwordMatched) return NextResponse.json({
         message: 'password dont match'
     })

      const hashedNewPassword = hashSync(newPass, genSaltSync(10))

      user.password = hashedNewPassword

      user.save()

      return NextResponse.json({
         message: 'password changed'
      })
   } catch (error) {
      // @ts-ignore
      return NextResponse.json({ status: 500 })
   }
}
