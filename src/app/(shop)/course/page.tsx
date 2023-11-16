import Contents from './components/contents'

const CoursesPage = () => {
   return (
      <div className='bg-gradient-to-bl rounded-lg pt-4'>
         <div className='mb-20 text-center space-y-6'>
            <h1 className='font-extraBold text-2xl md:my-10 md:text-4xl'>دوره های اکسپرسیفای</h1>
            <Contents />
         </div>
      </div>
   )
}

export default CoursesPage
