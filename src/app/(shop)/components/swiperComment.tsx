'use client'

import { useEffect } from 'react'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

import Comment from './comment'
import { ICourse } from '@/models/course'

const SwiperComments = ({ comments }: { comments: ICourse['comments'] }) => {
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
            {comments.map((comment) => {
               return (
                  <div key={comment._id} className='swiper-slide rounded-xl'>
                     <Comment comment={JSON.parse(JSON.stringify(comment))} />
                  </div>
               )
            })}
         </div>
         <div className='swiper-pagination'></div>
      </div>
   )
}

export default SwiperComments
