'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Course, CourseLocation } from '@prisma/client'
import CourseCards from '@/components/course/cards'

type CourseLocationExtended = CourseLocation & {
   color: { color: string }
   size: { size: number }
}
type CourseExtended = Course & {
   gallery: { src: string; alt: string }[]
   courseLocation: CourseLocationExtended[]
}

const Search = () => {
   const [searchResult, setSearchResult] = useState<CourseExtended[]>([])

   const router = useSearchParams()
   const query = router.get('query')

   const fetchCourses = useCallback(async () => {
      if (!query?.trim().length) return

      try {
         const res = await fetch('/api/search', {
            method: 'POST',
            body: JSON.stringify({ title: query }),
         })

         if (!res.ok) throw new Error()

         const resData = await res.json()

         setSearchResult(resData)
      } catch (err) {
         toast.error('دریافت محصولات به مشکل برخورد کرد!')
         console.error(err)
      }
   }, [query])

   useEffect(() => {
      document.title = 'Search | تبریزیان دیجیتال ایکامرس'
      fetchCourses()
   }, [fetchCourses])

   return (
      <>
         <div className='mx-6 md:mx-auto max-w-screen-md my-8 space-y-16'>
            <h1 className='text-center font-bold'>{query}</h1>
            <CourseCards courses={searchResult} pageTarget='/course/' userTarget='client' />
         </div>
      </>
   )
}

export default Search
