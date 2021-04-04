import { findAllContact, createContact, updateContact, delContact } from "../model/contato.model";

/**
 * @param {import("../model/contato.model").Contato} where 
 * @returns {import('knex').Knex.QueryBuilder}
 */
const findContato = (where) =>{
    return findAllContact(where)
}

/**
 * @param {import("../model/contato.model").Contato} data 
 * @returns {import('knex').Knex.QueryBuilder}
 */
const createContato = (data) =>{
    return createContact(data)
}

/**
 * @param {import("../model/contato.model").Contato} where 
 * @param {import("../model/contato.model").Contato} data 
 * @returns {import('knex').Knex.QueryBuilder}
 */
const updateContato = (where, data) =>{
    return updateContact(where, data)
}

/**
 * @param {import("../model/contato.model").Contato} where 
 * @returns {import('knex').Knex.QueryBuilder}
 */
const deleteContato = (where) =>{
    return delContact(where)
}

export {
    findContato,
    createContato,
    updateContato,
    deleteContato
}