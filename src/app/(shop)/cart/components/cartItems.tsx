'use client'

import Image from 'next/legacy/image'
import Link from 'next/link'
import { useContext } from 'react'

import { ICourse } from '@/models/course'
import toFarsiNumber from '@/lib/toFarsiNumber'
import { CartContext } from '@/context/provider/cart'
import EmptyCart from '../components/empty-cart'

const CartItems = () => {
   const { cart, dispatch } = useContext(CartContext) as {
      cart: { [key: string]: ICourse }
      // @ts-ignore
      dispatch
   }

   return (
      <>
         {Object.keys(cart ?? {}).length ? (
            <div className='space-y-3 mb-5 rtl'>
               {Object.values(cart).map((item) => {
                  return (
                     <div
                        key={item._id}
                        className='bg-white rounded-xl p-3 px-9 py-7 mb-5 shadow-sm shadow-gray-100'
                     >
                        <div className='grid grid-cols-12 gap-y-2 gap-x-4'>
                           <div className='col-span-8 flex items-center'>
                              <div className='relative w-16 h-16 ml-3 flex-shrink-0'>
                                 <Image
                                    className='rounded-xl'
                                    src={`/course/${item.image}`}
                                    alt={item.name}
                                    height={100}
                                    width={100}
                                    objectFit='cover'
                                 />
                              </div>
                              <Link
                                 className='yekanBlack text-gray-700 text-sm hover:text-blue-600 transition-all duration-200 mb-3 block'
                                 href={'/course/' + item.name}
                              >
                                 {item.name}
                              </Link>
                           </div>
                           <div className='col-span-12 flex justify-between items-center'>
                              <div className='mr-7 order-2'>
                                 <button
                                    onClick={() => {
                                       dispatch({
                                          type: 'REMOVE_FROM_CART',
                                          payload: { _id: item._id }
                                       })
                                    }}
                                    className='flex items-center justify-center border border-gray-200 rounded-xl p-1  muirtl-jw7pih'
                                 >
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
                                 {item.discount ? (
                                    <div className='flex items-center justify-between mb-1 gap-x-1'>
                                       <div className='text-slate-400 yekan1 text-sm line-through'>
                                          {item.price.toLocaleString('fa')}
                                       </div>
                                       <div className='bg-rose-500 yekan1 rounded-full py-0.5 px-2 text-white text-xs flex justify-center items-center'>
                                          %{' '}
                                          {toFarsiNumber(
                                             Math.round((item.discount * 100) / item.price),
                                          )}
                                       </div>
                                    </div>
                                 ) : (
                                    ''
                                 )}

                                 <div className='font-bold flex items-center'>
                                    <span className='text-blue-600 yekanBlack ml-2 text-2xl'>
                                       {(item.price - item.discount).toLocaleString('fa')}
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
                  )
               })}
            </div>
         ) : (
            <EmptyCart />
         )}
      </>
   )
}

export default CartItems
