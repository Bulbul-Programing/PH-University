import { NextFunction, Request, Response } from 'express'
import { ZodError, ZodIssue } from 'zod'
import { TErrorSource } from '../interface/error'
import config from '../config'
import handleZodError from '../error/handleZodvalidationError'
import handleMongooseError from '../error/handleMongoseValidationError'
import handleCastError from '../error/handleCastError'
import handleDuplicateError from '../error/handleDupleacteError'
import AppError from '../error/AppError'

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
  else if(err.name === 'CastError'){
    const simpleError = handleCastError(err)
    statusCode = simpleError?.statusCode,
    message = simpleError?.message,
    errorSources = simpleError?.errorSources
  }
  else if(err?.code === 1100){
    const simpleError = handleDuplicateError(err)
    statusCode = simpleError?.statusCode,
    message = simpleError?.message,
    errorSources = simpleError?.errorSources
  }
  else if(err instanceof AppError){
    statusCode = err?.statusCode,
    message = err?.message,
    errorSources = [{
      path : '',
      message : err.message
    }]
  }
  else if(err instanceof Error){
    statusCode = statusCode,
    message = err?.message,
    errorSources = [{
      path : '',
      message : err.message
    }]
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    errorStack : config.NODE_ENV === 'development' ? err?.stack : null
  })
}

export default globalErrorHandler
