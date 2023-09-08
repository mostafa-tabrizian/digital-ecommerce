'use client'

import Image from 'next/legacy/image'

import { DataGrid } from '@mui/x-data-grid'

import { ICourse } from '@/models/course'
import Link from 'next/link'

interface IColumns {
   field: string
   headerName: JSX.Element
   width: number
   type: string
   renderCell: ({ value }: { value: string | number }) => JSX.Element
}

const CoursesTable = ({ courses }: { courses: ICourse[] }) => {
   const status = {
      comingSoon: 'به زودی',
      recording: 'در حال ضبط',
      completed: 'تکمیل ضبط',
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
      },
      {
         field: 'status',
         headerName: <span>وضعیت</span>,
         width: 100,
         type: 'element',
         //  @ts-ignore
         renderCell: ({ value }) => <span>{status[value]}</span>,
      },
      {
         field: 'price',
         headerName: <span>قیمت</span>,
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
   ]

   const rows = courses?.map((course, index) => {
      return {
         id: index,
         ...course,
      }
   })

   return (
      <div style={{ width: '100%' }} className='rtl'>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
               },
            }}
            pageSizeOptions={[5, 10, 20, 50]}
            density='comfortable'
         />
      </div>
   )
}

export default CoursesTable
