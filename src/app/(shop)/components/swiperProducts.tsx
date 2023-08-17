'use client'

import ProductCards from '@/components/product/cards'
import { useEffect } from 'react'

import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

const SwiperProducts = ({ products }: any) => {
   useEffect(() => {
      new Swiper('.swiperProducts', {
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

         parallax: true,
         pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            dynamicBullets: true,
         },
      })
   }, [])

   return (
      <div className='swiperProducts rtl'>
         <div className='swiper-wrapper py-5'>
            <div className='swiper-slide'>
               {/* <ProductCards products={products} pageTarget='/product/' userTarget='client' /> */}
               <ProductCards product='nexjs' pageTarget='/product/' userTarget='client' />
            </div>
            <div className='swiper-slide'>
               <ProductCards product='reactredux' pageTarget='/product/' userTarget='client' />
            </div>
            <div className='swiper-slide'>
               <ProductCards product='tailwindcss' pageTarget='/product/' userTarget='client' />
            </div>
         </div>
         <div className='swiper-pagination'></div>
      </div>
   )
}

export default SwiperProducts
