'use client'

import { useEffect } from 'react'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

import Comment from './comment'

const SwiperComments = ({ products }: any) => {
   useEffect(() => {
      new Swiper('.swiperComments', {
         loop: true,
         effect: 'cards',
         cardsEffect: {
            slideShadows: true,
         },
      })
   }, [])

   return (
      <div className='swiperComments rtl'>
         <div className='swiper-wrapper pb-10'>
            <div className='swiper-slide rounded-xl'>
               {/* <ProductCards products={products} pageTarget='/product/' userTarget='client' /> */}
               <Comment />
            </div>
            <div className='swiper-slide rounded-xl'>
               {/* <ProductCards products={products} pageTarget='/product/' userTarget='client' /> */}
               <Comment />
            </div>
            <div className='swiper-slide rounded-xl'>
               {/* <ProductCards products={products} pageTarget='/product/' userTarget='client' /> */}
               <Comment />
            </div>
         </div>
         <div className='swiper-pagination'></div>
      </div>
   )
}

export default SwiperComments
