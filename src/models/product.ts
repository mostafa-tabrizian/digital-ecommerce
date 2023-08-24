import mongoose from 'mongoose'

export interface IProduct {
   _id: string
   name: string
   price: number
   discount: number
   status: string
   image: string
   description: string
   questions: [
      {
         username: string
         body: string
         answer: [
            {
               username: string
               body: string
            },
         ]
      },
   ]
   comments: [
      {
         username: string
         body: string
         rate: number
      },
   ]
   likes: []
   faq: [
      {
         body: string
         answer: string
      },
   ]
   purchaser: []
}

const ProductSchema = new mongoose.Schema<IProduct>({
   name: String,
   price: Number,
   discount: Number,
   status: {
      type: String,
      enum: ['comingSoon', 'recording', 'completed'],
   },
   image: String,
   description: String,
   questions: [
      {
         username: String,
         body: String,
         answer: [
            {
               username: String,
               body: String,
            },
         ],
      },
   ],
   comments: [
      {
         username: String,
         body: String,
         rate: [
            {
               type: Number,
               enum: [1, 2, 3, 4, 5],
            },
         ],
      },
   ],
   likes: [],
   faq: [
      {
         body: String,
         answer: String,
      },
   ],
   purchaser: [],
})

ProductSchema.set('timestamps', true)

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
