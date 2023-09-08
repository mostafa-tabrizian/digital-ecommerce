'use client'

import { Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

import FormikInput from '@/formik/input'
import { PasswordSchemaValidation } from '@/formik/schema/validation'

interface FormType {
   oldPass: string
   newPass: string
   confirmNewPass: string
}

const UserEditForm = () => {
   const { executeRecaptcha } = useGoogleReCaptcha()

   const handleSubmit = async (
      values: FormType,
      // @ts-ignore
      { resetForm },
   ) => {
      try {
         if (!executeRecaptcha) return console.log('!executeRecaptcha')

         const gReCaptchaToken = await executeRecaptcha('commentFormSubmit').then(
            (gReCaptchaToken) => gReCaptchaToken,
         )

         const payload = {
            ...values,
            gReCaptchaToken,
         }

         const res = await fetch('/api/user/change-password', {
            method: 'POST',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         const resData = await res.json()

         if (resData?.message == 'recaptcha fail')
            return toast.error('فعالیت شما مشکوک به ربات است')
         else if (resData?.status == 403)
            return toast.error('لطفا خارج و مجدد وارد حساب کاربری خود شوید!')
         else if (resData?.message == 'password dont match')
            return toast.error('رمز فعلی شما اشتباه است')
         else if (resData?.status == 500) return toast.error('در ثبت سفارش خطایی رخ داد')

         resetForm()
         toast.success('رمز عبور شما با موفقیت تغییر یافت.')
      } catch (err) {
         toast.error('در ثبت تغییرات خطایی رخ داد. لطفا مجدد تلاش کنید.')
         console.error(err)
      }
   }

   return (
      <>
         <Formik
            enableReinitialize={true}
            initialValues={{
               oldPass: '',
               newPass: '',
               confirmNewPass: '',
            }}
            validationSchema={PasswordSchemaValidation}
            onSubmit={handleSubmit}
         >
            {({ isSubmitting }) => (
               <Form className='space-y-5 pb-5'>
                  <FormikInput
                     label=''
                     name='oldPass'
                     type='password'
                     placeholder='رمز عبور فعلی خود را وارد کنید...'
                  />
                  <FormikInput
                     label=''
                     name='newPass'
                     type='password'
                     placeholder='رمز عبور جدید خود را وارد کنید...'
                  />
                  <FormikInput
                     label=''
                     name='confirmNewPass'
                     type='password'
                     placeholder='مجدد رمز عبور جدید خود را وارد کنید...'
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
                        'تغییر رمز عبور'
                     )}
                  </button>
               </Form>
            )}
         </Formik>
      </>
   )
}

export default UserEditForm
