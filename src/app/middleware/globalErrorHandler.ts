import { NextFunction, Request, Response } from 'express'
import { ZodError, ZodIssue } from 'zod'
import { TErrorSource } from '../interface/error'
import config from '../config'
import handleZodError from '../error/handleZodvalidationError'
import handleMongooseError from '../error/handleMongoseValidationError'

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

  if (err instanceof ZodError) {
    const simpleError = handleZodError(err)
    statusCode = simpleError?.statusCode,
    message = simpleError?.message,
    errorSources = simpleError?.errorSources
  }
  else if(err.name === 'ValidationError'){
    const simpleError = handleMongooseError(err)
    statusCode = simpleError?.statusCode,
    message = simpleError?.statusCode,
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
