import Rating from '@mui/material/Rating'

const Comment = () => {
   return (
      <>
         <div className='bg-white border shadow-xl p-4 lg:p-5 rounded-2xl'>
            <div className='mb-4'>
               <p className='flex items-center text-sm lg:text-base text-green-500'>
                  <svg
                     stroke='currentColor'
                     fill='currentColor'
                     strokeWidth='0'
                     viewBox='0 0 1024 1024'
                     className='ml-1'
                     height='1em'
                     width='1em'
                     xmlns='http://www.w3.org/2000/svg'
                  >
                     <path d='M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 0 0 471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0 1 42.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z'></path>
                  </svg>{' '}
                  پیشنهاد میکنم{' '}
               </p>
            </div>
            <div className='text-sm lg:text-base text-gray-700 font-bold mb-2'>
               <span>کافی نبودن معرفی دوره</span>
            </div>
            <div className='h-44 overflow-y-auto pl-1 mb-2'>
               <div className='my-4 space-y-4 ml-2'></div>
               <p className='text-sm leading-7 text-slate-800 lg:leading-7 mb-4'>
                  چقد حیفه که برای همچین دوره خوبی معرفی کافی از خود دوره گفته نشده از تمرین ها ،
                  دموی پروژه ها و...
               </p>
               <div className='mb-3 space-y-0.5'>
                  <div className='flex items-center gap-x-1 text-sm text-slate-600'>
                     <svg
                        stroke='currentColor'
                        fill='currentColor'
                        strokeWidth='0'
                        viewBox='0 0 20 20'
                        className='text-green-500'
                        height='1em'
                        width='1em'
                        xmlns='http://www.w3.org/2000/svg'
                     >
                        <path
                           fillRule='evenodd'
                           d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
                           clipRule='evenodd'
                        ></path>
                     </svg>
                     <span>سر فصل بندی کامل</span>
                  </div>
                  <div className='flex items-center gap-x-1 text-sm text-slate-600'>
                     <svg
                        stroke='currentColor'
                        fill='currentColor'
                        strokeWidth='0'
                        viewBox='0 0 20 20'
                        className='text-green-500'
                        height='1em'
                        width='1em'
                        xmlns='http://www.w3.org/2000/svg'
                     >
                        <path
                           fillRule='evenodd'
                           d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
                           clipRule='evenodd'
                        ></path>
                     </svg>
                     <span>اشاره به تمام نکات ریز</span>
                  </div>
               </div>
               <div className='mb-3 space-y-0.5'>
                  <div className='flex items-center gap-x-1 text-sm text-slate-600'>
                     <svg
                        className='h-4 w-3 text-red-600'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        strokeWidth='2'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                     >
                        {' '}
                        <path stroke='none' d='M0 0h24v24H0z' />{' '}
                        <line x1='5' y1='12' x2='19' y2='12' />
                     </svg>
                     <span>هیچی</span>
                  </div>
               </div>
            </div>
            <hr />
            <div className='flex justify-between items-center mb-4'>
               <div className='flex items-center gap-x-3 flex-1'>
                  <div className='bg-slate-200 border-2 border-white shadow rounded-full text-center md:w-10 md:h-10 w-8 h-8'>
                     P
                  </div>
                  <div className='flex flex-col justify-evenly text-slate-900'>
                     <div className='flex items-center font-extrabold md:mb-0.5 md:text-sm'>
                        <span className='text-[10px]'> عرشیا جعفرنژاد</span>
                        <span className='mr-1 font-normal text-[10px] lg:text-xs text-slate-400'>
                           (۱۴۰۲/۵/۱۶)
                        </span>
                     </div>
                     <span className='opacity-80'>دانشجو دوره متخصص ریکت و ریداکس</span>
                  </div>
               </div>

               <Rating
                  value={4}
                  readOnly
                  sx={{ direction: 'ltr' }}
                  icon={
                     <span>
                        <svg
                           className='h-3 w-3 text-[#faaf00]'
                           xmlns='http://www.w3.org/2000/svg'
                           viewBox='0 0 24 24'
                           stroke='currentColor'
                           fill='currentColor'
                           strokeLinecap='round'
                           strokeLinejoin='round'
                        >
                           <path d='M9.654 4.586c.878-2.115 3.814-2.115 4.692 0l.612 1.474a2.555 2.555 0 0 0 2.065 1.57l1.707.194c2.155.244 3.046 2.951 1.471 4.475L18.752 13.7a2.636 2.636 0 0 0-.745 2.404l.35 1.77c.443 2.243-1.96 3.936-3.855 2.718l-1.145-.736a2.503 2.503 0 0 0-2.714 0l-1.145.736c-1.896 1.218-4.298-.475-3.855-2.717l.35-1.771a2.637 2.637 0 0 0-.745-2.404l-1.45-1.4c-1.574-1.524-.683-4.23 1.472-4.475l1.707-.194a2.555 2.555 0 0 0 2.065-1.57l.612-1.474Z'></path>
                        </svg>
                     </span>
                  }
                  emptyIcon={
                     <span>
                        <svg
                           className='h-3 w-3 text-slate-800'
                           xmlns='http://www.w3.org/2000/svg'
                           viewBox='0 0 24 24'
                           stroke='currentColor'
                           fill='none'
                           strokeLinecap='round'
                           strokeLinejoin='round'
                        >
                           <path d='M9.654 4.586c.878-2.115 3.814-2.115 4.692 0l.612 1.474a2.555 2.555 0 0 0 2.065 1.57l1.707.194c2.155.244 3.046 2.951 1.471 4.475L18.752 13.7a2.636 2.636 0 0 0-.745 2.404l.35 1.77c.443 2.243-1.96 3.936-3.855 2.718l-1.145-.736a2.503 2.503 0 0 0-2.714 0l-1.145.736c-1.896 1.218-4.298-.475-3.855-2.717l.35-1.771a2.637 2.637 0 0 0-.745-2.404l-1.45-1.4c-1.574-1.524-.683-4.23 1.472-4.475l1.707-.194a2.555 2.555 0 0 0 2.065-1.57l.612-1.474Z'></path>
                        </svg>
                     </span>
                  }
               />
            </div>
         </div>
      </>
   )
}

export default Comment
