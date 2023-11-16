import CartItems from './components/cartItems'
import PaymentDetail from './components/paymentDetail'

export const metadata = {
   title: 'اکسپرسیفای | سبد خرید',
}

const Cart = () => {
   return (
      <div className='mx-4 md:mx-auto my-16 max-w-screen-md space-y-6'>
         <h1 className='text-right font-bold'>سبد خرید شما</h1>

         <div className='md:grid md:justify-end flex flex-col-reverse md:grid-cols-2 md:gap-5'>
            <PaymentDetail />

            <CartItems />
         </div>
      </div>
   )
}

export default Cart
