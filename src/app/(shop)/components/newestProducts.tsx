import Link from 'next/link'
import Button from '@mui/material/Button'

import SwiperProducts from './swiperProducts'

const NewestProducts = () => {
   return (
      <div className='bg-gradient-to-l from-slate-200 to-slate-50 rounded-lg p-2 pt-4'>
         <div className='mb-20 text-center space-y-6'>
            <h2 className='font-extraBlack text-3xl md:text-4xl'>جدیدترین دوره ها</h2>
            <p className='text-sm pb-6'>دوره ببین، تمرین کن و برنامه نویس شو</p>
            <Link href='/products'>
               <Button variant='contained' className='rounded-2xl py-3 px-10'>
                  همه دوره ها
               </Button>
            </Link>
         </div>

         <SwiperProducts />
      </div>
   )
}

export default NewestProducts
