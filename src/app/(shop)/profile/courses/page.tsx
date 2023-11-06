import User from '@/lib/user'
import Image from 'next/legacy/image'

import DateFormat from '@/app/(shop)/components/dateFormat'
import { DataGrid } from '@mui/x-data-grid'
import Link from 'next/link'

export const metadata = {
   title: 'اکسپرسیفای | دوره های من',
}

interface IColumns {
   field: string
   headerName: JSX.Element
   width: number
   type: string
   renderCell: ({ value }: { value: string | number }) => JSX.Element
}

const Orders = async () => {
   const user = await User()

   const columns: IColumns[] = [
      {
         field: 'id',
         headerName: <span>ردیف</span>,
         width: 30,
         type: 'number',
         renderCell: ({ value }) => <span>{value.toLocaleString('fa')}</span>,
      },
      {
         field: 'image',
         headerName: <span>تصویر</span>,
         width: 80,
         type: 'element',
         renderCell: ({ value }) => (
            <Image
               className='rounded-xl'
               src={`/course/${value}`}
               alt={String(value)}
               height={50}
               width={50}
               objectFit='cover'
            />
         ),
      },
      {
         field: 'name',
         headerName: <span>عنوان</span>,
         width: 200,
         type: 'element',
         renderCell: ({ value }) => (
            <Link href={`/admin/courses/${value}`}>
               <span>{value}</span>
            </Link>
         ),
      }
   ]

   const rows = user.purchaser?.map((course, index) => {
      return {
         id: index++,
         ...course,
      }
   })

   return (
      <div className='mx-6 my-16 space-y-7'>
         <h1 className='text-center font-bold'>دوره های من</h1>

         {user.purchaser?.length ? (
            <div style={{ width: '100%' }} className='rtl'>
               {/* <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                     pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                     },
                  }}
                  pageSizeOptions={[5, 10, 20, 50]}
                  density='comfortable'
               /> */}
            </div>
         ) : (
            <h3 className='text-center'>!شما تا به این لحظه هیچ سفارشی ثبت نکرده اید</h3>
         )}
      </div>
   )
}

export default Orders
