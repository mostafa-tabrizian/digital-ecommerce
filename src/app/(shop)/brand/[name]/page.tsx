import BrandCourses from './brand.courses'

export const generateMetadata = async ({ params }: { params: { name: string } }) => {
   return {
      title: params.name + ' | تبریزیان دیجیتال ایکامرس',
   }
}

const Brand = ({ params }: { params: { name: string } }) => {
   const brandName = params.name

   return (
      <div className='mx-6 md:mx-auto max-w-screen-md my-8 space-y-7'>
         <BrandCourses brandName={brandName} />
      </div>
   )
}

export default Brand
