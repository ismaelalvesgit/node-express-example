import joi from "@hapi/joi";

export const createContatoShema = joi.object({
    content: joi.object({
        nome: joi.string().required(),
        telefone: joi.string().required().pattern(/\d{11}/),
    }).required(),
});