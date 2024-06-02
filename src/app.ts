import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { StudentRouter } from './app/modules/students/student.routes'
import { userRouter } from './app/modules/user/user.routes'
import router from './app/routes'
const app: Application = express()

//parser
app.use(express.json())
app.use(cors())

app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello server!')
})

app.use((err : any, req :Request, res : Response, next: NextFunction)=>{
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something is wrong'

  return res.status(statusCode).json({
    success : false,
    message : message,
    error : err
  })
})

app.use((req : Request, res : Response) => {
  return res.status(400).json({
    success : false,
    message : 'API not Found',
    error : ''
  })
})

export default app
