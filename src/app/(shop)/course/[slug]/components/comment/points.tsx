'use client'

import Chip from '@mui/material/Chip'
import { useState } from 'react'

// @ts-ignore
const Points = ({ setFieldValue }) => {
   const [positivePoints, setPositivePoints] = useState<string[]>([])
   const [negativePoints, setNegativePoints] = useState<string[]>([])

// @ts-ignore
   const handleSubmitPositive = (e) => {
      if (e.key == 'Enter') {
         const value = e.target.value.trim()

         if (!value.length) return
         if (positivePoints.find((prev) => prev == value)) return

         setPositivePoints((points) => {
            // @ts-ignore
            points.push(value)
            setFieldValue('positivePoints', points)
            // @ts-ignore
            e.target.value = ''
            return points
         })

         e.preventDefault()
      }
   }

// @ts-ignore
   const handleSubmitNegative = (e) => {
      if (e.key == 'Enter') {
         const value = e.target.value.trim()

         if (!value.length) return
         if (negativePoints.find((prev) => prev == value)) return

         setNegativePoints((points) => {
            // @ts-ignore
            points.push(value)
            setFieldValue('negativePoints', points)
            // @ts-ignore
            e.target.value = ''
            return points
         })

         e.preventDefault()
      }
   }

   const handleDeletePositive = (pointToDelete: string) => () => {
      setPositivePoints((points) => points.filter((point) => point !== pointToDelete))
   }

   const handleDeleteNegative = (pointToDelete: string) => () => {
      setNegativePoints((points) => points.filter((point) => point !== pointToDelete))
   }

   const deleteIcon = (
      <button type='button'>
         <svg
            className='h-4 w-4 mr-1 cursor-pointer hover:text-rose-500 text-slate-600'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
         >
            {' '}
            <path stroke='none' d='M0 0h24v24H0z' /> <line x1='18' y1='6' x2='6' y2='18' />{' '}
            <line x1='6' y1='6' x2='18' y2='18' />
         </svg>
      </button>
   )

   return (
      <>
         <div>
            <label>
               <h6>نکات مثبت</h6>
            </label>
            <div className='bg-[#f3f4f6] items-center flex flex-wrap gap-3 p-2 rounded-lg'>
               <div className='ltr gap-1 flex-wrap flex'>
                  {positivePoints.map((point) => {
                     return (
                        <Chip
                           deleteIcon={deleteIcon}
                           key={point}
                           label={point}
                           onDelete={handleDeletePositive(point)}
                        />
                     )
                  })}
               </div>

               <input
                  className='bg-white placeholder:text-slate-400 focus:shadow-xl focus:shadow-blue-700/20 transition-all focus:border-blue-300 outline-none text-sm rounded-lg px-2 py-1'
                  type='text'
                  placeholder='بنویس و اینتر بزن'
                  onKeyDown={(e) => {
                     handleSubmitPositive(e)
                  }}
               />
            </div>
         </div>

         <div>
            <label>
               <h6>نکات منفی</h6>
            </label>
            <div className='bg-[#f3f4f6] items-center flex flex-wrap gap-3 p-2 rounded-lg'>
               <div className='ltr gap-1 flex-wrap flex'>
                  {negativePoints.map((point) => {
                     return (
                        <Chip
                           deleteIcon={deleteIcon}
                           key={point}
                           label={point}
                           onDelete={handleDeleteNegative(point)}
                        />
                     )
                  })}
               </div>

               <input
                  className='bg-white placeholder:text-slate-400 focus:shadow-xl focus:shadow-blue-700/20 transition-all focus:border-blue-300 outline-none text-sm rounded-lg px-2 py-1'
                  type='text'
                  placeholder='بنویس و اینتر بزن'
                  onKeyDown={(e) => {
                     handleSubmitNegative(e)
                  }}
               />
            </div>
         </div>
      </>
   )
}

export default Points
