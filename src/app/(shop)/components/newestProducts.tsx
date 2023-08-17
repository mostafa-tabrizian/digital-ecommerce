import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Button from '@mui/material/Button'

import SwiperProducts from './swiperProducts'

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

const NewestProducts = async () => {
   const products = await getProducts()

   return (
      <div className='bg-gradient-to-l from-slate-200 to-slate-50 rounded-lg p-2 pt-4'>
         <div className='mb-20 text-center space-y-6'>
            <h2 className='font-extraBlack text-3xl md:text-4xl'>جدیدترین دوره ها</h2>
            <p className='text-sm pb-6'>دوره ببین، تمرین کن و برنامه نویس شو</p>
            <Link href='/courses'>
               <Button variant='contained'>همه دوره ها</Button>
            </Link>
         </div>

         <SwiperProducts products={products} />
      </div>
   )
}

export default NewestProducts
