'use client'

import { useState } from 'react'
import Button from '@mui/material/Button'
import FormikTextarea from '@/formik/textarea'
import { toast } from 'react-toastify'
import { Form, Formik } from 'formik'
import CircularProgress from '@mui/material/CircularProgress'

import { QuestionSchemaValidation } from '@/formik/schema/validation'
import { ICourse } from '@/models/course'

const SubmitAnswer = ({
   question,
}: {
   question: ICourse['questions'][0]
}) => {
   const [panel, setPanel] = useState(false)

   const handleSubmit = async (
      values: {
         body: string
      },
      // @ts-ignore
      { resetForm },
   ) => {
      try {
         const payload = { questionId: question._id, ...values }

         const res = await fetch('/api/course/question/answer', {
            method: 'POST',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         setPanel(false)
         resetForm()
         toast.success('پاسخ شما با موفقیت ثبت شد')
      } catch (err) {
         toast.error('در ثبت پاسخ خطایی رخ داد!')
         console.error(err)
      }
   }

   return (
      <>
         <button
            onClick={() => setPanel(true)}
            className='flex gap-x-1 items-center py-1 px-2 rounded-lg text-slate-500 bg-slate-200/50'
            type='button'
         >
            <span className='ml-1'>
               <svg
                  stroke='currentColor'
                  fill='currentColor'
                  strokeWidth='0'
                  viewBox='0 0 20 20'
                  height='1em'
                  width='1em'
                  xmlns='http://www.w3.org/2000/svg'
               >
                  <path
                     fillRule='evenodd'
                     d='M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                     clipRule='evenodd'
                  ></path>
               </svg>
            </span>
            <span className='text-inherit font-normal text-sm'>پاسخ</span>
         </button>

         <div
            className={` ${
               panel ? 'opacity-100 visible' : 'opacity-0 invisible'
            } w-full h-full bg-white fixed top-0 left-0 z-20 transition-all`}
         >
            <div className='m-6 rtl'>
               <div className='flex items-center justify-between'>
                  <div>
                     <p className='text-base'>پاسخ به {question.user.name}</p>
                     <p className='text-sm text-slate-400'>پاسخ خود را بنویسید</p>
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
                        <div>
                              <h6>متن پرسش</h6>
                           <p>{question.body}</p>
                        </div>
                        <FormikTextarea label='متن پاسخ' name='body' />
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
                              'ثبت پاسخ'
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

export default SubmitAnswer
