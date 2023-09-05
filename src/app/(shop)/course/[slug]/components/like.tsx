'use client'

import { ICourse } from '@/models/course'
import { IUser } from '@/models/user'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const Like = ({ user, course }: { user: IUser; course: ICourse }) => {
   // @ts-ignore
   const userLiked = course.likes.length && course.likes.includes(user._id)

   const router = useRouter()

   const onClick = async () => {
      try {
         const res = await fetch('/api/course/like', {
            method: 'POST',
            body: JSON.stringify({
               courseId: course._id,
            }),
         })

         if (!res.ok) throw new Error()

         const resData = res.json()

         if (resData?.status == 403) return toast.error('لطفا ابتدا وارد حساب کاربری خود شوید!')
         
         router.refresh()
      } catch (err) {
         toast.warning('تو ثبت لایک مشکلی پیش اومد')
         console.error(err)
      }
   }

   return (
      <button
         onClick={onClick}
         className='flex items-center gap-x-1 text-slate-600 tracking-widest font-bold hover:text-rose-500'
      >
         <span className='text-inherit'>{course.likes.length.toLocaleString('per')}</span>
         <svg
            stroke='currentColor'
            fill='currentColor'
            strokeWidth='0'
            viewBox='0 0 24 24'
            aria-hidden='true'
            className={`h-6 w-6 ${userLiked ? 'fill-rose-500' : 'none'}`}
            height='1em'
            width='1em'
            xmlns='http://www.w3.org/2000/svg'
         >
            <path d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z'></path>
         </svg>
      </button>
   )
}

export default Like
