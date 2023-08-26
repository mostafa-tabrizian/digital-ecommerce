'use client'

import { signIn } from 'next-auth/react'
import { toast } from 'react-toastify'
import { Form, Formik } from 'formik'
import CircularProgress from '@mui/material/CircularProgress'

import { VerificationSchemaValidation } from '@/formik/schema/validation'
import FormikInput from '@/formik/input'
import toFarsiNumber from '@/lib/toFarsiNumber'
import { SetStateAction } from 'react'
import VerificationCountdown from './components/verificationCountdown'

interface IProps {
   mobileNumber: string
   password: string
   confirmPassword: string
}

interface IForm {
   code: string
}

export const VerificationForm = ({
   formData,
   verificationInput,
   postVerification
}: {
   formData: IProps | null
   verificationInput: { value: boolean; set: SetStateAction<boolean> }
   postVerification: (values: IProps) => void
}) => {

   const verificationAgain = () => {
      postVerification(formData)
   }

   const onSubmit = async (values: IForm) => {
      try {
         const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ ...values, formData }),
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
               <div className='space-y-3 mt-5 mb-10'>
                  <div className='text-right'>
                     <div className='my-6 flex items-center justify-end gap-x-2'>
                        <span>
                           <button onClick={() => verificationInput.set(false)}>
                              <svg
                                 xmlns='http://www.w3.org/2000/svg'
                                 viewBox='0 0 24 24'
                                 fill='none'
                                 className='w-4 h-4 text-blue-600'
                              >
                                 <path
                                    stroke='currentColor'
                                    strokeWidth='1.5'
                                    d='M20.445 6.889c-1.667.555-3.89-1.667-3.334-3.333m-.134.134-3.59 3.59a12.18 12.18 0 0 0-3.204 5.659l-.174.694a.295.295 0 0 0 .358.358l.694-.174a12.18 12.18 0 0 0 5.658-3.203l3.59-3.59a2.357 2.357 0 1 0-3.332-3.334Z'
                                 ></path>
                                 <path
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeWidth='1.5'
                                    d='M12 3c-1.023 0-2.047.118-3.05.353A7.511 7.511 0 0 0 3.353 8.95a13.354 13.354 0 0 0 0 6.1 7.511 7.511 0 0 0 5.597 5.597c2.006.47 4.094.47 6.1 0a7.511 7.511 0 0 0 5.597-5.597c.235-1.003.353-2.027.353-3.05'
                                 ></path>
                              </svg>
                           </button>
                        </span>
                        <span className='text-slate-400'>
                           کد تأیید برای شماره موبایل {formData?.mobileNumber && toFarsiNumber(formData?.mobileNumber)} ارسال
                           گردید
                        </span>
                     </div>
                     <span className='font-bold text-base text-gray-600'>
                        کد تأیید را وارد کنید
                     </span>
                  </div>
                  <FormikInput
                     label=''
                     name='code'
                     type='text'
                     placeholder='کد تأیید خود را وارد کنید...'
                  />
                  <VerificationCountdown verificationAgain={verificationAgain} />
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
