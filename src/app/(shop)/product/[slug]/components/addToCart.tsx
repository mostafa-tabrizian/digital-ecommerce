import Button from '@mui/material/Button'

const AddToCart = () => {
   return (
      <div className='bg-white py-4 px-6 fixed bottom-0 left-0 w-full z-10'>
         <Button sx={{ width: '100%' }} variant='contained'>
            <span className='font-semibold text-white text-base'>ثبت نام دوره</span>
         </Button>
      </div>
   )
}

export default AddToCart
