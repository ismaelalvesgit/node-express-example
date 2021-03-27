import knex from 'knex'
import knexFile from './knexfile'
const conn = knex(knexFile.test)
import execute from './test/utils/sql'

beforeAll(async()=>{
    try {
        await execute('create database test_ekki')
    } catch (error) {}
    await conn.migrate.up()
})

afterAll(async ()=>{
    try {
        await execute('drop database test_ekki')
    } catch (error) {}
})

