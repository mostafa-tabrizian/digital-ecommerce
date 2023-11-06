import Link from 'next/link'
import Images from '@/components/course/images'
import PriceDiscountQtyEdit from './priceDiscountQtyEdit'

import PublicEdit from './publicEdit'

import isAdmin from '@/lib/isAdmin'
import CourseTitleDescription from './nameAndDescription'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Course, { ICourse } from '@/models/course'
import dbConnect from '@/lib/dbConnect'

async function getCourseLocations(name: string) {
   await dbConnect()
   return await Course.findOne({
      name: decodeURI(name),
   }).exec()
}

export const metadata = {
   title: 'اکسپرسیفای | ادمین | محصول',
}

const CourseLocations = async ({ params }: { params: { name: string } }) => {
   const course = await getCourseLocations(params.name)

   return (
      <div className='mx-6 my-16 relative'>
         {(await isAdmin()) ? (
            pageContent(course)
         ) : (
            <h3 className='text-center'>شما اجازه وارد شدن به این صفحه را ندارید!</h3>
         )}
      </div>
   )
}

export default CourseLocations

const pageContent = (course: ICourse) => {
   return (
      <div className='mx-6 md:mx-auto max-w-screen-md space-y-10 my-16'>
         {course ? (
            <>
               <Breadcrumbs aria-label='breadcrumb'>
                  <Link className='text-gray-400' href='/'>
                     فروشگاه
                  </Link>
                  <Link className='text-gray-400' href='/admin'>
                     ادمین
                  </Link>
                  <Link className='text-gray-400' href='/admin/courses'>
                     محصولات
                  </Link>
                  <h5 className='font-semibold'>{course.name}</h5>
               </Breadcrumbs>

               <div className='max-w-md mx-auto'>
                  <Link href='/admin/courses/add'>
                     <button className='bg-white z-10 border-2 border-blue-500 rounded-full p-3 fixed bottom-10 right-5'>
                        <svg
                           className='h-6 w-6 text-blue-500'
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

                  <Images
                     params={JSON.parse(
                        JSON.stringify({
                           isAdmin: true,
                           image: {
                              _id: course._id,
                              src: course.image,
                              alt: course.name
                           },
                        }),
                     )}
                  />

                  <div className='my-5 space-y-6'>
                     <PublicEdit
                        params={JSON.parse(
                           JSON.stringify({
                              _id: course._id,
                              publicParam: course.public,
                           }),
                        )}
                     />

                     <CourseTitleDescription
                        params={JSON.parse(
                           JSON.stringify({
                              _id: course._id,
                              name: course.name,
                              description: course.description,
                           }),
                        )}
                     />

                     <PriceDiscountQtyEdit
                        params={JSON.parse(
                           JSON.stringify({
                              _id: course._id,
                              price: course.price,
                              discount: course.discount,
                           }),
                        )}
                     />
                  </div>
               </div>
            </>
         ) : (
            <h1>آیتم پیدا نشد!</h1>
         )}
      </div>
   )
}
