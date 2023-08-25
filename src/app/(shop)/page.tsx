import OurFeatures from './components/ourFeatures'
import NewestCourses from './components/newestCourses'
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
      <div className='space-y-16 mb-16 mt-24'>
         <Hero />

         <OurFeatures />

         <NewestCourses />

         <CommentSection />

         <OurWorkHistory />

         <RoadMap />
      </div>
   )
}

export default Home
