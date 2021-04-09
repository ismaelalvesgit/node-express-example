import { ApiError, ValidadeSchema } from "../utils/erro";
import { StatusCodes } from 'http-status-codes'
import logger from '../logger'
import elasticAgent from "../apm";

/* eslint-disable no-unused-vars*/
export default function errorHandler(error, req, res, next) {
    logger.info(`${req.id}` + error.message)
    switch (error.constructor) {
        case ApiError: {
            res.status(error.statusCode).json([{message: error.message}])
            break;
        }
        case ValidadeSchema: {
            let response = JSON.parse(error.message).map((i)=>{
                return {
                    name: i.context.key,
                    message: i.message
                }
            })
            res.status(error.statusCode).json(response)
            break;
        }
        default: {
            switch (error.code) {
                case "ER_DUP_ENTRY":
                    res.status(StatusCodes.BAD_REQUEST).json([{message: error.sqlMessage}])
                    break;
                case "ER_BAD_FIELD_ERROR":
                    res.status(StatusCodes.BAD_REQUEST).json([{message: error.sqlMessage}])
                    break;
                default:
                    if(elasticAgent){
                        elasticAgent.captureError(error)
                    }
                    logger.error(`${req.id}` + error.message)
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json([{
                        message: `lamentamos isso ter ocorrido :(`
                    }])
                    break;
            }
            break;
        }
    }
}