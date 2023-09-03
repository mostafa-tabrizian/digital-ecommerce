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
   updatedAt: Date
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
         _id: string
         user: {
            id: string
            avatar: string
            name: string
         },
         body: string
         answers: [
            {
               _id: string
               user: {
                  id: string
                  avatar: string
                  name: string
               },
               body: string
               createdAt: Date
            },
         ]
         createdAt: Date
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
      positivePoints: string[]
      negativePoints: string[]
      body: string
      rate: number
      suggestion: null | boolean
      createdAt: Date
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
         answers: [
            {
               user: {
                  id: String,
                  avatar: String,
                  name: String
               },
               body: String,
               createdAt: Date
            },
         ],
         createdAt: Date
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
         positivePoints: [String],
         negativePoints: [String],
         body: String,
         rate:
         {
            type: Number,
            enum: [0, 25, 50, 75, 100],
         },
         suggestion: Boolean || null,
         createdAt: Date
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
