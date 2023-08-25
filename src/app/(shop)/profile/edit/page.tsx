'use client'

import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Form, Formik } from 'formik'
import useSWR from 'swr'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

import FormikInput from '@/formik/input'
import FormikTextarea from '@/formik/textarea'
import { ProfileSchemaValidation } from '@/formik/schema/validation'
import fetcher from '@/lib/fetcher'

interface FormType {
   name?: string
   mobileNumber?: string
   phoneNumber?: string
   melliCode?: string
   address?: string
}

const Edit = () => {
   const { data, error, isLoading } = useSWR('/api/user', fetcher)

   if (error) {
      toast.error('در دریافت اطلاعات شما خطایی رخ داد')
      console.error(error)
   }

   useEffect(() => {
      document.title = 'تبریزیان دیجیتال ایکامرس | اطلاعات حساب'
   }, [])

   const onSubmit = async (values: FormType) => {
      const payload: FormType = Object.fromEntries(
         // @ts-ignore
         Object.entries(values).filter(([key, value]) => value !== data[key]),
      )

      const payloadLength = Object.keys(payload).length

      if (payloadLength) {
         try {
            const res = await fetch('/api/user', {
               method: 'PATCH',
               body: JSON.stringify(payload),
            })

            if (!res.ok) throw new Error()

            toast.success('تغییرات با موفقیت ثبت گردید.')
         } catch (err) {
            toast.error('در ثبت تغییرات خطایی رخ داد. لطفا مجدد تلاش کنید.')
            console.error(err)
         }
      }
   }

   return (
      <>
         <Backdrop
            sx={{
               color: '#fff',
               zIndex: (theme) => theme.zIndex.drawer + 1,
               height: '100vh',
            }}
            open={isLoading}
         >
            <CircularProgress className='text-white' color='inherit' size={40} />
         </Backdrop>
         <div className='my-16 from-gray-100 to-gray-200 max-w-md mx-6 md:mx-auto bg-gradient-to-bl rounded-lg px-5 space-y-11'>
            <h1 className='text-center font-bold'>اطلاعات حساب</h1>

            <div className='space-y-10 max-w-md mx-auto'>
               <Formik
                  enableReinitialize={true}
                  initialValues={{
                     name: data?.name || ''
                  }}
                  validationSchema={ProfileSchemaValidation}
                  onSubmit={onSubmit}
               >
                  {({ isSubmitting }) => (
                     <Form className='space-y-5 pb-5'>
                        <FormikInput
                           label='نام و نام خانوادگی'
                           name='name'
                           type='text'
                           placeholder='لطفا نام و نام خانوادگی خود را وارد کنید...'
                        />
                        <button
                           type='submit'
                           disabled={isSubmitting}
                           className='bg-blue-500 hover:bg-blue-600 shadow-lg shadow-indigo-300 transition-colors text-white w-full py-3 rounded-xl'
                        >
                           {isSubmitting ? (
                              <div className='flex justify-center'>
                                 <CircularProgress className='text-white' color='inherit' size={25} />
                              </div>
                           ) : (
                              'ثبت تغییرات'
                           )}
                        </button>
                     </Form>
                  )}
               </Formik>
            </div>
         </div>
      </>
   )
}

export default Edit
