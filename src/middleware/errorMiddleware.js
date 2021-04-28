import { AmqpError, ApiError, EmailError, ValidadeSchema } from "../utils/erro";
import { StatusCodes } from "http-status-codes";
import logger from "../logger";
import elasticAgent from "../apm";

/**
 * @typedef ErrorConfig
 * @type {Object}
 * @property {typeof CodedError} class
 * @property {String} i18n
 */

/**
 * @type {ErrorConfig[]}
 */
const errorsConfigs = [
    { class: ApiError, i18n: "error.apiError" },
    { class: ValidadeSchema, i18n: "error.validadeSchema" },
    { class: AmqpError, i18n: "error.amqpError"},
];

/**
 * @param {Error} error
 */
const _getErrorConfig = error => errorsConfigs.find(errorConfig => error instanceof errorConfig.class);

/**
 * @param {import('express').Request} req
 * @param {Error} error
 */
/* eslint-disable no-unused-vars*/
const _loadErrorMessage = (req, error) => {
    const errorConfig = _getErrorConfig(error);
    if (errorConfig) {
      const errorWithMessage = error;
      errorWithMessage.message = req.__(errorConfig.i18n);
    }
};

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
        case AmqpError:{
            res.status(StatusCodes.BAD_REQUEST).json([{message: error.message}]);
            break;
        }
        case EmailError:{
            console.log(error)
            res.status(StatusCodes.BAD_REQUEST).json([{message: error.message}]);
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