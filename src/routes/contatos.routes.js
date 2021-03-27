import express from 'express'
const router = express.Router();
import verify from '../middleware/verifiyHandlerMiddleware'
import { contatoShema } from '../validations/contato'
import { get } from '../controllers/contato.controller';

router.get('/:id', verify(contatoShema), get)

router.route('/')
    .get(get)
    .put()
    .delete()

// router.get('/', 
// verify(contatoShema),
// (req, res)=>{
//     // knex('contato').insert({
//     //     nome: "dudu",
//     //     cpf: "12345678912",
//     //     telefone: "12300545" 
//     // }).then((rs)=>{
//     //     res.status(StatusCodes.OK).json(rs)
//     // }).catch((e)=>{
//     //     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
//     // })
//     // knex('contato')
//     // .select(['cpf', 'nome'])
//     // .first()
//     // .where('id', 1)
//     // .then((dado)=>{
//     //     res.status(StatusCodes.OK).json(dado)
//     // }).catch((dado)=>{
//     //     res.status(StatusCodes.BAD_REQUEST).json(dado)
//     // })
//     // knex('contato')
//     // .where('id', 1)
//     // .update({
//     //     nome: "Carlos"
//     // }).then((rs)=>{
//     //     res.json(rs)
//     // }).catch((e)=>{
//     //     res.json(e)
//     // })
//     // knex('contato')
//     // .where('id', 1)
//     // .delete()
//     // .then((rs)=>{
//     //     res.json(rs)
//     // }).catch((e)=>{
//     //     res.json(e)
//     // })

//     /** JOIN */
//     // knex('contato').insert({
//     //     nome: chance.name(),
//     //     cpf: chance.cpf({formatted: false}),
//     //     telefone: chance.string({numeric: true, length: 13})
//     // }).then(async(rs)=>{
//     //     await knex('transacoes').insert({
//     //         valor: 10,
//     //         contatoId: rs[0],
//     //         usuarioId: 1
//     //     })
//     //     res.status(StatusCodes.OK).json(rs)
//     // }).catch((e)=>{
//     //     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
//     // })
//     // knex('transacoes')
//     // .options({ nestTables: true })
//     // .innerJoin('usuario', 'usuario.id', 'transacoes.usuarioId')
//     // .innerJoin('contato', 'contato.id', 'transacoes.contatoId')
//     // .then((rs)=>{
//     //     res.json(rs)
//     // }).catch((e)=>{
//     //     res.json(e)
//     // })
// });

export default router;