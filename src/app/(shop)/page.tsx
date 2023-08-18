import OurFeatures from './components/ourFeatures'
import NewestProducts from './components/newestProducts'
import { prisma } from '@/lib/prisma'
import CommentSection from './components/commentSection'
import OurWorkHistory from './components/ourWorkHistory'
import RoadMap from './components/roadMap'
import Hero from './components/hero'

export const metadata = {
   title: 'تبریزیان دیجیتال ایکامرس',
   description: 'https://github.com/Mostafa-Code19',
}

async function getProducts() {
   return await prisma.product
      .findMany({
         include: {
            productLocation: {
               where: {
                  public: {
                     equals: true,
                  },
                  quantity: {
                     gt: 0,
                  },
               },
               include: {
                  color: {
                     select: {
                        color: true,
                     },
                  },
                  size: {
                     select: {
                        size: true,
                     },
                  },
               },
            },
            gallery: {
               select: {
                  src: true,
                  alt: true,
               },
            },
         },
      })
      .then((res) => res)
}

async function Home() {
   const products = await getProducts()

   return (
      <div className='px-6 md:px-0 md:mx-auto max-w-screen-md space-y-16 mb-16 mt-24'>
         <Hero />

         <OurFeatures />

         <NewestProducts products={products} />

         <CommentSection />

         <OurWorkHistory />

         <RoadMap />
      </div>
   )
}

export default Home
