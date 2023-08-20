'use client'

import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import { useState } from 'react'

const CourseFAQ = () => {
   const [expanded, setExpanded] = useState<string | false>(false)

   const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
   }

   return (
      <div className='bg-white rtl rounded-xl mt-6 p-3 lg:p-6'>
         <h2 className='text-2xl text-right text-blue-600 mb-5'>سوالات متداول</h2>

         <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
               //    expandIcon={<ExpandMoreIcon />}
               aria-controls='panel1bh-content'
               id='panel1bh-header'
            >
               <div className='flex w-full items-center justify-between'>
                  <div className='flex gap-2 items-center text-gray-700'>
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 16 16'
                        fill='none'
                        className='w-5 h-5 ml-1'
                     >
                        <path
                           stroke='currentColor'
                           strokeWidth='1.125'
                           d='M6.713 15.485a5.634 5.634 0 0 1-4.198-4.198 10.015 10.015 0 0 1 0-4.574 5.634 5.634 0 0 1 4.198-4.198 10.015 10.015 0 0 1 4.574 0 5.634 5.634 0 0 1 4.198 4.198 10.01 10.01 0 0 1 0 4.574 5.634 5.634 0 0 1-4.198 4.198 10.01 10.01 0 0 1-4.574 0Z'
                        ></path>
                        <circle cx='9' cy='11.625' r='0.75' fill='currentColor'></circle>
                        <path
                           stroke='currentColor'
                           strokeLinecap='round'
                           strokeLinejoin='round'
                           strokeWidth='1.125'
                           d='M7.5 7.5v-.375a1.5 1.5 0 0 1 1.5-1.5v0a1.5 1.5 0 0 1 1.5 1.5v.091c0 .422-.168.827-.466 1.125L9 9.375'
                        ></path>
                     </svg>
                     <span className='flex items-center font-bold text-sm lg:text-base'>
                        دقیقا چیست ؟ Next.js
                     </span>
                  </div>
                  <div>
                     <svg
                        stroke='currentColor'
                        fill='none'
                        strokeWidth='0'
                        viewBox='0 0 24 24'
                        className='text-gray-700'
                        height='1em'
                        width='1em'
                        xmlns='http://www.w3.org/2000/svg'
                     >
                        <path
                           strokeLinecap='round'
                           strokeLinejoin='round'
                           strokeWidth='2'
                           d='M19 9l-7 7-7-7'
                        ></path>
                     </svg>
                  </div>
               </div>
            </AccordionSummary>
            <AccordionDetails>
               <p className='text-sm lg:text-base text-gray-700 leading-6 lg:leading-8 mb-2'>
                  Next.js یک فریمورک فول استک متنبی بر ریکت برای تولید بهینه تر اپلیکیشن های تحت وب
                  هست. بله نکست جی اس هم فریمورک هست و هم فول استک!
               </p>
            </AccordionDetails>
         </Accordion>
      </div>
   )
}

export default CourseFAQ
