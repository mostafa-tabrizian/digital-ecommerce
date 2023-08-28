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

CourseSchema.set('timestamps', true)

export default mongoose.models.Course || mongoose.model('Course', CourseSchema)
