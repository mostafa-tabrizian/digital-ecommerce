import User from '@/lib/user'
import Link from 'next/link'
import isAdmin from '@/lib/isAdmin'
import Breadcrumbs from '@mui/material/Breadcrumbs'

export const metadata = {
   title: 'تبریزیان دیجیتال ایکامرس | پنل ادمین',
}

const AdminPanel = async () => {
   const user = await User()

   return (
      <div className='mx-6 my-16 space-y-10'>
         {(await isAdmin()) ? (
            <>
               <Breadcrumbs aria-label='breadcrumb'>
                  <Link className='text-gray-400' href='/'>
                     فروشگاه
                  </Link>
                  <h5 className='font-semibold'>ادمین</h5>
               </Breadcrumbs>

               <div className='text-center'>
                  <h1 className='font-semibold'> {user?.name || user?.mobileNumber} </h1>
                  <h2 className='ext-zinc-400 text-base'> به پنل ادمین خوش آمدید </h2>
               </div>

               <div className='px-4 py-10 space-y-4 from-gray-50 to-gray-100 bg-gradient-to-bl rounded-lg'>
                  <div className='bg-white rounded-lg py-2 px-2'>
                     <Link href='/admin/orders'>
                        <div className='flex justify-end space-x-3 items-center'>
                           <span className='text-base text-black'>سفارشات</span>
                           <svg
                              className='h-6 w-6 text-black'
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              strokeWidth='2'
                              stroke='currentColor'
                              fill='none'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                           >
                              
                              <path stroke='none' d='M0 0h24v24H0z' />
                              <circle cx='7' cy='17' r='2' /> <circle cx='17' cy='17' r='2' />
                              <path d='M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5' />
                              <line x1='3' y1='9' x2='7' y2='9' />
                           </svg>
                        </div>
                     </Link>
                  </div>
                  <div className='bg-white rounded-lg py-2 px-2'>
                     <Link href='/admin/course'>
                        <div className='flex justify-end space-x-3 items-center'>
                           <span className='text-base text-black'>محصولات</span>
                           <svg
                              className='h-6 w-6 text-black'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                           >
                              <path
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                                 strokeWidth='2'
                                 d='M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z'
                              />
                           </svg>
                        </div>
                     </Link>
                  </div>

                  <div className='bg-white rounded-lg py-2 px-2'>
                     <Link href='/admin/statistic'>
                        <div className='flex justify-end space-x-3 items-center'>
                           <span className='text-base text-black'>آمار</span>
                           <svg
                              className='h-6 w-6 text-black'
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              strokeWidth='2'
                              stroke='currentColor'
                              fill='none'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                           >
                              <path stroke='none' d='M0 0h24v24H0z' />
                              <line x1='4' y1='19' x2='20' y2='19' />
                              <polyline points='4 15 8 9 12 11 16 6 20 10' />
                           </svg>
                        </div>
                     </Link>
                  </div>
               </div>
            </>
         ) : (
            <h3 className='text-center'>شما اجازه وارد شدن به این صفحه را ندارید!</h3>
         )}
      </div>
   )
}

export default AdminPanel
