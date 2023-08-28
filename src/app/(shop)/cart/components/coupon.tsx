import { useState, useRef, Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'

type Discount =
   | {
        type: string
        value: number
     }
   | null
   | false

let previousCoupon = ''

const CouponComponent = ({
   price,
   setCoupon,
}: {
   price: number
   setCoupon: Dispatch<SetStateAction<Discount>>
}) => {
   const [loading, setLoading] = useState(false)
   const couponRef = useRef<HTMLInputElement>(null)

   const getCouponData = async (couponCode: string) => {
      const res = await fetch(`/api/coupon?c=${couponCode}`)

      if (!res.ok) throw Error()

      return res.json()
   }

   const couponCheck = async () => {
      const couponCode = couponRef?.current?.value

      if (couponCode?.length && couponCode !== previousCoupon) {
         setLoading(true)
         previousCoupon = couponCode

         try {
            const couponData = await getCouponData(couponCode)

            if (couponData) {
               if (couponData.value > price) couponData.value = price

               setCoupon(couponData)
               toast.success('تخفیف با موفقیت به شما تعلق گرفت')
            } else {
               toast.error('کد تخفیف وارد شده منقضی یا نامعتبر می‌باشد')
            }
         } catch (err) {
            toast.error('به مشکلی برخوردیم! لطفا مجدد تلاش کنید.')
            console.error(err)
         } finally {
            setLoading(false)
         }
      } else {
         if (!couponCode?.length) toast.error('لطفا ابتدا کد تخفیف را وارد نمایٔید')
      }
   }

   return (
      // <div className='flex justify-between items-center space-x-3'>
      //    <div className='border flex rounded-lg px-2 py-2 space-x-4 relative'>
      //       {loading ? (
      //          <span className='text-green-700 inline-block my-4 absolute -top-1'>
      //             در حال بررسی...
      //          </span>
      //       ) : (
      //          <button disabled={loading} onClick={couponCheck}>
      //             <span>ثبت</span>
      //          </button>
      //       )}
      //       <input
      //          ref={couponRef}
      //          type='text'
      //          className='text-right text-sm pr-2 bg-transparent'
      //          placeholder='کد تخفیف'
      //       />
      //    </div>
      //    <h3>کد تخفیف</h3>
      // </div>

      <div className='rtl'>
         <label htmlFor='coupon' className='text-gray-600 text-sm'>
            کد تخفیف
         </label>
         <div className='relative'>
            <input
               placeholder='کد تخفیف را وارد کنید'
               type='text'
               name='coupon'
               id='coupon'
               className='mt-1 placeholder:text-sm focus:shadow-xl border border-white focus:shadow-blue-700/20 transition-all focus:border-blue-300 outline-none w-full py-3 pr-4 rounded-lg'
               ref={couponRef}
            />
            {loading ? (
               <span className='text-green-700 inline-block my-4 absolute -top-1'>
                  در حال بررسی...
               </span>
            ) : (
               <div className='absolute left-2 top-1/2 -translate-y-1/2'>
                  <Button sx={{borderRadius: '10px'}} variant='contained'>
                     <span className='text-white font-light'>اعمال کد</span>
                  </Button>
               </div>
            )}
         </div>
      </div>
   )
}

export default CouponComponent
