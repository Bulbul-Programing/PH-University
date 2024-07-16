import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import { TLoginUser } from './auth.interface'
import AppError from '../../error/AppError'
import { userModel } from '../user/user.model'
import { createToken } from './auth.utils'
import { sendEmail } from '../../utils/sendEmail'

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await userModel.isUserExistsByCustomId(payload.id)

  if (!user) {
    throw new AppError(404, 'This user is not found !')
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(403, 'This user is deleted !')
  }

  // checking if the user is blocked

  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(403, 'This user is blocked ! !')
  }

  //checking if the password is correct

  if (!(await userModel.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(403, 'Password do not matched')

  //create token and sent to the  client

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }
  
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  }
}

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await userModel.isUserExistsByCustomId(userData.userId)

  if (!user) {
    throw new AppError(404, 'This user is not found !')
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(403, 'This user is deleted !')
  }

  // checking if the user is blocked

  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(403, 'This user is blocked ! !')
  }

  //checking if the password is correct

  if (!(await userModel.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(403, 'Password do not matched')

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  await userModel.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  )

  return null
}

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload

  const { userId, iat } = decoded

  // checking if the user is exist
  const user = await userModel.isUserExistsByCustomId(userId)

  if (!user) {
    throw new AppError(404, 'This user is not found !')
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(403, 'This user is deleted !')
  }

  // checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(403, 'This user is blocked ! !')
  }

  if (
    user.passwordChangedAt &&
    userModel.isJWTIssuedBeforePasswordChanged(
      user.passwordChangedAt,
      iat as number,
    )
  ) {
    throw new AppError(401, 'You are not authorized !')
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  return {
    accessToken,
  }
}

const forgetPassword = async (userId: string) => {
  const user = await userModel.isUserExistsByCustomId(userId)

  if (!user) {
    throw new AppError(404, 'This user is not found !')
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(403, 'This user is deleted !')
  }

  // checking if the user is blocked

  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(403, 'This user is blocked ! !')
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '50m',
  )

  const resetUiLink = `${config.reset_pass_ui_link}?id=${user.id}&token=${accessToken}`

  sendEmail(resetUiLink)
  return
}

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const user = await userModel.isUserExistsByCustomId(payload.id)
  if (!user) {
    throw new AppError(404, 'This user is not found !')
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(403, 'This user is deleted !')
  }
  // checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(403, 'This user is blocked ! !')
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;
  
  if(payload.id !== decoded.userId){
    throw new AppError(403, 'you are forbidden!')
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  await userModel.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
  )
}

export const authServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
}
