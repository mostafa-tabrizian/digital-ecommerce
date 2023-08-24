// import { Product } from '@prisma/client'
//

import dbConnect from '@/lib/dbConnect'
import Product from '@/models/product'

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'

export async function GET() {
   await dbConnect()

   const products = await Product.find()

   return NextResponse.json(products)
}

// export async function POST(request: Request) {

//    const p = await request.json()

//    await dbConnect()

//    const products = await Product.find()

//    return NextResponse.json(products)
// }

// export async function PATCH(request: Request) {
//    const session: { email: string; role: string } | null = await getServerSession(authOptions) // ! try lib
//    const reqData = await request.json()

//    //  @ts-ignore
//    if (!session?.role == 'ADMIN') return

//    try {
//       const product: Product | null = await prisma.product.update({
//          where: {
//             id: reqData.id,
//          },
//          data: reqData.data,
//       })

//       return NextResponse.json(product)
//    } catch (err) {
//       console.error('err api/product/update', err)
//       NextResponse.error()
//    }
// }
