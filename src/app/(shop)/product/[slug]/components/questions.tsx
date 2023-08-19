import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'

const Question = () => {
   return (
      <div className='bg-white rtl font-semibold rounded-xl mt-6 p-3 lg:p-6'>
         <h2 className='text-2xl text-right text-blue-600 mb-5'>پرسش های شما</h2>
         <Button sx={{ width: '100%' }} variant='outlined'>
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

         <div className='space-y-8'>
            <div className='border border-gray-200 rounded-xl p-2 sm:p-4 mb-3'>
               <div className='flex items-center justify-between mb-5 border-b border-b-gray-200/60 pb-2'>
                  <div className='flex items-center gap-x-3'>
                     <Avatar
                        sx={{ width: 32, height: 32 }}
                        alt='Mostaf Tabrizian'
                        src='/avatar/avatar2.jpg'
                     />
                     <div className='text-sm w-full'>
                        <span className='font-bold text-slate-600 block mb-1'>ali taheri</span>
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
               <p className='text-slate-700 font-normal leading-loose lg:leading-8 text-xs lg:text-base'>
                  سلام وخداقوت سورس کد های هر درس چطور میتونیم دسرسی داشته باشیم؟؟
               </p>
            </div>
            <div className='relative'>
               <div className='answer-item border border-gray-100 bg-gray-50/80 rounded-xl p-2 sm:p-4 last-item'>
                  <div className='flex items-center justify-between mb-5 border-b border-b-gray-200/60 pb-2'>
                     <div className='flex items-center '>
                        <Avatar
                           sx={{ width: 32, height: 32 }}
                           alt='Mostaf Tabrizian'
                           src='/avatar/me.jpg'
                        />
                        <div className='text-sm w-full text-secondary-600'>
                           <span className='font-bold block mb-1'>صاحب محمدی</span>
                           <span className='block text-secondary-500 text-xs'>۱ ماه پیش</span>
                        </div>
                     </div>
                  </div>
                  <p className='text-secondary-700 font-normal leading-loose lg:leading-8 text-xs lg:text-base'>
                     سلام به پشتیبانی تلگرام پیام بدین، راهنمایی میشید.
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Question
