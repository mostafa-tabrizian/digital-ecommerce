'use client'

import toFarsiNumber from '@/lib/toFarsiNumber'
import { ICourse } from '@/models/course'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import { useState } from 'react'

const CourseSession = ({ chapters }: { chapters: ICourse['chapters'] }) => {
   const [expanded, setExpanded] = useState<string | false>(false)

   const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
   }

   return (
      <div id='sessions' className='bg-white rtl font-semibold rounded-xl mt-6 p-3 lg:p-6'>
         <h2 className='text-2xl text-right text-blue-600 mb-5'>جلسات دوره</h2>

         {chapters.map((chapter) => {
            return (
               <Accordion
                  key={chapter._id}
                  expanded={expanded === chapter._id}
                  onChange={handleChange(chapter._id)}
               >
                  <AccordionSummary
                     //    expandIcon={<ExpandMoreIcon />}
                     aria-controls={chapter.name}
                     id={chapter.name}
                  >
                     <div className='w-full flex justify-between'>
                        <p className='text-xs text-slate-600'>{chapter.name}</p>
                        <span className='text-blue-600 bg-blue-300/20 px-2 rounded-xl'>
                           {toFarsiNumber(chapter.parts.length)} جلسه
                        </span>
                     </div>
                  </AccordionSummary>
                  {chapter.parts.map((part, index) => {
                     return (
                        <AccordionDetails key={part._id}>
                           <div className='mb-4 lg:mb-5 border border-secondary-100/30 rounded-xl p-2 hover:shadow-lg bg-gray-50 hover:shadow-gray-200 transition duration-200 ease-in'>
                              <div className='flex items-center justify-between flex-wrap'>
                                 <div className='flex items-center'>
                                    <span className='ml-1.5 rounded-full lg:w-8 lg:h-8 flex justify-center items-center text-xs lg:text-sm w-5 h-5 bg-green-100 text-green-500'>
                                       {toFarsiNumber(index + 1)}
                                    </span>
                                    <span className='text-[11px] lg:text-[15px] text-gray-700 flex-shrink-0 flex items-center'>
                                       <span>{part.name}</span>
                                    </span>
                                 </div>
                                 <div className='text-slate-500 flex items-center gap-x-0.5 justify-end'>
                                    <span className='bg-green-100 text-green-500 mr-1 flex items-center justify-center rounded-full p-1'>
                                       <svg
                                          stroke='currentColor'
                                          fill='currentColor'
                                          strokeWidth='0'
                                          viewBox='0 0 24 24'
                                          aria-hidden='true'
                                          className='w-3.5 h-3.5'
                                          height='1em'
                                          width='1em'
                                          xmlns='http://www.w3.org/2000/svg'
                                       >
                                          <path d='M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 01-1.5 0V6.75a3.75 3.75 0 10-7.5 0v3a3 3 0 013 3v6.75a3 3 0 01-3 3H3.75a3 3 0 01-3-3v-6.75a3 3 0 013-3h9v-3c0-2.9 2.35-5.25 5.25-5.25z'></path>
                                       </svg>
                                    </span>
                                    <svg
                                       xmlns='http://www.w3.org/2000/svg'
                                       viewBox='0 0 24 24'
                                       fill='none'
                                       className='w-4 h-4'
                                    >
                                       <path
                                          stroke='currentColor'
                                          strokeWidth='1.5'
                                          d='M3.353 8.95A7.511 7.511 0 0 1 8.95 3.353c2.006-.47 4.094-.47 6.1 0a7.511 7.511 0 0 1 5.597 5.597c.47 2.006.47 4.094 0 6.1a7.511 7.511 0 0 1-5.597 5.597c-2.006.47-4.094.47-6.1 0a7.511 7.511 0 0 1-5.597-5.597 13.354 13.354 0 0 1 0-6.1Z'
                                       ></path>
                                       <path
                                          stroke='currentColor'
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                          strokeWidth='1.5'
                                          d='m14.5 14.5-2.839-1.806V9'
                                       ></path>
                                    </svg>
                                    <span className='text-[10px] flex'>
                                       <strong className='block md:hidden'>′</strong>
                                       <span className='mr-1 hidden md:block'>دقیقه</span>
                                       {toFarsiNumber(part.length)}
                                    </span>
                                 </div>
                              </div>
                              <div className='mt-2 lg:mt-3 flex items-center justify-between'>
                                 <button className='bg-gray-500 bg-opacity-10 hover:bg-opacity-90 hover:text-white transition-all duration-300 ease-in text-gray-500 flex items-center gap-x-1 text-[11px] px-1.5 py-1 rounded-lg lg:text-xs font-bold lg:px-2 lg:py-1 lg:rounded-xl'>
                                    <svg
                                       stroke='currentColor'
                                       fill='none'
                                       strokeWidth='0'
                                       viewBox='0 0 24 24'
                                       className='w-4 h-4'
                                       height='1em'
                                       width='1em'
                                       xmlns='http://www.w3.org/2000/svg'
                                    >
                                       <path
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                          strokeWidth='2'
                                          d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                                       ></path>
                                       <path
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                          strokeWidth='2'
                                          d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                       ></path>
                                    </svg>
                                    <span className='text-inherit'>مشاهده ویدیو</span>
                                 </button>
                                 <a
                                    // download=''
                                    href='#'
                                    className='bg-gray-500 bg-opacity-10 hover:bg-opacity-90 hover:text-white transition-all duration-300 ease-in text-gray-500 flex items-center gap-x-1 text-[11px] px-1.5 py-1 rounded-lg lg:text-xs font-bold lg:px-2 lg:py-1 lg:rounded-xl'
                                 >
                                    <svg
                                       stroke='currentColor'
                                       fill='currentColor'
                                       strokeWidth='0'
                                       viewBox='0 0 24 24'
                                       className='w-4 h-4'
                                       height='1em'
                                       width='1em'
                                       xmlns='http://www.w3.org/2000/svg'
                                    >
                                       <path d='M18.948 11.112C18.511 7.67 15.563 5 12.004 5c-2.756 0-5.15 1.611-6.243 4.15-2.148.642-3.757 2.67-3.757 4.85 0 2.757 2.243 5 5 5h1v-2h-1c-1.654 0-3-1.346-3-3 0-1.404 1.199-2.757 2.673-3.016l.581-.102.192-.558C8.153 8.273 9.898 7 12.004 7c2.757 0 5 2.243 5 5v1h1c1.103 0 2 .897 2 2s-.897 2-2 2h-2v2h2c2.206 0 4-1.794 4-4a4.008 4.008 0 0 0-3.056-3.888z'></path>
                                       <path d='M13.004 14v-4h-2v4h-3l4 5 4-5z'></path>
                                    </svg>
                                    <span className='text-inherit'>دانلود ویدیو</span>
                                 </a>
                              </div>
                           </div>
                        </AccordionDetails>
                     )
                  })}
               </Accordion>
            )
         })}
      </div>
   )
}

export default CourseSession
