import OurFeatures from './components/ourFeatures'
import NewestProducts from './components/newestProducts'
import CommentSection from './components/commentSection'
import OurWorkHistory from './components/ourWorkHistory'
import RoadMap from './components/roadMap'
import Hero from './components/hero'

export const metadata = {
   title: 'تبریزیان دیجیتال ایکامرس',
   description: 'https://github.com/Mostafa-Code19',
}

async function Home() {
   return (
      <div className='px-6 md:px-0 md:mx-auto max-w-screen-md space-y-16 mb-16 mt-24'>
         <Hero />

         <OurFeatures />

         <NewestProducts />

         <CommentSection />

         <OurWorkHistory />

         <RoadMap />
      </div>
   )
}

export default Home
