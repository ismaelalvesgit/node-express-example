import ApiError from '../utils/ApiError';
import { StatusCodes } from 'http-status-codes'
/**
 * 
*  @param {import('@hapi/joi').AnySchema} schema 
 * @returns 
 */
export default function verifyHandlerMiddleware(schema){
    return (req, res, next)=>{
        const validation = schema.validate(req, {
            abortEarly: false,
            stripUnknown: true,
            allowUnknown: true
        })

        if (validation.error) {
            return next(new ApiError(StatusCodes.BAD_REQUEST, JSON.stringify(validation.error.details), true))
        }

        Object.assign(req, validation.value);
        return next();
    }
}