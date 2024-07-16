import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { StudentRouter } from './app/modules/students/student.routes'
import { userRouter } from './app/modules/user/user.routes'
import router from './app/routes'
import globalErrorHandler from './app/middleware/globalErrorHandler'
const app: Application = express()
import cookieParser from 'cookie-parser';

//parser
app.use(cookieParser());
app.use(express.json())
app.use(
  cors({
    origin: [
      'http://localhost:5173',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  }),
)

app.use('/api/v1', router)
app.use(globalErrorHandler)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello server!')
})

app.use((req: Request, res: Response) => {
  return res.status(400).json({
    success: false,
    message: 'API not Found',
    error: '',
  })
})

export default app
