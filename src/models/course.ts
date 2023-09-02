import mongoose from 'mongoose'

export interface ICourse {
   _id: string
   name: string
   price: number
   discount: number
   status: string
   image: string
   description: string
   createdAt: Date
   chapters: [
      {
         _id: string,
         name: string,
         parts: [{
            _id: string,
            name: string,
            length: number,
            source: string
         }]
      }
   ],
   questions: [
      {
         user: {
            id: string
            avatar: string
            name: string
         },
         body: string
         answer: [
            {
               user: {
                  id: string
                  avatar: string
                  name: string
               },
               body: string
            },
         ]
      },
   ]
   comments:
   [{
      _id: string
      user: {
         id: string
         avatar: string
         name: string
      },
      title: string
      body: string
      rate: number
      suggestion: null | boolean
   }],

   likes: []
   faq: [
      {
         body: string
         answer: string
      },
   ]
   purchaser: []
}

const CourseSchema = new mongoose.Schema({
   name: String,
   price: Number,
   discount: Number,
   status: {
      type: String,
      enum: ['comingSoon', 'recording', 'completed'],
   },
   image: String,
   description: String,
   chapters: [
      {
         name: String,
         parts: [{
            name: String,
            length: Number,
            source: String
         }]
      }
   ],
   questions: [
      {
         user: {
            id: String,
            avatar: String,
            name: String
         },
         body: String,
         answer: [
            {
               user: {
                  id: String,
                  avatar: String,
                  name: String
               },
               body: String,
            },
         ],
      },
   ],
   comments: [
      {
         user: {
            id: String,
            avatar: String,
            name: String
         },
         title: String,
         body: String,
         rate:
         {
            type: Number,
            enum: [0, 25, 50, 75, 100],
         },
         suggestion: Boolean || null
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

CourseSchema.set('timestamps', true)

export default mongoose.models.Course || mongoose.model('Course', CourseSchema)
