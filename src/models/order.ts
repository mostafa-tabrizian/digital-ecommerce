/* eslint-disable camelcase */

import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
   status: {
      type: String,
      enum: ['PENDING', 'PREPARING', 'POSTED', 'CANCELED'],
      default: 'PENDING',
   },
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
