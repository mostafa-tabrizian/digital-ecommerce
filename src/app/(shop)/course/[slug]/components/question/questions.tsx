import Avatar from '@mui/material/Avatar'
import SubmitQuestion from './submitQuestion'
import { ICourse } from '@/models/course'

const Question = ({ course }: { course: { id: string; questions: ICourse['questions'] } }) => {
   return (
      <div className='bg-white rtl font-semibold rounded-xl mt-6 p-3 lg:p-6'>
         <h2 className='text-2xl text-right text-blue-600 mb-5'>پرسش های شما</h2>

         <SubmitQuestion courseId={course.id} />

         <div className='space-y-8'>
            {course.questions.map((question) => {
               return (
                  <div key={question._id}>
                     <div className='border border-gray-200 rounded-xl p-2 sm:p-4 mb-3'>
                        <div className='flex items-center justify-between mb-5 border-b border-b-gray-200/60 pb-2'>
                           <div className='flex items-center gap-x-3'>
                              <Avatar
                                 sx={{ width: 32, height: 32 }}
                                 alt={question.user.name}
                                 src={'/avatar/' + question.user.avatar}
                              />
                              <div className='text-sm w-full'>
                                 <span className='font-bold text-slate-600 block mb-1'>
                                    {question.user.name}
                                 </span>
                                 <span className='block text-slate-500 text-xs'>۱ ماه پیش</span>
                              </div>
                           </div>
                           <div>
                              <button
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
                           </div>
                        </div>
                        <p className='text-gray-700 font-normal leading-loose lg:leading-8 text-xs lg:text-base'>
                           {question.body}
                        </p>
                     </div>
                     {question.answers.map((answer) => {
                        return (
                           <div key={answer._id}>
                              <div className='flex'>
                                 <div className='my-3'>
                                    <svg
                                       className='h-5 w-5 text-gray-500'
                                       viewBox='0 0 24 24'
                                       fill='none'
                                       stroke='currentColor'
                                       strokeWidth='2'
                                       strokeLinecap='round'
                                       strokeLinejoin='round'
                                    >
                                       {' '}
                                       <polyline points='9 10 4 15 9 20' />{' '}
                                       <path d='M20 4v7a4 4 0 0 1-4 4H4' />
                                    </svg>
                                 </div>
                                 <div
                                    className='border w-full border-gray-100 bg-gray-50/80 rounded-xl p-2 sm:p-4 mb-3 mr-3'
                                 >
                                    <div>
                                       <div className='flex items-center justify-between mb-5 border-b border-b-gray-200/60 pb-2'>
                                          <div className='flex items-center gap-x-3'>
                                             <Avatar
                                                sx={{ width: 32, height: 32 }}
                                                alt={answer.user.name}
                                                src={'/avatar/' + answer.user.avatar}
                                             />
                                             <div className='text-sm w-full'>
                                                <span className='font-bold text-slate-600 block mb-1'>
                                                   {answer.user.name}
                                                </span>
                                                <span className='block text-slate-500 text-xs'>
                                                   ۱ ماه پیش
                                                </span>
                                             </div>
                                          </div>
                                       </div>
                                       <p className='text-gray-700 font-normal leading-loose lg:leading-8 text-xs lg:text-base'>
                                          {answer.body}
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        )
                     })}
                  </div>
               )
            })}
         </div>
      </div>
   )
}

export default Question
