import { NextResponse } from 'next/server'

export async function POST(request: Request) {
   const { publicState, courseId, color, size, quantity, price, discount } = await request.json()

   const colorData = await prisma.color
      .create({
         data: {
            color: color,
         },
      })
      .then((res) => res)

   const sizeData = await prisma.size
      .create({
         data: {
            size: parseInt(size),
         },
      })
      .then((res) => res)

   const locationData = await prisma.courseLocation.create({
      data: {
         public: publicState,
         courseId: courseId,
         colorId: colorData.id,
         sizeId: sizeData.id,
         quantity: parseInt(quantity),
         price: parseInt(price),
         discount: parseInt(discount),
      },
   })

   return NextResponse.json(locationData)
}