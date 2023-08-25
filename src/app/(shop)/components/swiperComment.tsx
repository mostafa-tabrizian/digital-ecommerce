'use client'

import { useEffect } from 'react'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

import Comment from './comment'

const SwiperComments = ({ courses }: any) => {
   useEffect(() => {
      new Swiper('.swiperComments', {
         loop: true,
         effect: 'cards',
         autoplay: {
            delay: 5000,
         },
         cardsEffect: {
            slideShadows: true,
         },
         pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            dynamicBullets: true,
         },
      })
   }, [])

   return (
      <div className='swiperComments rtl'>
         <div className='swiper-wrapper pb-10'>
            <div className='swiper-slide rounded-xl'>
               {/* <CourseCards courses={courses} pageTarget='/course/' userTarget='client' /> */}
               <Comment />
            </div>
            <div className='swiper-slide rounded-xl'>
               {/* <CourseCards courses={courses} pageTarget='/course/' userTarget='client' /> */}
               <Comment />
            </div>
            <div className='swiper-slide rounded-xl'>
               {/* <CourseCards courses={courses} pageTarget='/course/' userTarget='client' /> */}
               <Comment />
            </div>
         </div>
         <div className='swiper-pagination'></div>
      </div>
   )
}

export default SwiperComments
