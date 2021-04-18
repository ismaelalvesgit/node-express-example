import * as contactModel from "../model/contato.model";

/**
 * @param {import("../model/contato.model").Contato} where 
 * @returns {import('knex').Knex.QueryBuilder}
 */
const findAllContact = (where) =>{
    return contactModel.findAllContact(where);
};

/**
 * @param {import("../model/contato.model").Contato} data 
 * @returns {import('knex').Knex.QueryBuilder}
 */
const createContact = (data) =>{
    return contactModel.createContact(data);
};

/**
 * @param {import("../model/contato.model").Contato} where 
 * @param {import("../model/contato.model").Contato} data 
 * @returns {import('knex').Knex.QueryBuilder}
 */
const updateContact = (where, data) =>{
    return contactModel.updateContact(where, data);
};

/**
 * @param {import("../model/contato.model").Contato} where 
 * @returns {import('knex').Knex.QueryBuilder}
 */
const delContact = (where) =>{
    return contactModel.delContact(where);
};

export {
    findAllContact,
    createContact,
    updateContact,
    delContact
};