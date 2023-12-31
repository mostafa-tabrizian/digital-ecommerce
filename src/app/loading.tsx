'use client'

import LoadingBar from 'react-top-loading-bar'
import { useEffect, useState } from 'react'

const LoadingHome = () => {
   const [progress, setProgress] = useState(0)

   useEffect(() => {
      let innerProgress = 0

      const interval = setInterval(() => {
         if (innerProgress >= 100) clearInterval(interval)

         innerProgress += 2
         setProgress((prev) => prev + 2)
      }, 100)
   }, [])

   return (
      <>
         <LoadingBar
            color='#2495ff'
            height={5}
            progress={progress}
            waitingTime={400}
            onLoaderFinished={() => {
               setProgress(0)
            }}
         />
         <div className='mx-6 my-16 md:mx-auto animate-pulse max-w-screen-md space-y-4'>
            <div className='w-full h-40 bg-gray-200 rounded'></div>
            <div className='w-full h-20 bg-gray-200 rounded'></div>
            <div className='w-full h-10 bg-gray-200 rounded'></div>

            <div className='grid grid-cols-2'>
               <div className='w-45 h-40 bg-gray-200 mr-3 mb-3 rounded'></div>
               <div className='w-45 h-40 bg-gray-200 mb-3 rounded'></div>
               <div className='w-45 h-40 bg-gray-200 mr-3 rounded'></div>
               <div className='w-45 h-40 bg-gray-200 rounded'></div>
            </div>
         </div>
      </>
   )
}

export default LoadingHome
