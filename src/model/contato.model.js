import knex from '../db'
import transacting from '../utils/transacting'
const TABLE_NAME = 'contato'

/**
 * @typedef Contato
 * @type {Object}
 * @property {Number} id
 * @property {String} nome
 * @property {String} telefone
 * @property {String} createdAt
 * @property {String} updatedAt
 */

/**
 * @param {Contato} where 
 * @param {import('knex').Knex.Transaction} trx 
 * @returns {import('knex').Knex.QueryBuilder}
 */
const findAllContact = (where, trx)=>{
    const query = knex(TABLE_NAME)
        .where(where)
    return transacting(query, trx)
}

/**
 * @param {Contato} data 
 * @param {import('knex').Knex.Transaction} trx 
 * @returns {import('knex').Knex.QueryBuilder}
 */
const createContact = (data, trx)=>{
    const query = knex(TABLE_NAME)
        .insert(data)
    return transacting(query, trx)
}

/**
 * @param {Contato} where 
 * @param {Contato} data 
 * @param {import('knex').Knex.Transaction} trx 
 * @returns {import('knex').Knex.QueryBuilder}
 */
const updateContact = (where, data, trx)=>{
    const query = knex(TABLE_NAME)
        .where(where)
        .update(data)
        .forUpdate()
    return transacting(query, trx)
}

/**
 * @param {Contato} where 
 * @param {import('knex').Knex.Transaction} trx 
 * @returns {import('knex').Knex.QueryBuilder}
 */
const delContact = (where, trx)=>{
    const query = knex(TABLE_NAME)
        .where(where)
        .del()
    return transacting(query, trx)
}

export {
    findAllContact,
    createContact,
    updateContact,
    delContact
}