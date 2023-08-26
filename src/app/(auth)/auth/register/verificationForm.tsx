'use client'

import { signIn } from 'next-auth/react'
import { toast } from 'react-toastify'
import { Form, Formik } from 'formik'
import CircularProgress from '@mui/material/CircularProgress'

import { VerificationSchemaValidation } from '@/formik/schema/validation'
import FormikInput from '@/formik/input'

interface IProps {
   mobileNumber: string
   password: string
   confirmPassword: string
}

interface IForm {
   code: string
}

export const VerificationForm = (formData: IProps) => {
   const onSubmit = async (values: IForm) => {
      try {
         const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({...values, formData}),
         })

         if (!res.ok) throw new Error()

         const resData = await res.json()

         if (resData.message === 'invalidCode') throw new Error('invalidCode')
         else if (resData.message === 'codeExpired') throw new Error('codeExpired')
         else if (resData.status === 500) throw new Error('uniqueUser')

         toast.success('ثبت نام شما با موفقیت انجام شد. لطفا منتظر بمانید....')
         return signIn('credentials', {
            ...values,
            callbackUrl: '/profile',
         })
      } catch (err) {
         // @ts-ignore
         if (err?.message == 'uniqueUser') {
            toast.warning('این ایمیل از قبل ثبت نام شده است')
         // @ts-ignore
         } else if (err?.message == 'invalidCode') {
            toast.warning('کد وارد شده اشتباه است')
         // @ts-ignore
         } else if (err?.message == 'codeExpired') {
            toast.warning('کد شما منقضی شده است')
         } else {
            toast.error('در ثبت نام شما خطایی رخ داد')
            console.error('api/auth/register err', err)
         }
      }
   }

   return (
      <Formik
         initialValues={{ code: '' }}
         validationSchema={VerificationSchemaValidation}
         onSubmit={onSubmit}
      >
         {({ isSubmitting }) => (
            <Form className='mt-4'>
               <div>
                  <h3 className='text-right mb-3'>لطفا کد تأیید خود را وارد کنید</h3>
               </div>

               <div className='space-y-3 mt-5 mb-10'>
                  <FormikInput
                     label=''
                     name='code'
                     type='text'
                     placeholder='کد تأیید خود را وارد کنید...'
                  />
               </div>
               <button
                  type='submit'
                  className='rounded-xl w-full bg-blue-500 hover:bg-blue-600 transition-colors shadow-lg shadow-indigo-300 text-white'
                  disabled={isSubmitting}
               >
                  {isSubmitting ? (
                     <div className='flex justify-center'>
                        <CircularProgress className='text-white' color='inherit' size={25} />
                     </div>
                  ) : (
                     'تأیید'
                  )}
               </button>
            </Form>
         )}
      </Formik>
   )
}
