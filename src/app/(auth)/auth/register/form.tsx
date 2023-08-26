'use client'

import { signIn } from 'next-auth/react'
import { toast } from 'react-toastify'
import { Form, Formik } from 'formik'
import CircularProgress from '@mui/material/CircularProgress'

import { RegisterSchemaValidation } from '@/formik/schema/validation'
import FormikInput from '@/formik/input'
import { useState } from 'react'
import { VerificationForm } from './verificationForm'

interface FormType {
   mobileNumber: string
   password: string
   confirmPassword: string
}

export const RegisterForm = () => {
   const [formData, setFormData] = useState<FormType | null>(null)
   const [verificationInput, setVerificationInput] = useState(false)

   const onSubmit = async (values: FormType) => {
      try {
         const res = await fetch('/api/auth/register/verification', {
            method: 'POST',
            body: JSON.stringify(values),
         })

         const resData = await res.json()

         if (!res.ok) throw new Error()
         if (resData.status === 500) throw new Error('405')

         setFormData(values)
         toast.success('لطفا کد تأیید خود را وارد کنید')
         setVerificationInput(true)

         // toast.success('ثبت نام شما با موفقیت انجام شد. لطفا منتظر بمانید....')
         // return signIn('credentials', {
         //    ...values,
         //    callbackUrl: '/profile',
         // })
      } catch (err) {
         // @ts-ignore
         if (err?.message == '405') {
            toast.warning('این ایمیل از قبل ثبت نام شده است')
         } else {
            toast.error('در ثبت نام شما خطایی رخ داد')
            console.error('api/auth/register err', err)
         }
      }
   }

   return (
      <>
         {verificationInput ? (
            <VerificationForm formData={formData}/>
         ) : (
            <Formik
               initialValues={{ mobileNumber: '', password: '', confirmPassword: '' }}
               validationSchema={RegisterSchemaValidation}
               onSubmit={onSubmit}
            >
               {({ isSubmitting }) => (
                  <Form className='mt-4'>
                     <div>
                        <h3 className='text-right mb-3'>ثبت نام</h3>
                        <p className='text-right text-sm'>
                           ! سلام <br /> برای ثبت نام لطفا شماره موبایل، رمز و تکرار رمز خود را وارد
                           کنید
                        </p>
                     </div>

                     <div className='space-y-3 mt-5 mb-10'>
                        <FormikInput
                           label=''
                           name='mobileNumber'
                           type='text'
                           placeholder='شماره موبایل خود را وارد کنید...'
                        />
                        <FormikInput
                           label=''
                           name='password'
                           type='password'
                           placeholder='رمز عبور خود را وارد کنید...'
                        />
                        <FormikInput
                           label=''
                           name='confirmPassword'
                           type='password'
                           placeholder='مجدد رمز عبور خود را وارد کنید...'
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
                           'ثبت نام'
                        )}
                     </button>
                  </Form>
               )}
            </Formik>
         )}
      </>
   )
}
