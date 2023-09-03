import Avatar from '@mui/material/Avatar'
import SubmitQuestion from './submitQuestion'
import { ICourse } from '@/models/course'
import SubmitAnswer from './submitAnswer';
import DateFormat from '@/app/(shop)/components/dateFormat';

const Question = ({ course }: { course: { id: string; questions: ICourse['questions'] } }) => {
   return (
      <div className='bg-white rtl font-semibold rounded-xl mt-6 p-3 lg:p-6'>
         <h2 className='text-2xl text-right text-blue-600 mb-5'>پرسش های شما</h2>

         <SubmitQuestion courseId={course.id} />

         <div className='space-y-8 mt-6'>
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
                                 <span className='block text-slate-500 text-xs'>{DateFormat(question.createdAt)}</span>
                              </div>
                           </div>
                           <SubmitAnswer question={question} />
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
                                 <div className='border w-full border-gray-100 bg-gray-50/80 rounded-xl p-2 sm:p-4 mb-3 mr-3'>
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
                                                   {DateFormat(answer.createdAt)}
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
