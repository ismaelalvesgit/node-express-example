import { Chance } from 'chance'
import { findAll, create } from "../../src/model/contato.model";

const chance = new  Chance()
describe('Contato Model', () => {
    describe('sucess', ()=>{
        it('findAll', async() => {
            await expect(findAll({id: chance.string({numeric: true, length: 1})})).resolves.toBeDefined()
        });
        
        it('create', async() => {
            await expect(create({
                nome: chance.name(),
                cpf: chance.cpf({formatted: false}),
                telefone: chance.string({numeric: true, length: 13})
            })).resolves.toBeDefined()
        });
    });
    
    describe('error', ()=>{
        
        it('create - sem os dados necessario', async() => {
            await expect(create({
                nome: chance.name(),
            })).rejects.toThrow();
        });
        
    });

});