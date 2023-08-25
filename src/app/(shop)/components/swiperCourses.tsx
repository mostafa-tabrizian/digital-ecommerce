'use client'

import CourseCards from '@/components/course/cards'
import { useEffect, useState } from 'react'

import { ICourse } from '@/models/course'

import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

const SwiperCourses = () => {
   const [courses, setCourses] = useState<ICourse[]>([])

   const getCourses = async () => {
      setCourses(await fetch('/api/course').then((res) => res.json()))
   }

   useEffect(() => {
      getCourses()
   }, [])

   useEffect(() => {
      new Swiper('.swiperCourses', {
         speed: 1000,
         spaceBetween: 50,
         autoplay: {
            delay: 5000,
         },
         loop: true,
         effect: 'coverflow',
         coverflowEffect: {
            rotate: 30,
            slideShadows: false,
         },
         pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            dynamicBullets: true,
         },
      })
   }, [])

   return (
      <div className='swiperCourses rtl'>
         <div className='swiper-wrapper py-5'>
            {courses.map((course) => {
               return (
                  <div key={course._id} className='swiper-slide'>
                     <CourseCards course={course} pageTarget='/course/' />
                  </div>
               )
            })}
         </div>
         <div className='swiper-pagination'></div>
      </div>
   )
}

export default SwiperCourses
