import Image from 'next/legacy/image'
import Link from 'next/link'

import { prisma } from '@/lib/prisma'
import ProductCards from '@/components/product/cards'
import OurFeatures from './components/ourFeatures'

async function getProducts() {
   return await prisma.product
      .findMany({
         include: {
            productLocation: {
               where: {
                  public: {
                     equals: true,
                  },
                  quantity: {
                     gt: 0,
                  },
               },
               include: {
                  color: {
                     select: {
                        color: true,
                     },
                  },
                  size: {
                     select: {
                        size: true,
                     },
                  },
               },
            },
            gallery: {
               select: {
                  src: true,
                  alt: true,
               },
            },
         },
      })
      .then((res) => res)
}

export const metadata = {
   title: 'تبریزیان دیجیتال ایکامرس',
   description: 'https://github.com/Mostafa-Code19',
}

async function Home() {
   const products = await getProducts()

   return (
      <div className='px-6 md:px-0 md:mx-auto max-w-screen-md space-y-16 mb-16 mt-24'>
         <Link href='#'>
            <div className='from-blue-400 mx-auto to-blue-700 bg-gradient-to-r rounded-3xl'>
               <div className='flex relative justify-around mb-16 mx-auto'>
                  <div className='ml-8 pt-8 pb-4'>
                     <div>
                        <h1 className='text-white text-lg md:text-2xl items-center mb-4 text-left'>
                           آیا آماده ای که مسیر رو هدایت کنی
                        </h1>
                        <button className='bg-white rounded-2xl text-blue-600 px-4 py-2'>
                           مشاهده
                        </button>
                     </div>
                  </div>
                  <div className='scale-150 md:w-48 relative -right-0 md:-top-5'>
                     <Image
                        priority
                        className='object-contain absolute -right-0 top-0 md:-top-5'
                        src='/hero.png'
                        alt='nike shoe'
                        height='300'
                        width='300'
                     />
                  </div>
               </div>
            </div>
         </Link>

         <OurFeatures />
      </div>
   )
}

export default Home
