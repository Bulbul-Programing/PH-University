import { Schema, model } from 'mongoose'
import { TUser } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<TUser>({
  id: { type: String, required: true },
  password: { type: String, },
  needsPasswordChange: { type: Boolean, default: true },
  role: { type: String, enum: ['admin', 'student', 'faculty'], required : true },
  status : {type : String , enum : ['in-progress', 'blocked'], default : 'in-progress'},
  isDeleted : {type : Boolean,}
},{
    timestamps : true
})

userSchema.pre('save', async function(next){
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  )
  next()
})

userSchema.post('save', async function(doc,next){
  doc.password = ''
  next()
})

export const userModel = model<TUser>('User', userSchema)