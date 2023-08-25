import '@/app/globals.scss'
import Footer from './components/footer'
import Header from './components/header/header'

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <Header />

         <main className='mb-24 mx-6 md:md-auto max-w-screen-md overflow-x-hidden'>{children}</main>

         <Footer />
      </>
   )
}
