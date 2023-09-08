import Tabs from './tabs.components'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from 'next/link'

export const metadata = {
   title: 'تبریزیان دیجیتال ایکامرس | پنل ادمین | سفارشات',
}

const OrdersManagement = () => {
   return (
      <div className='mx-6 md:mx-auto w-max-screen-md my-16 space-y-10'>
         <Breadcrumbs aria-label='breadcrumb'>
            <Link className='text-gray-400' href='/'>
               فروشگاه
            </Link>
            <Link className='text-gray-400' href='/admin'>
               ادمین
            </Link>
            <h5 className='font-semibold'>سفارشات</h5>
         </Breadcrumbs>

         <Tabs />
      </div>
   )
}

export default OrdersManagement
