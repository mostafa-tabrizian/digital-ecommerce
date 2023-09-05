'use client'

import '@/app/globals.scss'
import { CartContextProvider } from '@/context/provider/cart'
import 'react-toastify/dist/ReactToastify.min.css'

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang='en'>
         <body>
            <GoogleReCaptchaProvider
               reCaptchaKey='6LdpgP4nAAAAAJS3rvxwPtNmzv3lLtyidMYNLRoP'
               scriptProps={{
                  async: false,
                  defer: false,
                  appendTo: 'head',
                  nonce: undefined,
               }}
            >
               <SessionProvider>
                  <CartContextProvider>
                     <ToastContainer
                        position='top-center'
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme='light'
                     />

                     <main className='overflow-x-hidden mx-auto'>{children}</main>
                  </CartContextProvider>
               </SessionProvider>
            </GoogleReCaptchaProvider>
         </body>
      </html>
   )
}
