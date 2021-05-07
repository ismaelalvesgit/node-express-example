import knex from 'knex'
import knexFile from './knexfile'
const conn = knex(knexFile.test)
import { executeSql, deleteFolders } from './test/utils'
jest.mock('./src/i18n', ()=>{
    return {
        init: (req, res, next)=>{
            next()
        }
    }
})

beforeAll(async()=>{
    try {
        await executeSql('CREATE DATABASE IF NOT EXISTS test_example')
    } catch (error) {console.log(error)}
    await conn.migrate.up()
})

afterAll(async ()=>{
    try {
        deleteFolders([
            './src/public/uploads/multiple',
            './src/public/uploads/single',
            './src/public/uploads/zip',
        ])
        await executeSql('DROP DATABASE IF EXISTS test_example')
    } catch (error) {console.log(error)}
})

