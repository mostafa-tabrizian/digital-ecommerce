'use client'

import CircularProgress from '@mui/material/CircularProgress'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

const LogoutButton = () => {
   const [loading, setLoading] = useState(false)

   const submitLogout = () => {
      setLoading(true)
      signOut({ callbackUrl: '/' })
   }

   return (
      <>
         {loading ? (
            <CircularProgress className='text-rose-600' color='inherit' size={24} />
         ) : (
            <button
               className='border-2 border-rose-400 hover:shadow-lg hover:shadow-rose-100 transition-all hover:border-rose-600 rounded-xl text-center w-full'
               disabled={loading}
               onClick={() => submitLogout()}
            >
               <span className='font-bold text-sm'>خروج</span>
            </button>
         )}
      </>
   )
}

export default LogoutButton
