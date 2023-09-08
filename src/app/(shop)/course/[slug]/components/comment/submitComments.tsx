'use client'

import { useState } from 'react'
import { Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import Slider from '@mui/material/Slider'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

import FormikInput from '@/formik/input'
import Button from '@mui/material/Button'
import { CommentSchemaValidation } from '@/formik/schema/validation'
import FormikTextarea from '@/formik/textarea'
import CircularProgress from '@mui/material/CircularProgress'
import Points from './points'

const Comments = ({ course }: { course: { id: string; name: string } }) => {
   const [panel, setPanel] = useState(false)
   const [rate, setRate] = useState(50)
   const [suggestion, setSuggestion] = useState<boolean | null>(null)

   const { executeRecaptcha } = useGoogleReCaptcha()

   const handleSubmit = async (
      values: {
         title: string
         positivePoints: string[]
         negativePoints: string[]
         description: string
         rate: number
         suggestion: boolean | null
      },
      // @ts-ignore
      { resetForm },
   ) => {
      try {
         if (!executeRecaptcha) return console.log('!executeRecaptcha')

         const gReCaptchaToken = await executeRecaptcha('commentFormSubmit').then(
            (gReCaptchaToken) => gReCaptchaToken,
         )

         const payload = { courseId: course.id, gReCaptchaToken, ...values }

         const res = await fetch('/api/course/comment', {
            method: 'POST',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         const resData = await res.json()

         if (resData?.message == 'recaptcha fail')
            return toast.error('فعالیت شما مشکوک به ربات است')
         else if (resData?.status == 403)
            return toast.error('لطفا خارج و مجدد وارد حساب کاربری خود شوید!')
         else if (resData?.status == 500) return toast.error('در ثبت سفارش خطایی رخ داد')

         setPanel(false)
         resetForm()
         toast.success('ممنونم که کامنت گذاشتید')
      } catch (err) {
         toast.error('در ثبت کامنت خطایی رخ داد!')
         console.error(err)
      }
   }

   const marks = [
      {
         value: 0,
         label: 'خیلی بد',
      },
      {
         value: 25,
         label: 'بد',
      },
      {
         value: 50,
         label: 'متوسط',
      },
      {
         value: 75,
         label: 'خوب',
      },
      {
         value: 100,
         label: 'عالی',
      },
   ]

   const valueLabelFormat = (value: number) => {
      return marks[marks.findIndex((mark) => mark.value === value)].label
   }

   const rateNumberToLabel = {
      0: 'خیلی بد',
      25: 'بد',
      50: 'متوسط',
      75: 'خوب',
      100: 'عالی',
   }

   return (
      <>
         <Button
            onClick={() => setPanel(true)}
            sx={{ borderRadius: '15px', width: '100%', padding: '.5rem 0' }}
            variant='outlined'
         >
            <div className='flex gap-1'>
               ثبت دیدگاه
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  className='w-5 h-5 ml-1'
               >
                  <path
                     stroke='currentColor'
                     strokeLinecap='round'
                     strokeWidth='1.5'
                     d='M8.696 9.058h6.032m-6.032 3.456h3.839m.576 6.413h1.061c2.887 0 5.398-2.077 6.076-5.025a9.955 9.955 0 0 0 0-4.455l-.09-.386c-.652-2.841-2.781-5.049-5.494-5.698l-.381-.092a9.853 9.853 0 0 0-4.593 0l-.224.054c-2.81.672-5.014 2.959-5.69 5.901-.37 1.61-.367 3.303.003 4.912.687 2.989 2.708 5.476 5.419 6.635l.118.05c1.173.502 2.517-.102 2.998-1.333a.866.866 0 0 1 .797-.563Z'
                  ></path>
               </svg>
            </div>
         </Button>
         <div
            className={` ${
               panel ? 'opacity-100 visible' : 'opacity-0 invisible'
            } w-full h-full bg-white fixed top-0 left-0 z-20 transition-all`}
         >
            <div className='m-6 rtl'>
               <div className='flex items-center justify-between'>
                  <div>
                     <p className='text-base'>دیدگاه شما</p>
                     <p className='text-sm text-slate-400'>در مورد {course.name}</p>
                  </div>
                  <button type='button' onClick={() => setPanel(false)}>
                     <svg
                        stroke='currentColor'
                        fill='none'
                        strokeWidth='0'
                        viewBox='0 0 24 24'
                        className='text-slate-500'
                        height='20'
                        width='20'
                        xmlns='http://www.w3.org/2000/svg'
                     >
                        <path
                           d='M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z'
                           fill='currentColor'
                        ></path>
                     </svg>
                  </button>
               </div>
               <hr />
               <Formik
                  initialValues={{
                     title: '',
                     positivePoints: [],
                     negativePoints: [],
                     description: '',
                     rate: 50,
                     suggestion: null,
                  }}
                  validationSchema={CommentSchemaValidation}
                  onSubmit={handleSubmit}
               >
                  {({ isSubmitting, setFieldValue }) => (
                     <Form className='space-y-6'>
                        <div>
                           <span className='font-bold text-gray-600 text-base'>
                              {/* @ts-ignore */}
                              امتیاز دهید: {rateNumberToLabel[rate]}
                           </span>
                           <div className='mx-6'>
                              <Slider
                                 id='rate'
                                 defaultValue={50}
                                 // @ts-ignore
                                 getAriaValueText={(value: number) => `${rateNumberToLabel[value]}`}
                                 valueLabelDisplay='auto'
                                 valueLabelFormat={valueLabelFormat}
                                 marks={marks}
                                 step={25}
                                 min={0}
                                 max={100}
                                 // @ts-ignore
                                 onChange={(e: Event, value: number) => {
                                    setRate(value)
                                    setFieldValue('rate', value)
                                 }}
                              />
                           </div>
                        </div>
                        <hr />
                        <div className='flex items-center justify-between gap-5 my-6'>
                           <button
                              type='button'
                              onClick={() => {
                                 setSuggestion(true)
                                 setFieldValue('suggestion', true)
                              }}
                              className={`border-2 ${
                                 suggestion ? 'border-blue-500' : 'border-slate-100'
                              } rounded-xl w-full`}
                           >
                              <div>
                                 <svg
                                    stroke='currentColor'
                                    fill='currentColor'
                                    strokeWidth='0'
                                    viewBox='0 0 1024 1024'
                                    className='w-8 h-8 mx-auto'
                                    height='1em'
                                    width='1em'
                                    xmlns='http://www.w3.org/2000/svg'
                                 >
                                    <path d='M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 0 0 471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0 1 42.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z'></path>
                                 </svg>
                                 <span className='text-[10px] whitespace-nowrap lg:text-xs'>
                                    پیشنهاد میکنم
                                 </span>
                              </div>
                           </button>
                           <button
                              type='button'
                              onClick={() => {
                                 setSuggestion(null)
                                 setFieldValue('suggestion', null)
                              }}
                              className={`border-2 ${
                                 suggestion == null ? 'border-blue-500' : 'border-slate-100'
                              } rounded-xl w-full`}
                           >
                              <div>
                                 <svg
                                    stroke='currentColor'
                                    fill='none'
                                    strokeWidth='2'
                                    viewBox='0 0 24 24'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    className='w-8 h-8 mx-auto'
                                    height='1em'
                                    width='1em'
                                    xmlns='http://www.w3.org/2000/svg'
                                 >
                                    <desc></desc>
                                    <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                                    <circle cx='9' cy='7' r='4'></circle>
                                    <path d='M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2'></path>
                                    <line x1='19' y1='7' x2='19' y2='10'></line>
                                    <line x1='19' y1='14' x2='19' y2='14.01'></line>
                                 </svg>
                                 <span className='text-[10px] whitespace-nowrap lg:text-xs'>
                                    مطمئن نیستم
                                 </span>
                              </div>
                           </button>
                           <button
                              type='button'
                              onClick={() => {
                                 setSuggestion(false)
                                 setFieldValue('suggestion', false)
                              }}
                              className={`border-2 ${
                                 suggestion == false ? 'border-blue-500' : 'border-slate-100'
                              } rounded-xl w-full`}
                           >
                              <div>
                                 <svg
                                    stroke='currentColor'
                                    fill='currentColor'
                                    strokeWidth='0'
                                    viewBox='0 0 1024 1024'
                                    className='w-8 h-8 mx-auto'
                                    height='1em'
                                    width='1em'
                                    xmlns='http://www.w3.org/2000/svg'
                                 >
                                    <path d='M885.9 490.3c3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-51.6-30.7-98.1-78.3-118.4a66.1 66.1 0 0 0-26.5-5.4H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h129.3l85.8 310.8C372.9 889 418.9 924 470.9 924c29.7 0 57.4-11.8 77.9-33.4 20.5-21.5 31-49.7 29.5-79.4l-6-122.9h239.9c12.1 0 23.9-3.2 34.3-9.3 40.4-23.5 65.5-66.1 65.5-111 0-28.3-9.3-55.5-26.1-77.7zM184 456V172h81v284h-81zm627.2 160.4H496.8l9.6 198.4c.6 11.9-4.7 23.1-14.6 30.5-6.1 4.5-13.6 6.8-21.1 6.7a44.28 44.28 0 0 1-42.2-32.3L329 459.2V172h415.4a56.85 56.85 0 0 1 33.6 51.8c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19a56.76 56.76 0 0 1 19.6 43c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19a56.76 56.76 0 0 1 19.6 43c0 9.7-2.3 18.9-6.9 27.3l-14 25.5 21.9 19a56.76 56.76 0 0 1 19.6 43c0 19.1-11 37.5-28.8 48.4z'></path>
                                 </svg>
                                 <span className='text-[10px] whitespace-nowrap lg:text-xs'>
                                    پیشنهاد نمیکنم
                                 </span>
                              </div>
                           </button>
                        </div>
                        <FormikInput label='عنوان دیدگاه' name='title' type='text' />

                        <Points setFieldValue={setFieldValue} />

                        <FormikTextarea label='توضیحات' name='description' />

                        <Button
                           type='submit'
                           variant='contained'
                           sx={{ width: '100%', borderRadius: '15px', padding: '.75rem 0' }}
                        >
                           {isSubmitting ? (
                              <div className='flex text-white justify-center'>
                                 <CircularProgress color='inherit' size={25} />
                              </div>
                           ) : (
                              'ثبت دیدگاه'
                           )}
                        </Button>
                     </Form>
                  )}
               </Formik>
            </div>
         </div>
      </>
   )
}

export default Comments
