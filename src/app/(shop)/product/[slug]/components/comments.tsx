import Button from '@mui/material/Button'

const Comments = () => {
   return (
      <>
         <Button sx={{ width: '100%' }} variant='outlined'>
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
      </>
   )
}

export default Comments
