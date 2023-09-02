'use client'

import { useState } from 'react'
import LoginForm from '../login/form'
import RegisterForm from '../register/form'

const AuthSection = () => {
   const [formTypeIsLogin, setFormTypeIsLogin] = useState(true)

   return (
      <div>
         {formTypeIsLogin ? <LoginForm /> : <RegisterForm />}

         <div className='text-green-900 text-center mt-10'>
            <button onClick={() => setFormTypeIsLogin((prev) => !prev)}>
               <h6 className='font-semibold underline underline-offset-4'>
                  {formTypeIsLogin
                     ? 'حساب کاربری ندارید؟ اینجا کلیک کنید'
                     : 'حساب کاربری داريد؟ اینجا کلیک کنید'}
               </h6>
            </button>
         </div>
      </div>
   )
}

export default AuthSection
