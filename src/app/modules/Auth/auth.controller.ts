import { Request, Response } from 'express'
import config from '../../config'
import catchAsync from '../../utils/catchAsync'
import { authServices } from './auth.service'

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body)
  const { refreshToken, accessToken, needsPasswordChange } = result

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  })
  
  res.status(200).json({
    success: true,
    message: 'User is logged in successfully!',
    data: {
      accessToken,
      needsPasswordChange,
    },
  })
})

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body

  const result = await authServices.changePassword(req.user, passwordData)

  res.status(200).json({
    success: true,
    message: 'Password is updated successfully!',
    data: result,
  })
})

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies
  const result = await authServices.refreshToken(refreshToken)

  res.status(200).json({
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  })
})

const forgetPasswordController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.body.id
    const result = await authServices.forgetPassword(id)

    res.status(200).json({
      success : true,
      message : 'reset password mail send successfully!'
    })

  },
)
const resetPasswordController = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization as string
    const result = await authServices.resetPassword(req.body, token)

    res.status(200).json({
      success : true,
      message : 'password reset successfully!'
    })

  },
)

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPasswordController,
  resetPasswordController
}
