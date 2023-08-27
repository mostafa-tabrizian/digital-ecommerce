'use client'

import { CartContext } from '@/context/provider/cart'
import { ICourse } from '@/models/course'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { useMemo, useContext } from 'react'
import { toast } from 'react-toastify'

const AddToCart = ({ course }: { course: ICourse }) => {
   // @ts-ignore
   const { cart, dispatch } = useContext(CartContext)

   const cartItems = useMemo(() => {
      return cart
   }, [cart])

   const addToCartReducer = () => {
      const alreadyInCart = cartItems[course._id]

      if (alreadyInCart) return

      const payload = {
         id: course._id,
         title: course.name,
         price: course.price,
         discount: course.discount,
         image: course.image,
      }

      dispatch({
         type: 'ADD_TO_CART',
         payload: payload,
      })

      toast.success(`${course.name} به سبد خرید اضافه شد`)
   }

   return (
      <>
         {cartItems[course._id] ? (
            <Link href='/cart'>
               <Button className='py-3 w-full rounded-xl' variant='contained'>
                  <span className='font-semibold text-white text-base'>ادامه سفارش</span>
               </Button>
            </Link>
         ) : (
            <Button
               onClick={() => addToCartReducer()}
               className='py-3 w-full rounded-xl'
               variant='contained'
            >
               <span className='font-semibold text-white text-base'>ثبت نام دوره</span>
            </Button>
         )}
      </>
   )
}

export default AddToCart
