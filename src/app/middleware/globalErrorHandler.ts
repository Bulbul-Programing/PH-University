import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/error";

const globalErrorHandler = (err : any, req :Request, res : Response, next: NextFunction)=>{
  
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something is wrong'


    let errorSource : TErrorSource = {
        path : '',
        message : 'something is wrong'
    }


    return res.status(statusCode).json({
      success : false,
      message : message,
      errorSource : errorSource,
      error : err
    })
  }

  export default globalErrorHandler