import { ValidadeSchema } from '../utils/erro';
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
            return next(new ValidadeSchema(StatusCodes.BAD_REQUEST, validation.error.details))
        }

        Object.assign(req, validation.value);
        return next();
    }
}