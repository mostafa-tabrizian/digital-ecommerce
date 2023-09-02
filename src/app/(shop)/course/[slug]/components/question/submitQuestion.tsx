'use client'

import { useState } from 'react'
import Button from '@mui/material/Button'
import FormikTextarea from '@/formik/textarea'
import { toast } from 'react-toastify'
import { Form, Formik } from 'formik'
import CircularProgress from '@mui/material/CircularProgress'

import { QuestionSchemaValidation } from '@/formik/schema/validation'

const SubmitQuestion = ({ courseId }: { courseId: string }) => {
   const [panel, setPanel] = useState(false)

   const handleSubmit = async (
      values: {
         body: string
      },
      // @ts-ignore
      { resetForm },
   ) => {
      try {
         console.log('values', values);
         
         const payload = { courseId: courseId, ...values }

         const res = await fetch('/api/course/question', {
            method: 'POST',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         setPanel(false)
         resetForm()
         toast.success('پرسش شما با موفقیت ثبت شد')
      } catch (err) {
         toast.error('در ثبت پرسش خطایی رخ داد!')
         console.error(err)
      }
   }

   return (
      <>
         <Button
            onClick={() => setPanel(true)}
            className='mb-6'
            sx={{ borderRadius: '15px', width: '100%', marginButton: '2.5rem' }}
            variant='outlined'
         >
            <div className='flex items-center gap-1'>
               <svg
                  stroke='currentColor'
                  fill='none'
                  strokeWidth='0'
                  viewBox='0 0 24 24'
                  className='w-4 h-4 ml-1'
                  height='1em'
                  width='1em'
                  xmlns='http://www.w3.org/2000/svg'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='2'
                     d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  ></path>
               </svg>
               ثبت پرسش جدید
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
                     <p className='text-base'>پرسش جدید</p>
                     <p className='text-sm text-slate-400'>پرسش خود را وارد کنید</p>
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
                     body: '',
                  }}
                  validationSchema={QuestionSchemaValidation}
                  onSubmit={handleSubmit}
               >
                  {({ isSubmitting }) => (
                     <Form className='space-y-6'>
                        <FormikTextarea label='متن پرسش' name='body' />
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
                              'ثبت پرسش'
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

export default SubmitQuestion
