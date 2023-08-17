import Image from 'next/legacy/image'
import Link from 'next/link'

import OurFeatures from './components/ourFeatures'
import NewestProducts from './components/newestProducts'
import { prisma } from '@/lib/prisma'
import SwiperComments from './components/swiperComment'

export const metadata = {
   title: 'تبریزیان دیجیتال ایکامرس',
   description: 'https://github.com/Mostafa-Code19',
}

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

         <NewestProducts products={products} />

         <div className='flex justify-end items-center gap-x-3 mb-4'>
            <h2 className='text-xl lg:text-4xl'>نظرات دانشجویان</h2>
            <div className='p-3 relative drop-shadow flex items-center justify-center from-blue-300 to-blue-500 bg-gradient-to-r rounded-3xl'>
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
               </svg>
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  className='w-7 h-7 lg:w-11 lg:h-11 text-white z-10'
               >
                  <path
                     stroke='currentColor'
                     strokeLinecap='round'
                     strokeWidth='1.5'
                     d='M8.696 9.058h6.032m-6.032 3.456h3.839m.576 6.413h1.061c2.887 0 5.398-2.077 6.076-5.025a9.955 9.955 0 0 0 0-4.455l-.09-.386c-.652-2.841-2.781-5.049-5.494-5.698l-.381-.092a9.853 9.853 0 0 0-4.593 0l-.224.054c-2.81.672-5.014 2.959-5.69 5.901-.37 1.61-.367 3.303.003 4.912.687 2.989 2.708 5.476 5.419 6.635l.118.05c1.173.502 2.517-.102 2.998-1.333a.866.866 0 0 1 .797-.563Z'
                  ></path>
               </svg>
            </div>
         </div>
         <p className='text-xs text-center opacity-80 lg:text-base leading-6 lg:leading-8'>
            {' '}
            اینا فقط بخش کوچکی از تجربه دانشجویان فرانت هوکس هست
         </p>

         <SwiperComments />
      </div>
   )
}

export default Home
