/* eslint-disable camelcase */

import mongoose from 'mongoose'

export interface IOrder {
   _id: string
   user: {
      _id: string
      name: string
      mobileNumber: string
   }
   price: number
   discount: number
   coupon: number
   items: mongoose.Schema.Types.ObjectId[]
   createdAt: Date
   updatedAt: Date
}

const OrderSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   price: Number,
   discount: Number,
   coupon: Number,
   items: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref:  'Course',
         required: true
      },
   ],
})

OrderSchema.set('timestamps', true)

export default mongoose.models.Order || mongoose.model('Order', OrderSchema)
