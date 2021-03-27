import joi from '@hapi/joi';
import status from '../enums/transacoes'

export const contatoShema = joi.object({
    headers: joi.object({
        platform: joi.string(),
    }),
    query: joi.object({
        platform: joi.string(),
        documentNumber: joi.string(),
        accountBankCode: joi.string(),
        accountBranch: joi.string(),
        accountNumber: joi.string(),
    }).required(),
    body: joi.object({
        document: joi.object({
            type: joi.string().valid(status.FINALIZADO, status.CANCELADO),
            number: joi.string().required(),
        }),
        reference: joi.object({
          merchantId: joi
            .string()
            .pattern(/^[0-9]+$/)
            .min(1)
            .max(10)
            .required(),
        }),
    }).required(),
})