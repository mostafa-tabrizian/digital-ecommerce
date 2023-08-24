/* eslint-disable camelcase */

import mongoose from 'mongoose'

const CouponSchema = new mongoose.Schema({
   type: {
      type: String,
      enum: ['%', '$'],
   },
   code: String,
   value: Number,
   qty: Number,
   expires_at: Date,
})

CouponSchema.set('timestamps', true)

export default mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema)
