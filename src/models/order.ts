/* eslint-disable camelcase */

import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
   status: {
      type: String,
      enum: ['PENDING', 'PREPARING', 'POSTED', 'CANCELED'],
      default: 'PENDING',
   },
   user: String,
   price: Number,
   discount: Number,
   coupon: Number,
   items: [
      {
         name: String,
         image: String,
         price: Number,
      },
   ],
})

OrderSchema.set('timestamps', true)

export default mongoose.models.Order || mongoose.model('Order', OrderSchema)
