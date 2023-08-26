'use client'

import toFarsiNumber from '@/lib/toFarsiNumber'
import { useState, useEffect } from 'react'

const VerificationCountdown = ({ verificationAgain }: {verificationAgain: () => void}) => {
   const [verificationTries, setVerificationTries] = useState(1)
   const [countdown, setCountdown] = useState(120)

   useEffect(() => {
      let countdownValue = countdown
      const interval = setInterval(() => {
         if (!countdownValue) clearInterval(interval)

         setCountdown((prev) => prev - 1)
         countdownValue -= 1
      }, 1000)
   }, [verificationTries])

   return (
      <div>
         {countdown >= 0 ? (
            <span className='text-xs text-slate-400'>ارسال مجدد کد تا {toFarsiNumber(countdown)} ثانیه دیگر</span>
         ) : (
            <button
               onClick={() => {
                  setCountdown(120)
                  setVerificationTries((prev) => prev + 1)
                  verificationAgain()
               }}
            >
               <span className='text-xs text-slate-400'>دریافت مجدد کد</span>
            </button>
         )}
      </div>
   )
}

export default VerificationCountdown
