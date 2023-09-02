'use client'

import { useState } from 'react'
import LoginForm from '../loginForm'
import RegisterForm from '../register/form'
import ForgotPasswordForm from '../forgotPasswordForm'

const AuthSection = () => {
   const [formTypeIsLogin, setFormTypeIsLogin] = useState<boolean | null>(true)

   return (
      <div>
         {formTypeIsLogin == true ? <LoginForm /> : ''}
         {formTypeIsLogin == false ? <RegisterForm /> : ''}
         {formTypeIsLogin == null ? <ForgotPasswordForm /> : ''}

         <div className='text-green-900 text-center mt-10'>
            <button onClick={() => setFormTypeIsLogin((prev) => !prev)}>
               <h6 className='font-semibold underline underline-offset-4'>
                  {formTypeIsLogin
                     ? 'حساب کاربری ندارید؟ اینجا کلیک کنید'
                     : 'حساب کاربری داريد؟ اینجا کلیک کنید'}
               </h6>
            </button>
         </div>

         {formTypeIsLogin !== null ? (
            <div className='text-green-900 text-center'>
               <button onClick={() => setFormTypeIsLogin(null)}>
                  <h6 className='font-semibold underline underline-offset-4'>
                     رمز خود را فراموش کردید؟ اینجا کلیک کنید
                  </h6>
               </button>
            </div>
         ) : (
            ''
         )}
      </div>
   )
}

export default AuthSection
