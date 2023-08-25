/* eslint-disable camelcase */

import mongoose from 'mongoose'

export interface IUser {
   role: string
   name: string,
   mobileNumber: string,
   blocked: {
      status: boolean,
      reason: string,
   },
   password: string,
   accessItems: [],
}

const UserSchema = new mongoose.Schema<IUser>({
   role: {
      type: String,
      enum: ['client', 'admin'],
      default: 'client',
   },
   name: String,
   mobileNumber: String,
   blocked: {
      status: Boolean,
      reason: String,
   },
   password: String,
   accessItems: [],
})

UserSchema.set('timestamps', true)

export default mongoose.models.User || mongoose.model('User', UserSchema)