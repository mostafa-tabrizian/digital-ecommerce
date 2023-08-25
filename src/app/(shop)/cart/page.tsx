'use client'

import Image from 'next/legacy/image'
import { useContext, useState, useEffect } from 'react'

import { CartContext } from '@/context/provider/cart'
import Link from 'next/link'
// import EmptyCart from '@/components/empty-cart'
import CartItemType from '@/types/type.cartItems'
import Button from '@mui/material/Button'
import CouponComponent from './components/coupon'

const Cart = () => {
   const { cart, dispatch } = useContext(CartContext) as {
      cart: CartItemType
      // @ts-ignore
      dispatch
   }
   const [price, setPrice] = useState(0)
   const [discount, setDiscount] = useState(0)
   const [paymentPrice, setPaymentPrice] = useState(0)

   const [coupon, setCoupon] = useState<Coupon>(null)
   const [couponValue, setCouponValue] = useState(0)

   useEffect(() => {
      document.title = 'تبریزیان دیجیتال ایکامرس | سبد خرید'
   }, [])

   useEffect(() => {
      let price = 0
      let discount = 0

      Object.values(cart).forEach((item) => {
         price += item.price * item.quantity
         discount += ((item.price * item.discount) / 100) * item.quantity
      })

      setPrice(price)
      setDiscount(discount)
      setPaymentPrice(price - discount)
   }, [cart])

   useEffect(() => {
      let couponValue = 0

      if (coupon) {
         if (coupon.type == 'PERCENTAGE') {
            couponValue = (coupon.value * (price - discount)) / 100
         } else if (coupon.type == 'PRICE') {
            couponValue = coupon.value
         } else return
      }

      couponValue = Math.round(couponValue / 1000) * 1000

      setCouponValue(couponValue)
      setPaymentPrice(Math.round((price - discount - couponValue) / 1000) * 1000)
   }, [price, coupon, discount])

   const item = {}

   return (
      <div className='mx-4 md:mx-auto my-16 max-w-screen-md space-y-6'>
         <h1 className='text-right font-bold'>سبد خرید شما</h1>

         <div>
            {/* {Object.keys(cart ?? {}).length ? ( */}
            <div className='md:grid md:justify-end flex flex-col-reverse md:grid-cols-2'>
               <div className='bg-white rounded-xl p-5 space-y-5'>
                  <div className='flex space-x-2 justify-end border-b border-b-gray-200/70 pb-4'>
                     <span className='text-slate-700 text-right text-base yekanBlack'>
                        اطلاعات پرداخت
                     </span>
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='none'
                        className='h-5 w-5'
                     >
                        <path
                           fill='currentColor'
                           d='M18.333 5v2.017c0 1.316-.833 2.15-2.15 2.15h-2.85V3.342c0-.925.759-1.675 1.684-1.675a3.35 3.35 0 0 1 2.341.975c.6.608.975 1.441.975 2.358Z'
                        ></path>
                        <path
                           fill='currentColor'
                           d='M1.667 5.833V17.5A.83.83 0 0 0 3 18.167L4.425 17.1a.84.84 0 0 1 1.1.083l1.383 1.392a.84.84 0 0 0 1.184 0l1.4-1.4a.826.826 0 0 1 1.083-.075L12 18.167a.835.835 0 0 0 1.333-.667V3.333c0-.916.75-1.666 1.667-1.666H5C2.5 1.667 1.667 3.158 1.667 5v.833Z'
                           opacity='0.4'
                        ></path>
                        <path
                           fill='currentColor'
                           d='M10 8.125H5a.63.63 0 0 1-.625-.625A.63.63 0 0 1 5 6.875h5a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625Zm-.625 3.333h-3.75A.63.63 0 0 1 5 10.833a.63.63 0 0 1 .625-.625h3.75a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625Z'
                        ></path>
                     </svg>
                  </div>

                  <div className='border-b border-b-gray-200/70 pb-4 mb-2'>
                     <CouponComponent price={paymentPrice} setCoupon={setCoupon} />

                     {couponValue ? (
                        <div className='text-center mt-5'>
                           <span className='text-green-700'>
                              کد تخفیف با موفقیت اعمال شد: {couponValue.toLocaleString()} تومان
                           </span>
                        </div>
                     ) : (
                        ''
                     )}
                  </div>

                  <div className='border-b border-b-gray-200/70 pb-1 mb-2'>
                     <div className='flex items-center justify-between mb-2'>
                        <span className='text-slate-600 tracking-wider text-base font-bold'>
                           ۳,۰۸۷,۰۰۰
                        </span>
                        <span className='text-gray-600 text-base font-bold'>جمع کل</span>
                     </div>
                     <div className='flex items-center justify-between mb-2'>
                        <span className='text-rose-500 tracking-wider text-base font-bold'>
                           - ۹۸,۰۰۰
                        </span>
                        <span className='text-gray-600 text-base font-bold'>تخفیف</span>
                     </div>
                  </div>

                  <div className='flex items-center justify-between mb-6'>
                     <span className='text-blue-600 tracking-wider yekanBlack text-xl flex items-center'>
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           data-name='Layer 2'
                           viewBox='0 0 51.29 27.19'
                           width='51'
                           height='27'
                           className='w-4 h-4 text-slate-100 mr-1'
                           stroke='currentColor'
                        >
                           <path
                              d='M36.48 22.85c1.78-.83 2.93-1.81 3.45-2.94h-1.65c-2.53 0-4.69-.66-6.47-1.97-.59.68-1.23 1.2-1.93 1.55s-1.54.53-2.5.53c-1.03 0-1.87-.18-2.51-.53-.65-.35-1.14-.96-1.5-1.83-.35-.87-.56-2.08-.63-3.62-.02-.28-.04-.6-.04-.97s-.01-.72-.04-1.07c-.14-3.42-.28-6.26-.42-8.51l-5.8 1.37c.73 1.64 1.34 3.34 1.83 5.08.49 1.75.74 3.58.74 5.5 0 1.6-.37 3.12-1.11 4.57-.74 1.46-1.85 2.64-3.32 3.57-1.48.93-3.27 1.39-5.38 1.39s-3.82-.45-5.21-1.34C2.61 22.74 1.6 21.6.96 20.22c-.63-1.38-.95-2.84-.95-4.36 0-1.2.13-2.28.4-3.25.27-.97.63-1.93 1.07-2.87l2.39 1.34c-.38.92-.65 1.71-.83 2.39-.18.68-.26 1.48-.26 2.39 0 1.76.49 3.19 1.48 4.29s2.63 1.65 4.92 1.65c1.55 0 2.87-.32 3.96-.95 1.09-.63 1.9-1.44 2.43-2.43.53-.98.79-1.98.79-2.99 0-2.65-.82-5.82-2.46-9.5l1.69-3.52L22.38.79c.16-.05.39-.07.67-.07.54 0 .98.19 1.32.56s.53.88.58 1.51c.14 2.04.27 5.02.39 8.94.02.38.04.75.04 1.13s.01.71.04 1.02c.05 1.03.22 1.78.53 2.25s.81.7 1.51.7c.84 0 1.52-.18 2.04-.53.52-.35.97-1 1.37-1.93.75-1.71 1.33-2.96 1.74-3.75.41-.79.94-1.46 1.58-2.04.64-.57 1.44-.86 2.37-.86 1.83 0 3.27.94 4.31 2.83s1.69 4.06 1.95 6.53c1.57-.02 2.77-.13 3.61-.33.83-.2 1.41-.49 1.72-.88.32-.39.47-.89.47-1.5 0-.75-.16-1.67-.49-2.76-.33-1.09-.69-2.1-1.09-3.04l2.43-1.23c1.22 3.1 1.83 5.44 1.83 7.04 0 1.83-.67 3.18-2 4.04-1.34.87-3.53 1.34-6.58 1.41-.49 2.21-1.8 3.93-3.92 5.19-2.12 1.25-4.68 1.98-7.69 2.16l-1.2-2.88c2.6-.14 4.8-.63 6.58-1.46ZM10.38 5.66l.11 3.31-3.2.28-.46-3.31 3.55-.28Zm25.1 10.83c.88.28 1.81.42 2.8.42h1.93c-.16-1.67-.55-3.08-1.16-4.26-.61-1.17-1.38-1.76-2.32-1.76-.75 0-1.42.45-2.02 1.34-.6.89-1.11 1.92-1.53 3.1.66.49 1.42.88 2.3 1.16ZM43.64.21C45.06.07 46.43 0 47.74 0c.96 0 1.67.02 2.11.07l-.21 2.81c-.42-.05-1.08-.07-1.97-.07-1.2 0-2.44.07-3.73.21s-2.44.32-3.45.53L39.86.81c1.1-.26 2.36-.46 3.78-.6Z'
                              data-name='Layer 1'
                           ></path>
                        </svg>
                        ۲,۹۸۹,۰۰۰
                     </span>
                     <span className='text-gray-600 text-base font-bold'>ملبغ قابل پرداخت</span>
                  </div>

                  <Link href='/checkout/payment' className='block'>
                     <Button className='w-full rounded-xl py-3' variant='contained'>
                        پرداخت سفارش
                     </Button>
                  </Link>
               </div>

               <div className='space-y-3 mb-5 rtl'>
                  {/* {Object.values(cart).map((item) => { */}
                  {/* return ( */}
                  <div className='bg-white rounded-xl p-3 sm:px-9 sm:py-7 mb-5 shadow-sm shadow-gray-100'>
                     <div className='grid grid-cols-12 gap-y-2 gap-x-4'>
                        <div className='col-span-12 sm:col-span-8 flex items-center'>
                           <div className='relative w-16 h-16 lg:w-28 lg:h-28 ml-2 sm:ml-3 flex-shrink-0'>
                              <Image
                                 // src={`${course.gallery[0].src}`}
                                 className='rounded-xl'
                                 src={'/courses/nexjs.svg'}
                                 // alt={course.title}
                                 alt='{course.title}'
                                 height={100}
                                 width={100}
                                 objectFit='cover'
                              />
                           </div>
                           <div>
                              <a
                                 className='yekanBlack text-gray-700 text-sm md:text-2xl hover:text-blue-600 transition-all duration-200 mb-3 block'
                                 href='/courses/react-course'
                              >
                                 دوره متخصص ریکت و ریداکس
                              </a>
                              <div className='flex items-center'>
                                 <svg
                                    stroke='currentColor'
                                    fill='currentColor'
                                    strokeWidth='0'
                                    viewBox='0 0 24 24'
                                    className='w-4 h-4 text-slate-600'
                                    height='1em'
                                    width='1em'
                                    xmlns='http://www.w3.org/2000/svg'
                                 >
                                    <g>
                                       <path fill='none' d='M0 0h24v24H0z'></path>
                                       <path d='M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm6 10.5l-2.939 1.545.561-3.272-2.377-2.318 3.286-.478L18 14l1.47 2.977 3.285.478-2.377 2.318.56 3.272L18 21.5z'></path>
                                    </g>
                                 </svg>
                                 <span className='text-[10px] font-bold text-slate-600'>
                                    مدرس دوره : مصطفی تبریزیان
                                 </span>
                              </div>
                           </div>
                        </div>
                        <div className='col-span-12 sm:col-span-4 flex justify-between items-center sm:justify-end'>
                           <div className='sm:mr-7 sm:order-2'>
                              <button className='flex items-center justify-center border border-gray-200 rounded-xl p-1  muirtl-jw7pih'>
                                 <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    className='w-5 h-5 text-rose-500'
                                 >
                                    <path
                                       stroke='currentColor'
                                       strokeLinecap='round'
                                       strokeWidth='1.5'
                                       d='M10 12.708v3.884m4-3.884v3.884m-8.702-3.975A5.728 5.728 0 0 1 6.626 9.78a30.54 30.54 0 0 0 10.748 0 5.729 5.729 0 0 1 1.328 2.837l.038.233a7.347 7.347 0 0 1-.191 3.193l-.118.411c-.656 2.293-2.612 4.016-5.026 4.427-.93.159-1.88.159-2.81 0-2.414-.411-4.37-2.134-5.026-4.427l-.118-.411a7.347 7.347 0 0 1-.19-3.192l.037-.234Zm12.213-2.862c-3.642.668-7.38.668-11.022 0C5.625 9.596 5 8.864 5 8.011v-.147c0-1.078.9-1.952 2.01-1.952h9.98c1.11 0 2.01.874 2.01 1.952v.147c0 .853-.625 1.585-1.489 1.744ZM9.228 4.798C9.078 5.15 9 5.53 9 5.912h6c0-.382-.078-.76-.228-1.114a2.907 2.907 0 0 0-.65-.945 3.008 3.008 0 0 0-.974-.631 3.079 3.079 0 0 0-2.296 0c-.364.146-.695.36-.973.631-.279.27-.5.592-.65.945Z'
                                    ></path>
                                 </svg>
                              </button>
                           </div>
                           <div className='flex flex-col justify-between '>
                              <div className='flex items-center justify-between mb-1 gap-x-1'>
                                 <div className='text-slate-400 yekan1 text-sm line-through'>
                                    ۲,۹۸۹,۰۰۰
                                 </div>
                                 <div className='bg-rose-500 yekan1 rounded-full py-0.5 px-2 text-white text-xs flex justify-center items-center'>
                                    % ۱۰۰
                                 </div>
                              </div>

                              <div className='font-bold flex items-center'>
                                 <span className='text-blue-600 yekanBlack ml-2 sm:text-2xl'>
                                    ۲,۹۸۹,۰۰۰
                                 </span>
                                 <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    data-name='Layer 2'
                                    viewBox='0 0 51.29 27.19'
                                    width='51'
                                    height='27'
                                    className='text-gray-100 w-5 h-5'
                                    stroke='currentColor'
                                 >
                                    <path
                                       d='M36.48 22.85c1.78-.83 2.93-1.81 3.45-2.94h-1.65c-2.53 0-4.69-.66-6.47-1.97-.59.68-1.23 1.2-1.93 1.55s-1.54.53-2.5.53c-1.03 0-1.87-.18-2.51-.53-.65-.35-1.14-.96-1.5-1.83-.35-.87-.56-2.08-.63-3.62-.02-.28-.04-.6-.04-.97s-.01-.72-.04-1.07c-.14-3.42-.28-6.26-.42-8.51l-5.8 1.37c.73 1.64 1.34 3.34 1.83 5.08.49 1.75.74 3.58.74 5.5 0 1.6-.37 3.12-1.11 4.57-.74 1.46-1.85 2.64-3.32 3.57-1.48.93-3.27 1.39-5.38 1.39s-3.82-.45-5.21-1.34C2.61 22.74 1.6 21.6.96 20.22c-.63-1.38-.95-2.84-.95-4.36 0-1.2.13-2.28.4-3.25.27-.97.63-1.93 1.07-2.87l2.39 1.34c-.38.92-.65 1.71-.83 2.39-.18.68-.26 1.48-.26 2.39 0 1.76.49 3.19 1.48 4.29s2.63 1.65 4.92 1.65c1.55 0 2.87-.32 3.96-.95 1.09-.63 1.9-1.44 2.43-2.43.53-.98.79-1.98.79-2.99 0-2.65-.82-5.82-2.46-9.5l1.69-3.52L22.38.79c.16-.05.39-.07.67-.07.54 0 .98.19 1.32.56s.53.88.58 1.51c.14 2.04.27 5.02.39 8.94.02.38.04.75.04 1.13s.01.71.04 1.02c.05 1.03.22 1.78.53 2.25s.81.7 1.51.7c.84 0 1.52-.18 2.04-.53.52-.35.97-1 1.37-1.93.75-1.71 1.33-2.96 1.74-3.75.41-.79.94-1.46 1.58-2.04.64-.57 1.44-.86 2.37-.86 1.83 0 3.27.94 4.31 2.83s1.69 4.06 1.95 6.53c1.57-.02 2.77-.13 3.61-.33.83-.2 1.41-.49 1.72-.88.32-.39.47-.89.47-1.5 0-.75-.16-1.67-.49-2.76-.33-1.09-.69-2.1-1.09-3.04l2.43-1.23c1.22 3.1 1.83 5.44 1.83 7.04 0 1.83-.67 3.18-2 4.04-1.34.87-3.53 1.34-6.58 1.41-.49 2.21-1.8 3.93-3.92 5.19-2.12 1.25-4.68 1.98-7.69 2.16l-1.2-2.88c2.6-.14 4.8-.63 6.58-1.46ZM10.38 5.66l.11 3.31-3.2.28-.46-3.31 3.55-.28Zm25.1 10.83c.88.28 1.81.42 2.8.42h1.93c-.16-1.67-.55-3.08-1.16-4.26-.61-1.17-1.38-1.76-2.32-1.76-.75 0-1.42.45-2.02 1.34-.6.89-1.11 1.92-1.53 3.1.66.49 1.42.88 2.3 1.16ZM43.64.21C45.06.07 46.43 0 47.74 0c.96 0 1.67.02 2.11.07l-.21 2.81c-.42-.05-1.08-.07-1.97-.07-1.2 0-2.44.07-3.73.21s-2.44.32-3.45.53L39.86.81c1.1-.26 2.36-.46 3.78-.6Z'
                                       data-name='Layer 1'
                                    ></path>
                                 </svg>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* )
                     })} */}
               </div>
            </div>
            {/* ) : (
               // <EmptyCart />
               <h1>Empty</h1>
            )} */}
         </div>
      </div>
   )
}

export default Cart
