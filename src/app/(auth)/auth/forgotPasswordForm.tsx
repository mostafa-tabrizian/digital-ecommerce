'use client'

import { toast } from 'react-toastify'
import { Form, Formik } from 'formik'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

import FormikInput from '@/formik/input'
import { ForgotPasswordSchemaValidation } from '@/formik/schema/validation'
import CircularProgress from '@mui/material/CircularProgress'

interface FormType {
   mobileNumber: string
}

const ForgotPasswordForm = () => {
   const { executeRecaptcha } = useGoogleReCaptcha()

   const onSubmit = async (values: FormType) => {
      try {
         if (!executeRecaptcha) return console.log('!executeRecaptcha')

         const gReCaptchaToken = await executeRecaptcha('forgotPasswordFormSubmit').then(
            (gReCaptchaToken) => gReCaptchaToken,
         )

         const payload = {
            ...values,
            gReCaptchaToken,
         }

         const res = await fetch('/api/auth/forgotpassword', {
            method: 'POST',
            body: JSON.stringify(payload),
         })

         const resData = await res.json()

         if (!res.ok) throw new Error()

         if (resData?.message == 'recaptcha fail')
            return toast.error('فعالیت شما مشکوک به ربات است')
         else if (resData.message === 'smsError')
            return toast.error('در بازنشانی رمزعبور خطایی رخ داد. لطفا به پشتیبانی اطلاع دهید.')
         else if (resData.status === 500) throw new Error('405')

         toast.success(
            'بازنشانی شما با موفقیت انجام شد. لطفا برای ورود از رمز عبور ارسال شده استفاده کنید....',
         )
      } catch (err) {
         toast.error('در بازنشانی رمز شما خطایی رخ داد')
         return console.error('auth signIn() err', err)
      }
   }

   return (
      <Formik
         initialValues={{ mobileNumber: '' }}
         validationSchema={ForgotPasswordSchemaValidation}
         onSubmit={onSubmit}
      >
         {({ isSubmitting }) => (
            <Form className='mt-4'>
               <div>
                  <h3 className='text-right mb-3'>بازنشانی رمز عبور</h3>
                  <p className='text-right text-sm'>
                     !به نظر می‌رسه رمز عبور خود را فراموش کردید <br /> لطفا شماره تماس خود را وارد
                     کنید
                  </p>
               </div>

               <div className='mt-5 mb-10'>
                  <FormikInput
                     label=''
                     name='mobileNumber'
                     type='text'
                     placeholder='شماره تماس خود را وارد کنید...'
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
                     'دریافت رمز عبور جدید'
                  )}
               </button>
            </Form>
         )}
      </Formik>
   )
}

export default ForgotPasswordForm
