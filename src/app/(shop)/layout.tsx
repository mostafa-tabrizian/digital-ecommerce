import '@/app/globals.scss'
import Navbar from '@/components/navbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <main className='mb-24 max-w-screen-lg overflow-x-hidden mx-auto'>{children}</main>

         <Navbar />
      </>
   )
}
