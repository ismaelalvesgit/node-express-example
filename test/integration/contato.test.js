import request from 'supertest'
import { StatusCodes } from 'http-status-codes'
import app from '../../src/app'
import { Chance } from 'chance'
import knex from '../../src/db'

const chance = new  Chance()
describe('Contato Router', () => {
    
    beforeEach(async()=>{
        await Promise.all([
            knex('contato').del()
        ])
    })

    describe('sucess', ()=>{
        it('findAll', async() => {
            const contato = await knex('contato').insert({
                nome: chance.name(),
                cpf: chance.cpf({formatted: false}),
                telefone: chance.string({numeric: true, length: 13})
            })

            const res = await request(app)
            .get(`/contato/${contato[0]}`)
            .expect(StatusCodes.OK)
            expect(res.body).toHaveProperty('cpf')
            expect(res.body).toHaveProperty('nome')
            expect(res.body).toHaveProperty('telefone')
        });
    });
    
});