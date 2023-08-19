import Rating from '@mui/material/Rating'

const RatingCourse = () => {
   return (
      <div>
         <Rating
            value={4}
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
         <div>
            <span className='flex items-center text-xs font-bold text-slate-500'>
               ۵&nbsp; از &nbsp;۹&nbsp; رای
            </span>
         </div>
      </div>
   )
}

export default RatingCourse
