import { ApiError, ValidadeSchema } from "../utils/erro";
import { StatusCodes } from "http-status-codes";
import logger from "../logger";
import elasticAgent from "../apm";

/* eslint-disable no-unused-vars*/
export default function errorHandler(error, req, res, next) {
    logger.warn(`${req.id} ${error.message}`);
    switch (error.constructor) {
        case ApiError: {
            res.status(error.statusCode).json([{message: error.message}]);
            break;
        }
        case ValidadeSchema: {
            let response = JSON.parse(error.message).map((i)=>{
                return {
                    name: i.context.key,
                    message: i.message
                };
            });
            res.status(error.statusCode).json(response);
            break;
        }
        default: {
            if(error.code){
                res.status(StatusCodes.BAD_REQUEST).json([{message: error.sqlMessage}]);
            }else{
                if(elasticAgent){
                    elasticAgent.captureError(error);
                }
                logger.error(`${req.id} ${error.message}`);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json([{
                    message: `Entre em contato com o desenvolvedor passe eu seu ID ${req.id}, lamentamos isso ter ocorrido 😞`
                }]);
            }
        }
    }
}