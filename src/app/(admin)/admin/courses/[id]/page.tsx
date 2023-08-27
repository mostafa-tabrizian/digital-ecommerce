import Link from 'next/link'
import Images from '@/components/course/images'
import PriceDiscountQtyEdit from './priceDiscountQtyEdit'

import PublicEdit from './button.publicEdit'

import isAdmin from '@/lib/isAdmin'
import CourseTitleDescription from './titleAndDescription'
import Breadcrumbs from '@mui/material/Breadcrumbs'

async function getCourseLocations(courseId: string) {
   return await prisma.course
      .findUnique({
         where: {
            id: courseId,
         },
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
                  id: true,
                  src: true,
                  alt: true,
               },
            },
         },
      })
      .then((res) => res)
}

export const metadata = {
   title: 'تبریزیان دیجیتال ایکامرس | ادمین | چهره های محصول',
}

const CourseLocations = async ({ params }: { params: { id: string } }) => {
   const course = await getCourseLocations(params.id)

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

type TypeCourse =
   | ({
        courseLocation: ({ color: { color: string } | null; size: { size: number } | null } & {
           id: string
           public: boolean
           courseId: string
           colorId: string | null
           sizeId: string | null
           quantity: number
           price: number
           discount: number
        })[]
        gallery: { id: string; src: string; alt: string }[]
     } & {
        id: string
        title: string
        brandId: string | null
        description: string | null
        createdAt: Date
        updatedAt: Date
     })
   | null

const pageContent = (course: TypeCourse) => {
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
                  <Link className='text-gray-400' href='/admin/course'>
                     محصولات
                  </Link>
                  <h5 className='font-semibold'>{course.title}</h5>
               </Breadcrumbs>

               <div className='max-w-md mx-auto'>
                  <Link href='/admin/course/add'>
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

                  <div className='space-y-3'>
                     <CourseTitleDescription
                        id={course.id}
                        title={course.title}
                        description={course.description}
                     />
                  </div>

                  <Images isAdmin={true} thumbnail={course.gallery[0]} course={course} />

                  <hr />

                  <div className='my-5'>
                     <div className='w-full relative grid grid-cols-6 rounded-lg items-center bg-white p-2 mt-3'>
                        <span className='font-semibold text-black text-sm'>رنگ</span>

                        <span className='font-semibold text-black text-sm'>سایز</span>

                        <span className='font-semibold text-black text-sm'>قیمت</span>

                        <span className='font-semibold text-black text-sm'>تخفیف</span>

                        <span className='text-black font-semibold text-sm'>تعداد</span>

                        <span className='text-black font-semibold text-sm'>عمومی</span>
                     </div>

                     {course.courseLocation.map((location) => {
                        return (
                           <div
                              key={location.id}
                              className='w-full grid grid-cols-6 rounded-lg items-center bg-white p-2 mt-3'
                           >
                              <span
                                 style={{ background: location.color?.color }}
                                 className='w-6 h-6 block rounded-full'
                              ></span>

                              <span className='font-semibold text-black text-sm'>
                                 {location.size?.size}
                              </span>

                              <PriceDiscountQtyEdit
                                 id={location.id}
                                 price={String(location.price)}
                                 discount={String(location.discount)}
                                 quantity={String(location.quantity)}
                              />

                              <PublicEdit id={location.id} publicProp={location.public} />
                           </div>
                        )
                     })}
                  </div>
               </div>
            </>
         ) : (
            <h1>آیتم پیدا نشد!</h1>
         )}
      </div>
   )
}
