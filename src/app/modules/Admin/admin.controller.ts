import catchAsync from '../../utils/catchAsync'
import { AdminServices } from './admin.service'

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AdminServices.getSingleAdminFromDB(id)

  res.status(200).json({
    success: true,
    message: 'Admin is retrieved successfully',
    data: result,
  })
})

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDB(req.query)

  res.status(200).json({
    success: true,
    message: 'Admins are retrieved successfully',
    data: result,
  })
})

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params
  const { admin } = req.body
  const result = await AdminServices.updateAdminIntoDB(id, admin)

  res.status(200).json({
    success: true,
    message: 'Admin is updated successfully',
    data: result,
  })
})

const deleteAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params
  const result = await AdminServices.deleteAdminFromDB(adminId)

  res.status(200).json({
    success: true,
    message: 'Admin is delete successfully',
    data: result,
  })
})

export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
}
