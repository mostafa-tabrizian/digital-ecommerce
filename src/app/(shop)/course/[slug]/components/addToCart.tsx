import Button from '@mui/material/Button'

const AddToCart = () => {
   return (
      <div className='bg-white py-4 px-6 fixed bottom-0 left-0 w-full z-10'>
         <Button className='py-3 w-full rounded-xl' variant='contained'>
            <span className='font-semibold text-white text-base'>ثبت نام دوره</span>
         </Button>
      </div>
   )
}

export default AddToCart
