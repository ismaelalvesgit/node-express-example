import ApiError from "../utils/ApiError";
import { StatusCodes } from 'http-status-codes'

/* eslint-disable no-unused-vars*/
export default function errorHandler(err, req, res, next) {
    let error = err;
   
    if(error instanceof ApiError){
        res.status(error.statusCode).json(error.isObject ? JSON.parse(error.message) : {message: error.message})
    }else{
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
    }
}