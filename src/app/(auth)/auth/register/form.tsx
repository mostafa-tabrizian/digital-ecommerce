'use client'

import { toast } from 'react-toastify'
import { Form, Formik } from 'formik'
import CircularProgress from '@mui/material/CircularProgress'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

import { RegisterSchemaValidation } from '@/formik/schema/validation'
import FormikInput from '@/formik/input'
import { useState } from 'react'
import { VerificationForm } from './verificationForm'

interface IForm {
   mobileNumber: string
   password: string
   confirmPassword: string
}

const RegisterForm = () => {
   const [formData, setFormData] = useState<IForm | null>(null)
   const [verificationInput, setVerificationInput] = useState<boolean>(false)

   const { executeRecaptcha } = useGoogleReCaptcha()

   const onSubmit = async (values: IForm) => {
      try {
         if (!executeRecaptcha) return console.log('!executeRecaptcha')

         const gReCaptchaToken = await executeRecaptcha('registerFormSubmit').then(
            (gReCaptchaToken) => gReCaptchaToken,
         )

         const payload = {
            ...values,
            gReCaptchaToken,
         }

         const res = await fetch('/api/auth/register/verification', {
            method: 'POST',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         const resData = await res.json()

         if (resData?.message == 'recaptcha fail')
            return toast.error('فعالیت شما مشکوک به ربات است')
         else if (resData.message === 'smsError')
            return toast.error('در ارسال کد فعال سازی خطایی رخ داد. لطفا به پشتیبانی اطلاع دهید.')
         else if (resData.status === 500) throw new Error('405')

         setFormData(values)
         toast.success('لطفا کد تأیید خود را وارد کنید')
         setVerificationInput(true)
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
            // @ts-ignore
            <VerificationForm
               formData={formData}
               verificationInput={{ value: verificationInput, set: setVerificationInput }}
               postVerification={onSubmit}
            />
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

export default RegisterForm
