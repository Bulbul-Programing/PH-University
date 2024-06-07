import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handleMongooseError = (err : mongoose.Error.ValidationError) : TGenericErrorResponse => {
    const statusCode = 400
    const errorSources : TErrorSource = Object.values(err.errors).map((err : mongoose.Error.ValidatorError | mongoose.Error.CastError)=>{

        return {
            path : err?.path,
            message : err?.message
        }
    })
    return {
        statusCode,
        message : 'Validation Error',
        errorSources
    }
}

export default handleMongooseError