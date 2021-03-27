import knex from 'knex'
import knexFile from './knexfile'
const conn = knex(knexFile.test)
import execute from './test/utils/sql'

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

