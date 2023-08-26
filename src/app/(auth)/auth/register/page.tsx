import { RegisterForm } from './form'
import User from '@/lib/user'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { styled } from '@mui/material/styles'
import Link from 'next/link'

export const metadata = {
   title: 'تبریزیان دیجیتال ایکامرس | ثبت نام',
}

const RegisterPage = async () => {
   const user = await User()

   const steps = ['احراز هویت', 'تکمیل اطلاعات', 'ثبت سفارش']

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
               {user ? <h3 className='text-center'>شما قبلا وارد شده اید</h3> : <RegisterForm />}

               <div className='text-green-900 text-center mt-10'>
                  <Link href='/auth/login'>
                     <h6 className='font-semibold underline underline-offset-4'>
                        حساب کاربری داريد؟ اینجا وارد شوید
                     </h6>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   )
}

export default RegisterPage
