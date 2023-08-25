import Contents from './components/contents'

const CoursesPage = () => {
   return (
      <div className='bg-gradient-to-b rounded-lg pt-4'>
         <div className='mb-20 text-center space-y-6'>
            <h1 className='font-extraBlack text-2xl md:text-4xl'>دوره های آموزش برنامه نویسی</h1>
            <Contents />
         </div>
      </div>
   )
}

export default CoursesPage
