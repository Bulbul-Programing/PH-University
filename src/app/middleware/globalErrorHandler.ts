import { NextFunction, Request, Response } from 'express'
import { ZodError, ZodIssue } from 'zod'
import { TErrorSource } from '../interface/error'
import config from '../config'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Something went wrong!'
  
  let errorSources : TErrorSource = [
    {
      path : '',
      message : 'something is wrong'
    }
  ]

  const handleZodError = (error : ZodError) => {
    const statusCode = 400
    const errorSources : TErrorSource= error.issues.map((issue : ZodIssue)=>{
      return {
        path : issue.path[issue.path.length - 1],
        message : issue.message
      }
    })

    return {
      statusCode,
      message : 'zod validation error',
      errorSources 
    }
  }


  if (err instanceof ZodError) {
    const simpleError = handleZodError(err)
    statusCode = simpleError?.statusCode,
    message = simpleError?.message,
    errorSources = simpleError?.errorSources
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    errorStack : config.NODE_ENV === 'development' ? err?.stack : null
  })
}

export default globalErrorHandler
