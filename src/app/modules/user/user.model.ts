import { Schema, model } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<TUser>({
  id: { type: String, required: true , unique : true},
  password: { type: String, },
  needsPasswordChange: { type: Boolean, default: true },
  email : {type : String, required : true, unique : true},
  role: { type: String, enum: ['admin', 'student', 'faculty'], required : true },
  status : {type : String , enum : ['in-progress', 'blocked'], default : 'in-progress'},
  isDeleted : {type : Boolean, default : false}
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

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await userModel.findOne({ id }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const userModel = model<TUser, UserModel>('User', userSchema)