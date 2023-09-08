'use client'

import Image from 'next/legacy/image'
import { useState } from 'react'
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress'

type PropsType = {
   params: {
      isAdmin: boolean
      image: {
         _id: string
         src: string
         alt: string
      }
   }
}

const Images = ({ params: { isAdmin, image } }: PropsType) => {
   const [loading, setLoading] = useState(false)

   const DeleteButton = () => {
      const deleteImage = async () => {
         const imageId = image._id
         const imageSrc = image.src
         const imageSrcSplit = imageSrc.split('/')
         const imageKey = imageSrcSplit[imageSrcSplit.length - 1]

         try {
            setLoading(true)

            const resS3 = await fetch('/api/course/image/s3', {
               method: 'DELETE',
               body: JSON.stringify({ imageKey }),
            })

            if (!resS3.ok) throw new Error()

            const resDB = await fetch('/api/course/image', {
               method: 'DELETE',
               body: JSON.stringify({ imageId }),
            })

            if (!resDB.ok) throw new Error()

            toast.success('تصویر با موفقیت حذف گردید.')
         } catch (err) {
            toast.error('تصویر موجود نمی باشد یا در حذف تصویر خطایی رخ داد!')
            console.error(err)
         } finally {
            setLoading(false)
         }
      }

      return (
         <button
            onClick={() => deleteImage()}
            className='absolute p-1 left-0 top-0 z-10'
         >
            {loading ? (
               <CircularProgress color='error' size={33} />
            ) : (
               <svg
                  className='h-5 w-5 text-rose-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='2'
                     d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                  />
               </svg>
            )}
         </button>
      )
   }

   return (
      <div className='space-y-3 relative'>
         <DeleteButton />
         <div className='text-center'>
            {image ? (
               <Image
                  className='rounded-xl'
                  src={`/course/${image.src}`}
                  alt={image.alt}
                  height={300}
                  width={450}
                  objectFit='cover'
               />
            ) : (
               <h2 className='mt-6'>&quot;!برای این محصول تصویری وجود ندارد&quot;</h2>
            )}
         </div>
      </div>
   )
}

export default Images
