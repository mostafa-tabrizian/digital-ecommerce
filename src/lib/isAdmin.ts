import { getServerSession } from 'next-auth'

import authOptions from '@/lib/auth'
import User from '@/models/user'

const isAdmin = async () => {
   const session: { _doc: { mobileNumber: string } } | null = await getServerSession(authOptions)

   if (!session) return null

   const user = await User.findOne({
      mobileNumber: session._doc.mobileNumber
   }, 'role').exec()

   return user.role === 'ADMIN' ? true : false
}

export default isAdmin
