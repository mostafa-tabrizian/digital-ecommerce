import { getServerSession } from 'next-auth'
import User, { IUser } from '@/models/user'
import dbConnect from '@/lib/dbConnect'

import authOptions from './auth'

const UserDetail = async () => {
   const session: { _doc: { mobileNumber: string } } | null = await getServerSession(authOptions)

   if (!session) return null

   await dbConnect()

   return await User.findOne({
      mobileNumber: session._doc.mobileNumber
   }).exec()
      .then((user: { _doc: IUser }) => {
         const { password, ...filteredUser } = user._doc
         return filteredUser
      })
}

export default UserDetail
