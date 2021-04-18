import joi from "@hapi/joi";

export const createContatoShema = joi.object({
    body: joi.object({
        nome: joi.string().required(),
        telefone: joi.string().required().pattern(/\d{11}/),
    }).required(),
});

export const updateContatoShema = joi.object({
    body: joi.object({
        nome: joi.string(),
        telefone: joi.string().pattern(/\d{11}/),
    }),
});