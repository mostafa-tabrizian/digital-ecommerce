import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

import authOptions from '@/lib/auth'
import User, { IUser } from '@/models/user'

export async function GET() {
   const session: { _doc: { mobileNumber: string } } | null = await getServerSession(authOptions)

   if (!session) return

   const user = await User.findOne({
      mobileNumber: session._doc.mobileNumber
   }, 'name').exec()
      .then((res: IUser) => res)

   return NextResponse.json(user)
}

export async function PATCH(request: Request) {
   const session: { _doc: { mobileNumber: string } } | null = await getServerSession(authOptions)
   const payload = await request.json()

   if (!session) return

   try {
      const user = await User.findOneAndUpdate(
         { mobileNumber: session._doc.mobileNumber },
         { name: payload.name }
      )
      
      const { password: _, ...filteredUser } = user._doc

      return NextResponse.json(filteredUser)
   } catch (err) {
      console.error('err api/user', err)

      return NextResponse.json({
         statue: 500,
         undefined,
      })
   }
}
