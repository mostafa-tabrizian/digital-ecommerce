import Link from 'next/link'

import isAdmin from '@/lib/isAdmin'

import CourseCards from '@/components/course/cards'
import Breadcrumbs from '@mui/material/Breadcrumbs'

async function getCourses() {
   return await prisma.course
      .findMany({
         include: {
            courseLocation: {
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
   title: 'تبریزیان دیجیتال ایکامرس | پنل ادمین',
}

const AdminCourses = async () => {
   const courses = await getCourses()

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

               <CourseCards
                  // @ts-ignore
                  courses={courses}
                  pageTarget='/admin/courses/'
                  userTarget='admin'
               />
            </>
         ) : (
            <h3 className='text-center'>شما اجازه وارد شدن به این صفحه را ندارید!</h3>
         )}
      </div>
   )
}

export default AdminCourses
