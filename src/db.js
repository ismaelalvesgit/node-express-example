import knex from 'knex'
import env from './env'

let knexConn;
switch (env.db.env) {
    case "development":
        knexConn = require('../knexfile').local
        break;
    case "test":
        knexConn = require('../knexfile').test
        break;
    default:
        knexConn = require('../knexfile').local
        break;
}

const connection = knex(knexConn)

export default connection