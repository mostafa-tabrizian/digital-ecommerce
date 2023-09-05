import Link from 'next/link'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import dbConnect from '@/lib/dbConnect'
import Course from '@/models/course'
import isAdmin from '@/lib/isAdmin'
import Image from 'next/legacy/image'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

async function getCourses() {
   await dbConnect()
   return await Course.find({})
}

export const metadata = {
   title: 'تبریزیان دیجیتال ایکامرس | پنل ادمین | محصولات',
}

const AdminCourses = async () => {
   const courses = await getCourses()

   const status = {
      comingSoon: 'به زودی',
      recording: 'در حال ضبط',
      completed: 'تکمیل ضبط',
   }

   return (
      <div className='md:mx-auto mx-6 max-w-screen-md space-y-10 my-16 relative'>
         {(await isAdmin()) ? (
            <>
               <Breadcrumbs aria-label='breadcrumb'>
                  <Link className='text-gray-400' href='/'>
                     فروشگاه
                  </Link>
                  <Link className='text-gray-400' href='/admin'>
                     ادمین
                  </Link>
                  <h5 className='font-semibold'>محصولات</h5>
               </Breadcrumbs>

               <Link href='/admin/courses/add'>
                  <button className='bg-blue-400 rounded-full p-3 fixed bottom-24 right-5'>
                     <svg
                        className='h-6 w-6 text-white'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                     >
                        <path
                           strokeLinecap='round'
                           strokeLinejoin='round'
                           strokeWidth='2'
                           d='M12 4v16m8-8H4'
                        />
                     </svg>
                  </button>
               </Link>

               <div className='overflow-x-scroll rtl'>
                  <Table aria-label='simple table'>
                     <TableHead>
                        <TableRow>
                           <TableCell>
                              <span>تصویر</span>
                           </TableCell>
                           <TableCell align='right'>
                              <span>عنوان</span>
                           </TableCell>
                           <TableCell align='right'>
                              <span>وضعیت</span>
                           </TableCell>
                           <TableCell align='right'>
                              <span>قیمت</span>
                           </TableCell>
                           <TableCell align='right'>
                              <span>تخفیف</span>
                           </TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {courses.map((course) => (
                           <TableRow
                              key={course._id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                           >
                              <TableCell component='th' scope='row'>
                                 <Link href={'/admin/courses/' + course.name}>
                                    <Image
                                       className='rounded-xl'
                                       src={`/course/${course.image}`}
                                       alt={course.name}
                                       height={50}
                                       width={50}
                                       objectFit='cover'
                                    />
                                 </Link>
                              </TableCell>
                              <TableCell align='right'>
                                 <span>{course.name}</span>
                              </TableCell>
                              <TableCell align='right'>
                                 <span>{status[course.status]}</span>
                              </TableCell>
                              <TableCell align='right'>
                                 <span>{course.price.toLocaleString('fa')}</span>
                              </TableCell>
                              <TableCell align='right'>
                                 <span>{course.discount.toLocaleString('fa')}</span>
                              </TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </div>

               {/* <div className='py-5 space-y-4 rtl'>
                  {courses.map((course) => {
                     return (
                        <div key={course._id}>
                           <Link href={'/admin/courses/' + course.name}>
                              <div className='flex'>
                                 <Image
                                    className='rounded-xl'
                                    src={`/course/${course.image}`}
                                    alt={course.name}
                                    height={50}
                                    width={50}
                                    objectFit='cover'
                                 />
                                 <span>{course.name}</span>
                                 <span>{course.status}</span>
                                 <span>{course.price}</span>
                                 <span>{course.discount}</span>
                                 <span>{course.purchaser.length}</span>
                              </div>
                           </Link>
                        </div>
                     )
                  })}
               </div> */}
            </>
         ) : (
            <h3 className='text-center'>شما اجازه وارد شدن به این صفحه را ندارید!</h3>
         )}
      </div>
   )
}

export default AdminCourses
