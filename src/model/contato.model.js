import knex from '../db'
import transacting from '../utils/transacting'
const TABLE_NAME = 'contato'

const findAll = (params, trx)=>{
    const query = knex(TABLE_NAME)
        .where(params)
    return transacting(query, trx)
}

const create = (data, trx)=>{
    const query = knex(TABLE_NAME)
        .insert(data)
    return transacting(query, trx)
}

const update = (where, data, trx)=>{
    const query = knex(TABLE_NAME)
        .where(where)
        .update(data)
    return transacting(query, trx)
}

const del = (where, trx)=>{
    const query = knex(TABLE_NAME)
        .where(where)
    return transacting(query, trx)
}

export {
    findAll,
    create,
    update,
    del
}