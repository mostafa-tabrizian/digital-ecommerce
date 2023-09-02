import SwiperComments from './swiperComment'

const CommentSection = () => {
   return (
      <>
         <div className='flex justify-end items-center gap-x-3 mb-4'>
            <h2 className='text-xl lg:text-4xl'>نظرات دانشجویان</h2>
            <div className='p-3 relative drop-shadow flex items-center justify-center from-blue-300 to-blue-500 bg-gradient-to-r rounded-3xl'>
               <svg
                  viewBox='0 0 74 74'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-full h-full top-0 left-0 absolute'
               >
                  <path
                     d='M73.302 36.65c0 24.435-12.217 36.652-36.651 36.652C12.217 73.302 0 61.085 0 36.65 0 12.217 12.217 0 36.65 0c24.435 0 36.652 12.217 36.652 36.65Z'
                     fill='url(#warranty-holder_svg__a)'
                  ></path>
               </svg>
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  className='w-7 h-7 lg:w-11 lg:h-11 text-white z-10'
               >
                  <path
                     stroke='currentColor'
                     strokeLinecap='round'
                     strokeWidth='1.5'
                     d='M8.696 9.058h6.032m-6.032 3.456h3.839m.576 6.413h1.061c2.887 0 5.398-2.077 6.076-5.025a9.955 9.955 0 0 0 0-4.455l-.09-.386c-.652-2.841-2.781-5.049-5.494-5.698l-.381-.092a9.853 9.853 0 0 0-4.593 0l-.224.054c-2.81.672-5.014 2.959-5.69 5.901-.37 1.61-.367 3.303.003 4.912.687 2.989 2.708 5.476 5.419 6.635l.118.05c1.173.502 2.517-.102 2.998-1.333a.866.866 0 0 1 .797-.563Z'
                  ></path>
               </svg>
            </div>
         </div>
         <p className='text-xs text-center opacity-80 lg:text-base leading-6 lg:leading-8'>
            {' '}
            اینا فقط بخش کوچکی از تجربه دانشجویان دیجیتال ایکامرس هست
         </p>

         {/* <SwiperComments /> */}
      </>
   )
}

export default CommentSection
