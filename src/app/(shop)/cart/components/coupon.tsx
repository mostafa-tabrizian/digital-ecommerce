import { useState, useRef, Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

import { ICoupon } from '@/models/coupon'

let previousCoupon = ''

const CouponComponent = ({
   paymentPrice,
   setCoupon,
}: {
   paymentPrice: number
   setCoupon: Dispatch<SetStateAction<ICoupon | null>>
}) => {
   const [loading, setLoading] = useState(false)
   const couponRef = useRef<HTMLInputElement>(null)

   const { executeRecaptcha } = useGoogleReCaptcha()

   const getCouponData = async (couponCode: string) => {
      if (!executeRecaptcha) return console.log('!executeRecaptcha')

      const gReCaptchaToken = await executeRecaptcha('couponFormSubmit').then(
         (gReCaptchaToken) => gReCaptchaToken,
      )

      const res = await fetch('/api/coupon', {
         method: 'POST',
         body: JSON.stringify({
            code: couponCode,
            gReCaptchaToken,
         }),
      })

      if (!res.ok) throw new Error()

      const resData = await res.json()
      if (resData?.message == 'recaptcha fail') return toast.error('فعالیت شما مشکوک به ربات است')

      return resData
   }

   const couponCheck = async () => {
      const couponCode = couponRef?.current?.value

      if (couponCode?.length && couponCode !== previousCoupon) {
         setLoading(true)
         previousCoupon = couponCode

         try {
            const couponData = await getCouponData(couponCode)

            if (couponData) {
               if (couponData.value >= paymentPrice) couponData.value = paymentPrice

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
               className='mt-1 placeholder:text-sm border border-white focus:shadow-xl focus:shadow-blue-700/20 transition-all focus:border-blue-300 outline-none w-full py-3 pr-4 rounded-lg'
               ref={couponRef}
            />
            <div className='absolute left-2 top-1/2 -translate-y-1/2'>
               <Button
                  disabled={loading}
                  onClick={couponCheck}
                  sx={{ borderRadius: '10px' }}
                  variant='contained'
               >
                  {loading ? (
                     <CircularProgress className='text-white' color='inherit' size={20} />
                  ) : (
                     <span className='text-white font-light'>اعمال کد</span>
                  )}
               </Button>
            </div>
         </div>
      </div>
   )
}

export default CouponComponent
