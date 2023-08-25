'use client'

import { toast } from 'react-toastify'
import { useState, useEffect, useCallback } from 'react'
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

const BrandCourses = ({ brandName }: { brandName: string }) => {
   const [brandCourses, setBrandCourses] = useState<CourseExtended[]>([])

   const fetchCourses = useCallback(async () => {
      if (!brandName?.trim().length) return

      const payload = { name: brandName }

      try {
         const res = await fetch('/api/brand/course', {
            method: 'POST',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         const resData = await res.json()

         if (resData) setBrandCourses(resData.courses)
      } catch (err) {
         toast.error('دریافت محصولات به مشکل برخورد کرد!')
         console.error(err)
      }
   }, [brandName])

   useEffect(() => {
      fetchCourses()
   }, [fetchCourses])

   return <CourseCards courses={brandCourses} pageTarget='/course/' userTarget='client' />
}

export default BrandCourses
