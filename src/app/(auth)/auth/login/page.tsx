import LoginForm from './form'
import User from '@/lib/user'
import Link from 'next/link'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

export const metadata = {
   title: 'تبریزیان دیجیتال ایکامرس | ورود',
}

const steps = ['احراز هویت', 'تکمیل اطلاعات', 'ثبت سفارش']

const LoginPage = async () => {
   const user = await User()
   return (
      <div className='flex h-screen bg-white'>
         <div className='h-full w-full flex justify-center items-center'>
            <div className='text-center w-full max-w-sm'>
               <Stepper
                  activeStep={0}
                  sx={{ direction: 'rtl', marginBottom: '5rem' }}
                  alternativeLabel
               >
                  {steps.map((label) => (
                     <Step key={label}>
                        <StepLabel>
                           <h6>{label}</h6>
                        </StepLabel>
                     </Step>
                  ))}
               </Stepper>

               <h1>تبریزیان دیجیتال ایکامرس</h1>
               {user ? <h3 className='text-center'>شما قبلا وارد شده اید</h3> : <LoginForm />}
               <div className='text-green-900 text-center mt-10'>
                  <Link href='/auth/register'>
                     <h6 className='font-semibold underline underline-offset-4'>
                        حساب کاربری ندارید؟ برای اینجا کلیک کنید
                     </h6>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   )
}

export default LoginPage
