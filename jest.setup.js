import knex from 'knex'
import knexFile from './knexfile'
const conn = knex(knexFile.test)
import execute from './test/utils/sql'
jest.mock('./src/i18n', ()=>{
    return {
        init: (req, res, next)=>{
            next()
        }
    }
})

beforeAll(async()=>{
    try {
        await execute('CREATE DATABASE IF NOT EXISTS test_example')
    } catch (error) {}
    await conn.migrate.up()
})

afterAll(async ()=>{
    try {
        await execute('DROP DATABASE IF EXISTS test_example')
    } catch (error) {}
})

