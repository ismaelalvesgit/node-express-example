import { 
    AmqpError, 
    ApiError, 
    BadRequest, 
    EmailError, 
    InternalServer, 
    NotFound, 
    UploadError, 
    ValidadeSchema 
} from "../utils/erro";
import { StatusCodes } from "http-status-codes";
import logger from "../logger";
import elasticAgent from "../apm";

/**
 * @typedef ErrorConfig
 * @type {Object}
 * @property {typeof CodedError} class
 * @property {string} code
 * @property {String} i18n
 */

/**
 * @type {ErrorConfig[]}
 */
 const errorsConfigs = [
    { class: EmailError, code: "email", i18n: "EmailError.email" },
    { class: AmqpError, code: "Contact", i18n: "AmqpError.Contact" },
    { class: AmqpError, code: "amqp", i18n: "AmqpError" },

    { class: NotFound, code: null, i18n: "NotFound" },

    { class: BadRequest, code: "Contact", i18n: "BadRequest.Contact" },

    { class: InternalServer, code: "Contact", i18n: "InternalServer.Contact" },
    { class: Error, code: "ER_DUP_ENTRY", i18n: "BadRequest.Duplicate"},

    { class: ValidadeSchema, code: "any.required", i18n: "ValidadeSchema.required" },
    { class: ValidadeSchema, code: "any.only", i18n: "ValidadeSchema.only" },
    { class: ValidadeSchema, code: "string.min", i18n: "ValidadeSchema.min" },
    { class: ValidadeSchema, code: "string.email", i18n: "ValidadeSchema.email" },
    { class: ValidadeSchema, code: "async.exist", i18n: "ValidadeSchema.async" },
];

/**
 * @param {Error} error
 */
const _getErrorConfig = error => errorsConfigs.find((errorConfig)=>{
    if(error instanceof NotFound && error instanceof errorConfig.class){
        return errorConfig;
    }else{
        if(error instanceof errorConfig.class && (error._code === errorConfig.code || error.code === errorConfig.code)){
            return errorConfig;
        }
    }
});

/**
 * @param {import('express').Request} req
 * @param {Error} error
 */
/* eslint-disable no-unused-vars*/
const _loadErrorMessage = (req, error) => {
    if(error instanceof ValidadeSchema){
        error.message = JSON.stringify(
            JSON.parse(error.message).map(element => {
                let e = error;
                e._code = element.type;
                const errorConfig = _getErrorConfig(e);
                if(errorConfig){
                    element.message = req.__(errorConfig.i18n, {
                        name: element.context.key,
                        limit: element.context.limit,
                        value: element.context.value,
                        valids: element.context.valids,
                        code: error._code
                    });
                    return element;
                }
                return element;
            })
        );
      }else{
        const errorConfig = _getErrorConfig(error);
        if (errorConfig) {
            const errorWithMessage = error;
            let data = {};
            switch (error.code) {
                case "ER_DUP_ENTRY":
                    data.dup = error.sqlMessage.split(/'(.*?)'/)[1];
                    break;
                default:
                    break;
            }
            errorWithMessage.message = req.__(errorConfig.i18n, {
                params: req.params,
                query: req.query,
                headers: req.headers,
                body: req.body,
                code: error._code,
                duplicateValue: data.dup
            });
        }
    }
};

/* eslint-disable no-unused-vars*/
export default function errorHandler(error, req, res, next) {
    logger.warn(`${req.id} ${error.message}`);
    _loadErrorMessage(req, error);
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
            res.status(StatusCodes.BAD_REQUEST).json([{message: error.message}]);
            break;
        }
        case UploadError:{
            res.status(StatusCodes.SERVICE_UNAVAILABLE).json([{message: "Tente novamente mais tarde 😞"}]);
            break;
        }
        default: {
            if(error.code){
                res.status(StatusCodes.BAD_REQUEST).json([{message: error.message || error.sqlMessage}]);
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