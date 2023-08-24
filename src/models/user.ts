/* eslint-disable camelcase */

import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
   role: {
      type: String,
      enum: ['client', 'admin'],
      default: 'client',
   },
   name: String,
   mobile_number: String,
   blocked: {
      status: Boolean,
      reason: String,
   },
   password: String,
   access_items: [],
})

UserSchema.set('timestamps', true)

export default mongoose.models.Product || mongoose.model('User', UserSchema)
