'use client'

import ProductCards from '@/components/product/cards'
import { useEffect, useState } from 'react'

import { IProduct } from '@/models/product'

import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

const SwiperProducts = () => {
   const [products, setProducts] = useState<IProduct[]>([])

   const getProducts = async () => {
      setProducts(await fetch('/api/product').then((res) => res.json()))
   }

   useEffect(() => {
      getProducts()
   }, [])

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
            {products.map((product) => {
               return (
                  <div key={product._id} className='swiper-slide'>
                     <ProductCards product={product} pageTarget='/product/' />
                  </div>
               )
            })}
         </div>
         <div className='swiper-pagination'></div>
      </div>
   )
}

export default SwiperProducts
