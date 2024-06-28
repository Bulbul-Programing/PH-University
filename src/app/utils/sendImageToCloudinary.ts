import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'

cloudinary.config({
  cloud_name: 'dmncfe9eh',
  api_key: '371851648772495',
  api_secret: 'oyMOzgj0ptULtNsCBvsHwVaLKzQ', // Click 'View Credentials' below to copy your API secret
})

export const sendImageToCloudinary = async (imgName: string, path: string) => {
    
    const uploadResult = await cloudinary.uploader
      .upload(path, {
        public_id: imgName,
      })
      .catch((error) => {
        console.log(error)
      })
    return uploadResult
  }

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
})

export const upload = multer({ storage: storage })
