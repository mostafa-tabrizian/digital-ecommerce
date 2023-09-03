import mongoose from 'mongoose'

export interface ICoupon {
   type: string
   code: string
   value: number
   qty: number
   expiresAt: Date
}

const CouponSchema = new mongoose.Schema({
   type: {
      type: String,
      enum: ['%', '$'],
   },
   code: String,
   value: Number,
   qty: Number,
   expiresAt: Date,
})

CouponSchema.set('timestamps', true)

export default mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema)
