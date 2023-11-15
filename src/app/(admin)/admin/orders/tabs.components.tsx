'use client'

import useSWR from 'swr'
import { toast } from 'react-toastify'
import { DataGrid } from '@mui/x-data-grid'
import { IOrder } from '@/models/order'

import fetcher from '@/lib/fetcher'
import CircularProgress from '@mui/material/CircularProgress'

interface IColumns {
   field: string
   headerName: JSX.Element
   width: number
   type: string
   renderCell: ({ value }: { value: string | number }) => JSX.Element
}

const Tabs = () => {
   const { data: orders, error, isLoading } = useSWR('/api/order', fetcher)

   if (error) {
      toast.error('در دریافت اطلاعات شما خطایی رخ داد')
      console.error(error)
   }

   const columns: IColumns[] = [
      {
         field: 'id',
         headerName: <span>ردیف</span>,
         width: 30,
         type: 'number',
         renderCell: ({ value }) => <span>{value.toLocaleString('fa')}</span>,
      },
      {
         field: '_id',
         headerName: <span>کد سفارش</span>,
         width: 200,
         type: 'element',
         renderCell: ({ value }) => <span>{value}</span>,
      },
      {
         field: 'createdAt',
         headerName: <span>تاریخ ثبت</span>,
         width: 180,
         type: 'element',
         renderCell: ({ value }) => <span>{value}</span>,
      },
      {
         field: 'purchaser',
         headerName: <span>سفارش دهنده</span>,
         width: 400,
         type: 'element',
         //  @ts-ignore
         renderCell: ({ value }) => <span>{value}</span>,
      },
      {
         field: 'price',
         headerName: <span>مبلغ</span>,
         type: 'number',
         width: 100,
         renderCell: ({ value }) => <span>{value.toLocaleString('fa')}</span>,
      },
      {
         field: 'discount',
         headerName: <span>تخفیف</span>,
         type: 'number',
         width: 100,
         renderCell: ({ value }) => <span>{value.toLocaleString('fa')}</span>,
      },
      {
         field: 'coupon',
         headerName: <span>کپن</span>,
         type: 'number',
         width: 100,
         renderCell: ({ value }) => <span>{value.toLocaleString('fa')}</span>,
      },
      {
         field: 'payment',
         headerName: <span>مبلغ پرداختی</span>,
         type: 'number',
         width: 100,
         renderCell: ({ value }) => <span>{value.toLocaleString('fa')}</span>,
      },
   ]

   const rows = orders?.map((order: IOrder, index: number) => {
      return {
         id: index,
         purchaser: `${order.user._id} : ${order.user.name} : ${order.user.mobileNumber}`,
         payment: order.price - order.discount - order.coupon,
         ...order,
      }
   })

   return (
      <>
         <div className='md:flex text-center space-y-6 flex-wrap'>
            {isLoading ? (
               <div>
                  <CircularProgress size={40} />
               </div>
            ) : orders?.length ? (
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
               <h5>هیچ سفارشی تا به این لحظه ثبت نشده</h5>
            )}
         </div>
      </>
   )
}

export default Tabs
