import Image from 'next/legacy/image'
import RatingCourse from './components/rating'
import Comments from './components/comments'
import Like from './components/like'
import CourseSession from './components/courseSession'
import CourseFAQ from './components/courseFAQ'
import SwiperComments from '../../components/swiperComment'
import Questions from './components/questions'
import AddToCart from './components/addToCart'

import dbConnect from '@/lib/dbConnect'
import Course, { ICourse } from '@/models/course'
import toFarsiNumber from '@/lib/toFarsiNumber'

const getCourse = async (slug: string) => {
   await dbConnect()

   return await Course.findOne({
      name: decodeURI(slug)
   }).exec()
}

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
   const course = await getCourse(params.slug)

   return {
      title: (course?.name || 'محصولی یافت نشد!') + ' | تبریزیان دیجیتال ایکامرس',
   }
}

const CourseDetail = async ({ params }: { params: { slug: string } }) => {
   const course: ICourse = await getCourse(params.slug)

   const partsCount = () => {
      let totalCount = 0
      course.chapters.map((chapter) => {
         totalCount += chapter.parts.length
      })

      return toFarsiNumber(totalCount)
   }

   const courseLength = () => {
      let totalLength = 0
      course.chapters.map((chapter) => {
         chapter.parts.map((part) => {
            totalLength += part.length
         })
      })

      const hours = toFarsiNumber(String(Math.floor(totalLength / 60)).padStart(2, '0'))
      const minutes = toFarsiNumber(String(totalLength % 60).padStart(2, '0'))
      const format = `${hours}:${minutes}:۰۰`

      return toFarsiNumber(format)
   }

   return (
      <div className='m-3'>
         <div className='bg-white space-y-8 my-10 py-5 px-4 rounded-xl'>
            <div className='text-right'>
               <h1 className='text-slate-800 rtl font-extraBlack text-2xl mb-2'>{course?.name}</h1>
               <p className='text-slate-600 text-sm md:text-base leading-7 font-bold md:leading-8 mb-7'>
                  {course?.description}
               </p>
            </div>
            <div className='flex flex-col lg:justify-between lg:flex-row'>
               <div className='flex justify-between lg:justify-start lg:gap-x-20 items-center'>
                  <div className='flex flex-col items-center gap-y-3'>
                     <div className='p-4 lg:p-[17px] rounded-full shadow-2xl shadow-blue-700 relative flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16'>
                        <svg
                           viewBox='0 0 74 74'
                           fill='none'
                           xmlns='http://www.w3.org/2000/svg'
                           className='w-full h-full top-0 left-0 absolute'
                        >
                           <path
                              d='M73.302 36.65c0 24.435-12.217 36.652-36.651 36.652C12.217 73.302 0 61.085 0 36.65 0 12.217 12.217 0 36.65 0c24.435 0 36.652 12.217 36.652 36.65Z'
                              fill='url(#warranty-holder_svg__a)'
                           ></path>
                           <defs>
                              <linearGradient
                                 id='warranty-holder_svg__a'
                                 x1='0.099'
                                 y1='0'
                                 x2='73.212'
                                 y2='73.413'
                                 gradientUnits='userSpaceOnUse'
                              >
                                 <stop stopColor='#7EB5F9'></stop>
                                 <stop offset='1' stopColor='#6475FF'></stop>
                              </linearGradient>
                           </defs>
                        </svg>
                        <svg
                           stroke='currentColor'
                           fill='none'
                           strokeWidth='2'
                           viewBox='0 0 24 24'
                           strokeLinecap='round'
                           strokeLinejoin='round'
                           className='text-white z-10 w-7 h-7'
                           height='1em'
                           width='1em'
                           xmlns='http://www.w3.org/2000/svg'
                        >
                           <desc></desc>
                           <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                           <circle cx='9' cy='7' r='4'></circle>
                           <path d='M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2'></path>
                           <path d='M16 3.13a4 4 0 0 1 0 7.75'></path>
                           <path d='M21 21v-2a4 4 0 0 0 -3 -3.85'></path>
                        </svg>
                     </div>
                     <div className='flex gap-1'>
                        <span className='text-gray-700 font-bold'>دانشجو</span>
                        <span className='text-gray-700 font-bold'>
                           {course?.purchaser.length.toLocaleString('per')}
                        </span>
                     </div>
                  </div>
                  <div className='flex flex-col items-center gap-y-3'>
                     <div className='p-4 lg:p-[17px] rounded-full shadow-2xl shadow-blue-700 relative flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16'>
                        <svg
                           viewBox='0 0 74 74'
                           fill='none'
                           xmlns='http://www.w3.org/2000/svg'
                           className='w-full h-full top-0 left-0 absolute'
                        >
                           <path
                              d='M73.302 36.65c0 24.435-12.217 36.652-36.651 36.652C12.217 73.302 0 61.085 0 36.65 0 12.217 12.217 0 36.65 0c24.435 0 36.652 12.217 36.652 36.65Z'
                              fill='url(#warranty-holder_svg__a)'
                           ></path>
                           <defs>
                              <linearGradient
                                 id='warranty-holder_svg__a'
                                 x1='0.099'
                                 y1='0'
                                 x2='73.212'
                                 y2='73.413'
                                 gradientUnits='userSpaceOnUse'
                              >
                                 <stop stopColor='#7EB5F9'></stop>
                                 <stop offset='1' stopColor='#6475FF'></stop>
                              </linearGradient>
                           </defs>
                        </svg>
                        <svg
                           stroke='currentColor'
                           fill='currentColor'
                           strokeWidth='0'
                           viewBox='0 0 20 20'
                           className='text-white z-10 h-7 w-7'
                           height='1em'
                           width='1em'
                           xmlns='http://www.w3.org/2000/svg'
                        >
                           <path
                              fillRule='evenodd'
                              d='M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z'
                              clipRule='evenodd'
                           ></path>
                        </svg>
                     </div>
                     <div className='flex gap-1'>
                        <span className='text-gray-700 font-bold'>جلسه</span>
                        <span className='text-gray-700 font-bold'>{partsCount()}</span>
                     </div>
                  </div>
                  <div className='flex flex-col items-center gap-y-3'>
                     <div className='p-4 lg:p-[17px] rounded-full shadow-2xl shadow-blue-700 relative flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16'>
                        <svg
                           viewBox='0 0 74 74'
                           fill='none'
                           xmlns='http://www.w3.org/2000/svg'
                           className='w-full h-full top-0 left-0 absolute'
                        >
                           <path
                              d='M73.302 36.65c0 24.435-12.217 36.652-36.651 36.652C12.217 73.302 0 61.085 0 36.65 0 12.217 12.217 0 36.65 0c24.435 0 36.652 12.217 36.652 36.65Z'
                              fill='url(#warranty-holder_svg__a)'
                           ></path>
                           <defs>
                              <linearGradient
                                 id='warranty-holder_svg__a'
                                 x1='0.099'
                                 y1='0'
                                 x2='73.212'
                                 y2='73.413'
                                 gradientUnits='userSpaceOnUse'
                              >
                                 <stop stopColor='#7EB5F9'></stop>
                                 <stop offset='1' stopColor='#6475FF'></stop>
                              </linearGradient>
                           </defs>
                        </svg>
                        <svg
                           stroke='currentColor'
                           fill='currentColor'
                           strokeWidth='0'
                           viewBox='0 0 16 16'
                           className='text-white z-10 h-6 w-6'
                           height='1em'
                           width='1em'
                           xmlns='http://www.w3.org/2000/svg'
                        >
                           <path d='M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z'></path>
                           <path d='M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z'></path>
                           <path d='M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z'></path>
                        </svg>
                     </div>

                     <span className='text-gray-700 font-bold'>{courseLength()}</span>
                  </div>
               </div>
            </div>

            <div className='flex justify-between'>
               <RatingCourse />

               <button className='flex items-center gap-x-1 text-slate-600 font-bold tracking-widest hover:text-green-600'>
                  <span className='text-inherit'>{course?.comments.length}</span>
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     viewBox='0 0 24 24'
                     fill='none'
                     className='w-6 h-6'
                  >
                     <path
                        fill='currentColor'
                        fillRule='evenodd'
                        d='M9.317 3.325a8.005 8.005 0 0 0-6.025 5.901 10.413 10.413 0 0 0 .004 4.912 9.63 9.63 0 0 0 5.737 6.635l.125.05a2.454 2.454 0 0 0 3.175-1.333.916.916 0 0 1 .843-.563H14.3c3.056 0 5.715-2.077 6.433-5.025a9.416 9.416 0 0 0 0-4.455l-.094-.386a7.73 7.73 0 0 0-5.818-5.698l-.404-.092a11.03 11.03 0 0 0-4.863 0l-.237.054Zm-.815 5.042a.694.694 0 0 0-.697.69c0 .383.312.692.697.692h6.386c.385 0 .697-.31.697-.691a.694.694 0 0 0-.697-.691H8.502Zm1.161 3.456a.694.694 0 0 0-.697.691c0 .382.312.691.697.691h4.064c.385 0 .697-.31.697-.69a.694.694 0 0 0-.697-.692H9.663Z'
                        clipRule='evenodd'
                     ></path>
                  </svg>
               </button>

               <Like />
            </div>

            <div className='flex flex-col items-end gap-y-2 md:flex-row md:items-center flex-wrap text-xs'>
               <div className='flex items-center gap-x-1 p-1.5 rounded-lg bg-slate-200/50 w-fit text-slate-500'>
                  <svg
                     stroke='currentColor'
                     fill='currentColor'
                     strokeWidth='0'
                     viewBox='0 0 24 24'
                     className='w-5 h-5'
                     height='1em'
                     width='1em'
                     xmlns='http://www.w3.org/2000/svg'
                  >
                     <path d='M18.948 11.112C18.511 7.67 15.563 5 12.004 5c-2.756 0-5.15 1.611-6.243 4.15-2.148.642-3.757 2.67-3.757 4.85 0 2.757 2.243 5 5 5h1v-2h-1c-1.654 0-3-1.346-3-3 0-1.404 1.199-2.757 2.673-3.016l.581-.102.192-.558C8.153 8.273 9.898 7 12.004 7c2.757 0 5 2.243 5 5v1h1c1.103 0 2 .897 2 2s-.897 2-2 2h-2v2h2c2.206 0 4-1.794 4-4a4.008 4.008 0 0 0-3.056-3.888z'></path>
                     <path d='M13.004 14v-4h-2v4h-3l4 5 4-5z'></path>
                  </svg>
                  <span className='font-bold'>روش دریافت: اسپات پلیر</span>
               </div>
               <div className='flex items-center gap-x-1 p-1.5 rounded-lg bg-slate-200/50 w-fit text-slate-500'>
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     viewBox='0 0 24 24'
                     fill='none'
                     className='w-5 h-5'
                  >
                     <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeWidth='1.5'
                        d='M8.07 3v2.514M15.93 3v2.514M3.833 15.249a13.202 13.202 0 0 1 0-5.896c.616-2.684 2.664-4.78 5.287-5.41a12.33 12.33 0 0 1 5.76 0c2.623.63 4.671 2.726 5.287 5.41a13.2 13.2 0 0 1 0 5.896c-.616 2.684-2.664 4.78-5.287 5.41a12.33 12.33 0 0 1-5.76 0c-2.623-.63-4.671-2.726-5.287-5.41Z'
                     ></path>
                     <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='1.5'
                        d='m10 12.4 1.454 1.6L14 11'
                     ></path>
                  </svg>
                  <span className='font-bold'>تاریخ انتشار :</span>
                  <span className='font-bold'>{course?.createdAt}??</span>
               </div>
               <div className='flex items-center gap-x-1 p-1.5 rounded-lg bg-slate-200/50 w-fit text-slate-500'>
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     viewBox='0 0 24 24'
                     fill='none'
                     className='w-5 h-5'
                  >
                     <path
                        fill='currentColor'
                        d='m3.353 15.05-.73.17.73-.17Zm0-6.1-.73-.17.73.17Zm17.294 0-.73.172.73-.172Zm0 6.1-.73-.172.73.172Zm-5.597 5.597-.172-.73.172.73Zm-6.1 0 .172-.73-.172.73Zm0-17.294.172.73-.172-.73Zm6.1 0-.172.73.172-.73Zm-7.193 8.87a.75.75 0 0 0 1.004 1.115l-1.004-1.115Zm2.209-.979.501.558-.501-.558Zm1.561.197.624-.417-.624.417Zm.746 1.118-.624.417.624-.417Zm1.561.197-.501-.558.501.558Zm2.209-.979a.75.75 0 0 0-1.004-1.115l1.004 1.115Zm-3.068 1.51-.094.745.094-.745Zm-2.15-2.575-.093.745.093-.745Zm-6.842 4.166a12.604 12.604 0 0 1 0-5.756l-1.46-.343a14.104 14.104 0 0 0 0 6.442l1.46-.343Zm15.834-5.756a12.603 12.603 0 0 1 0 5.756l1.46.343a14.104 14.104 0 0 0 0-6.442l-1.46.343Zm-5.039 10.795a12.603 12.603 0 0 1-5.756 0l-.343 1.46c2.119.497 4.323.497 6.442 0l-.343-1.46ZM9.122 4.083a12.604 12.604 0 0 1 5.756 0l.343-1.46a14.103 14.103 0 0 0-6.442 0l.343 1.46Zm0 15.834a6.761 6.761 0 0 1-5.039-5.039l-1.46.343a8.261 8.261 0 0 0 6.156 6.156l.343-1.46Zm6.099 1.46a8.261 8.261 0 0 0 6.156-6.156l-1.46-.343a6.761 6.761 0 0 1-5.039 5.039l.343 1.46Zm-.343-17.294a6.761 6.761 0 0 1 5.039 5.039l1.46-.343a8.261 8.261 0 0 0-6.156-6.156l-.343 1.46ZM8.78 2.623a8.261 8.261 0 0 0-6.156 6.156l1.46.343a6.761 6.761 0 0 1 5.039-5.039l-.343-1.46Zm.082 10.715 1.706-1.536-1.003-1.115-1.707 1.536 1.004 1.115Zm2.142-1.481.746 1.119 1.248-.833-.746-1.119-1.248.833Zm3.433 1.456 1.707-1.536-1.004-1.115-1.706 1.536 1.003 1.115Zm-2.687-.338c.143.214.292.442.443.611.165.185.415.399.79.446l.186-1.489a.356.356 0 0 1 .142.05c.026.016.027.024.001-.005a1.838 1.838 0 0 1-.118-.155 13.848 13.848 0 0 1-.196-.29l-1.248.832Zm1.684-.777c-.106.096-.19.17-.262.232-.073.063-.12.1-.153.121-.032.021-.029.015 0 .005a.356.356 0 0 1 .15-.013l-.187 1.489c.374.047.67-.099.875-.237.188-.126.39-.31.58-.482l-1.003-1.115Zm-2.866-.396c.106-.096.19-.17.262-.232.073-.063.12-.1.153-.121.032-.021.029-.015 0-.005a.356.356 0 0 1-.15.013l.187-1.489c-.374-.047-.67.099-.875.237-.188.126-.39.31-.58.482l1.003 1.115Zm1.684-.777c-.143-.214-.292-.442-.443-.611-.165-.185-.415-.399-.79-.446l-.186 1.489a.356.356 0 0 1-.142-.05c-.026-.016-.027-.024-.001.005.025.03.062.076.118.155.055.078.117.17.196.29l1.248-.832Z'
                     ></path>
                  </svg>
                  <span className='font-bold'>آخرین بروزرسانی:</span>
                  <span className='font-bold'>۱۴۰۲/۵/۲۸??</span>
               </div>
               <div className='flex items-center gap-x-1 px-[5px] py-[7px] rounded-lg bg-slate-200/50 w-fit text-slate-500'>
                  <svg
                     stroke='currentColor'
                     fill='currentColor'
                     strokeWidth='0'
                     viewBox='0 0 16 16'
                     className='w-5 h-5'
                     height='1em'
                     width='1em'
                     xmlns='http://www.w3.org/2000/svg'
                  >
                     <path d='M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z'></path>
                  </svg>
                  <span className='font-bold'>پشتیبانی: دائمی تلگرام</span>
               </div>
            </div>

            <div className='w-full h-[300px] relative'>
               <Image
                  className='rounded-xl'
                  src={'/course/' + course?.image}
                  alt={course?.name}
                  layout='fill'
                  objectFit='cover'
               />
            </div>
         </div>
         <div className='bg-white py-5 px-3 mb-6 rounded-xl'>
            <div className='flex md:flex-col md:gap-y-1 items-center justify-between mb-3'>
               <div className='font-bold  flex-1 flex items-center justify-center'>
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     data-name='Layer 2'
                     viewBox='0 0 51.29 27.19'
                     width='51'
                     height='27'
                     className='text-slate-100 w-6 h-6 lg:w-6 lg:h-6'
                  >
                     <path
                        stroke='currentColor'
                        d='M36.48 22.85c1.78-.83 2.93-1.81 3.45-2.94h-1.65c-2.53 0-4.69-.66-6.47-1.97-.59.68-1.23 1.2-1.93 1.55s-1.54.53-2.5.53c-1.03 0-1.87-.18-2.51-.53-.65-.35-1.14-.96-1.5-1.83-.35-.87-.56-2.08-.63-3.62-.02-.28-.04-.6-.04-.97s-.01-.72-.04-1.07c-.14-3.42-.28-6.26-.42-8.51l-5.8 1.37c.73 1.64 1.34 3.34 1.83 5.08.49 1.75.74 3.58.74 5.5 0 1.6-.37 3.12-1.11 4.57-.74 1.46-1.85 2.64-3.32 3.57-1.48.93-3.27 1.39-5.38 1.39s-3.82-.45-5.21-1.34C2.61 22.74 1.6 21.6.96 20.22c-.63-1.38-.95-2.84-.95-4.36 0-1.2.13-2.28.4-3.25.27-.97.63-1.93 1.07-2.87l2.39 1.34c-.38.92-.65 1.71-.83 2.39-.18.68-.26 1.48-.26 2.39 0 1.76.49 3.19 1.48 4.29s2.63 1.65 4.92 1.65c1.55 0 2.87-.32 3.96-.95 1.09-.63 1.9-1.44 2.43-2.43.53-.98.79-1.98.79-2.99 0-2.65-.82-5.82-2.46-9.5l1.69-3.52L22.38.79c.16-.05.39-.07.67-.07.54 0 .98.19 1.32.56s.53.88.58 1.51c.14 2.04.27 5.02.39 8.94.02.38.04.75.04 1.13s.01.71.04 1.02c.05 1.03.22 1.78.53 2.25s.81.7 1.51.7c.84 0 1.52-.18 2.04-.53.52-.35.97-1 1.37-1.93.75-1.71 1.33-2.96 1.74-3.75.41-.79.94-1.46 1.58-2.04.64-.57 1.44-.86 2.37-.86 1.83 0 3.27.94 4.31 2.83s1.69 4.06 1.95 6.53c1.57-.02 2.77-.13 3.61-.33.83-.2 1.41-.49 1.72-.88.32-.39.47-.89.47-1.5 0-.75-.16-1.67-.49-2.76-.33-1.09-.69-2.1-1.09-3.04l2.43-1.23c1.22 3.1 1.83 5.44 1.83 7.04 0 1.83-.67 3.18-2 4.04-1.34.87-3.53 1.34-6.58 1.41-.49 2.21-1.8 3.93-3.92 5.19-2.12 1.25-4.68 1.98-7.69 2.16l-1.2-2.88c2.6-.14 4.8-.63 6.58-1.46ZM10.38 5.66l.11 3.31-3.2.28-.46-3.31 3.55-.28Zm25.1 10.83c.88.28 1.81.42 2.8.42h1.93c-.16-1.67-.55-3.08-1.16-4.26-.61-1.17-1.38-1.76-2.32-1.76-.75 0-1.42.45-2.02 1.34-.6.89-1.11 1.92-1.53 3.1.66.49 1.42.88 2.3 1.16ZM43.64.21C45.06.07 46.43 0 47.74 0c.96 0 1.67.02 2.11.07l-.21 2.81c-.42-.05-1.08-.07-1.97-.07-1.2 0-2.44.07-3.73.21s-2.44.32-3.45.53L39.86.81c1.1-.26 2.36-.46 3.78-.6Z'
                        data-name='Layer 1'
                     ></path>
                  </svg>
                  <span className='text-3xl text-gray-700 yekanBlack ml-2 lg:text-4xl'>
                     {course?.price.toLocaleString('per')}
                  </span>
               </div>
            </div>
            <AddToCart course={JSON.parse(JSON.stringify(course))} />
         </div>
         <div className='bg-white space-y-8 mb-6 py-1 px-3 rounded-xl sticky top-20 z-10 shadow-xl'>
            <ul className='flex items-center justify-between text-sm text-slate-200'>
               <li className='flex items-center'>
                  <button className='hover:text-slate-600 transition-all duration-200 ease-in '>
                     دیدگاه و پرسش
                  </button>
               </li>
               <li className='flex items-center'>
                  <button className='hover:text-slate-600 transition-all duration-200 ease-in '>
                     جلسات
                  </button>
               </li>
               <li className='flex items-center'>
                  <button className='hover:text-slate-600 transition-all duration-200 ease-in text-blue-500 font-bold'>
                     توضیحات
                  </button>
               </li>
            </ul>
         </div>
         <div className='rounded-xl p-3 mb-6 lg:p-5 bg-white'>
            <div className='flex flex-col items-center'>
               <div className='w-16 h-16 relative overflow-hidden ring ring-gray-200 rounded-full mb-2'>
                  <Image
                     className='rounded-full hover:scale-110 w-full h-full absolute transition-all duraton-200 ease-in'
                     src={'/avatar/me.jpg'}
                     alt='me'
                     height={300}
                     width={300}
                     objectFit='cover'
                  />
               </div>
               <div className='text-center mb-2'>
                  <p className='yekanBlack text-gray-700 leading-tight'>مصطفی تبریزیان</p>
                  <span className='text-sm text-slate-500 block -mt-0.5'>مدرس دوره</span>
               </div>
               <p className='justify-center leading-6 text-right py-2 text-sm text-slate-600'>
                  داستان برنامه نویس شدن من برمیگرده به سال 93. همون موقع که برای پروژه های دانشگاه
                  (رشته مهندسی نفت) برنامه نویسی میکردم. کم کم با MATLAB آشنا شدم و بعدا وارد حوزه
                  برنامه نویسی وب شدم و الان حدود 7 ساله که شغل تخصصی من برنامه نویسی وب هست.
                  <strong> علاقه من جاوااسکریپت و خاندانش است. </strong>به همین دلیل فرانت هوکس رو
                  بنا کردم تا تجربه چند ساله رو در قالب دوره های پروژه محور به علاقه مندان این حوزه
                  انتقال بدم ☘️🤍.
               </p>
            </div>
         </div>

         <div className='rounded-xl p-3 lg:p-5 bg-white'>
            <p className='text-slate-500 text-right text-xs mb-2'>
               میتوانید دیدگاه خود را ثبت کنید
            </p>
            <Comments />
         </div>

         <div className='bg-white rounded-xl mt-6 p-3 lg:p-6'>
            <h2 className='text-2xl text-right text-blue-600 mb-5'>توضیحات دوره</h2>
            <div className='text-right'>
               <p>{course?.description}</p>
               <div>
                  <h3 className='yekanBlack mt-10 mb-5 text-lg text-gray-800'>
                     نکست جی اس (Next.js) چیست ؟
                  </h3>
                  <p className='text-gray-700 leading-10 tracking-wide'>
                     js یک فریمورک فول استک مبتنی بر ریکت هست برای تولید وبسایت ها و وب اپلیکیشن های
                     تحت وب با سرعت و عملکرد بهتر. به طور خلاصه، Next.js همان ریکت هست به علاوه
                     چندین ویژگی قدرتمند دیگر، یعنی تمام مفاهیم React.js همچنان در Next.js هم
                     استفاده می شود. برخلاف کتابخانه ریکت، نکست یک فریمورک هست و اکثر ابزارهایی را
                     که نیاز داریم، خود نکست آماده دارد. به کمک نکست میتوان همزمان بک اند را هم
                     توسعه داد و این ویژگی نکست را خیلی متمایز کرده است.
                  </p>
                  <h3 className='yekanBlack mt-10 mb-5 text-lg text-gray-800'>
                     آیا با یادگیری نکست، از ریکت بی نیاز میشیم ؟
                  </h3>
                  <p className='text-gray-700 leading-10 tracking-wide'>
                     قطعا خیر! تمام مفاهیم ریکت مثل (کامپوننت، life cylcle کامپوننت ها، هوک ها،
                     استیت و...) همچنان در Next.js استفاده میشه. پس ریکت دقیقا پیش نیاز Next.js هست
                     و برای تسلط خوب در Next.js باید ابتدا ریکت را خوب فرا بگیرید.{' '}
                  </p>
                  <h3 className='yekanBlack mt-10 mb-5 text-lg text-gray-800'>
                     آیا باید همیشه از نکست استفاده بشه ؟
                  </h3>
                  <p className='text-gray-700 leading-10 tracking-wide'>
                     خیر! هدف مهم نکست جی اس بهبود عملکرد برنامه (performance) و بهینه سازی برای
                     موتور های جست و جو (SEO) هست. از آنجایی که سئو هدف مهم هر کسب و کاری هست، پس هر
                     برنامه ای که نیاز به سئو داشته باشه، اولین انتخاب شما قطعا نکست خواهد بود. اما
                     در برنامه های داخل سازمانی یا پنل های ادمین و کاربر و یا هر برنامه ای که نیازی
                     به سئو نداشته باشه، استفاده از ریکت مشکلی ایجاد نخواهد کرد.
                  </p>
               </div>
            </div>
         </div>

         <CourseSession chapters={JSON.parse(JSON.stringify(course.chapters))} />

         <div className='bg-white rounded-xl mt-6 p-3 lg:p-6'>
            <h2 className='text-2xl text-end text-blue-600 mb-5'>تجربه دانشجویان (۸)</h2>

            <Comments />

            <div className='mx-5 mt-6'>
               <SwiperComments />
            </div>
         </div>

         <CourseFAQ />

         <Questions />

         <div className='bg-white py-4 px-6 fixed bottom-0 left-0 w-full z-10'>
            <AddToCart course={JSON.parse(JSON.stringify(course))} />
         </div>
      </div>
   )
}

export default CourseDetail
