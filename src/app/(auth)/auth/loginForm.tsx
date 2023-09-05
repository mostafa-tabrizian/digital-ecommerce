'use client'

import { signIn } from 'next-auth/react'
import { toast } from 'react-toastify'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

import FormikInput from '@/formik/input'
import { LoginSchemaValidation } from '@/formik/schema/validation'
import CircularProgress from '@mui/material/CircularProgress'

interface FormType {
   mobileNumber: string
   password: string
}

const errorsInPersian: { [key: string]: string } = {
   Signin: 'لطفا از شماره تماس دیگری برای ورود استفاده کنید..',
   OAuthSignin: 'لطفا از شماره تماس دیگری برای ورود استفاده کنید..',
   OAuthCallback: 'لطفا از شماره تماس دیگری برای ورود استفاده کنید..',
   OAuthCreateAccount: 'لطفا از شماره تماس دیگری برای ورود استفاده کنید..',
   EmailCreateAccount: 'لطفا از شماره تماس دیگری برای ورود استفاده کنید..',
   Callback: 'لطفا از شماره تماس دیگری برای ورود استفاده کنید..',
   EmailSignin: 'لطفا شماره تماس خود رو بررسی کنید',
   CredentialsSignin: 'در ورود شما خطایی رخ داد. لطفا صحت اطلاعات خود را بررسی کنید.',
   default: 'امکان ورود نمی‌باشد',
}

const LoginForm = () => {
   const router = useRouter()

   const [error, setError] = useState('')

   const { executeRecaptcha } = useGoogleReCaptcha()

   const onSubmit = async (values: FormType) => {
      try {
         if (!executeRecaptcha) return console.log('!executeRecaptcha')

         const gReCaptchaToken = await executeRecaptcha('loginFormSubmit').then(
            (gReCaptchaToken) => gReCaptchaToken,
         )

         const res = await signIn('credentials', {
            ...values,
            gReCaptchaToken,
            redirect: false,
         })

         if (res?.status == 200) {
            if (res.error) return setError(errorsInPersian[res.error])
            router.refresh()
            router.push('/profile')
         } else {
            toast.error('در ورود شما خطایی رخ داد')
            return console.error('auth signIn() res !200', res)
         }
      } catch (err) {
         toast.error('در ورود شما خطایی رخ داد')
         return console.error('auth signIn() err', err)
      }
   }

   return (
      <Formik
         initialValues={{ mobileNumber: '', password: '' }}
         validationSchema={LoginSchemaValidation}
         onSubmit={onSubmit}
      >
         {({ isSubmitting }) => (
            <Form className='mt-4'>
               <div>
                  <h3 className='text-right mb-3'>ورود</h3>
                  <p className='text-right text-sm'>
                     ! سلام <br /> برای ورود شماره تماس و رمز خود را وارد کنید
                  </p>
               </div>

               <div className='space-y-3 mt-5 mb-10'>
                  <FormikInput
                     label=''
                     name='mobileNumber'
                     type='text'
                     placeholder='شماره تماس خود را وارد کنید...'
                  />
                  <FormikInput
                     label=''
                     name='password'
                     type='password'
                     placeholder='رمز عبور خود را وارد کنید...'
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
                     'ورود'
                  )}
               </button>
               {error ? <p className='text-red-500 text-sm mt-3 font-semibold'>{error}</p> : ''}
            </Form>
         )}
      </Formik>
   )
}

export default LoginForm
