import mongoose from 'mongoose'

export interface IUser {
   _id: string
   role: string
   name: string
   mobileNumber: string
   avatar: string
   blocked: {
      status: boolean
      reason: string
   },
   password: string
   accessItems: []
}

const UserSchema = new mongoose.Schema({
   role: {
      type: String,
      enum: ['دانشجو', 'ادمین'],
      default: 'دانشجو',
   },
   name: String,
   mobileNumber: String,
   avatar: String,
   blocked: {
      status: Boolean,
      reason: String,
   },
   password: String,
   accessItems: [],
   orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderSchema'}]
})

UserSchema.set('timestamps', true)

export default mongoose.models.User || mongoose.model('User', UserSchema)
