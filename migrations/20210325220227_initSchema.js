require("@babel/register");
const status = require('../src/enums/transacoes')

const createdAt = (knex, table) => table.timestamp('createdAt', { precision: 3 })
  .notNullable()
  .defaultTo(knex.fn.now(3));

const updatedAt = (knex, table) => table.timestamp('updatedAt', { precision: 3 })
  .notNullable()
  .defaultTo(knex.raw('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'));

/**
 * @param {import('knex')} knex
*/
exports.up = async function(knex) {
    await knex.schema.createTable('contato', (table)=>{
      table.bigIncrements('id').unsigned();
      table.string('nome').notNullable();
      table.string('cpf', 11).notNullable();
      table.unique('cpf');
      table.string('telefone', 13).nullable();
      createdAt(knex, table);
      updatedAt(knex, table);
    });
    
    await knex.schema.createTable('usuario', (table)=>{
      table.bigIncrements('id').unsigned();
      table.string('nome').notNullable();
      table.string('cpf', 11).notNullable();
      table.unique('cpf');
      table.string('telefone', 13).nullable();
      createdAt(knex, table);
      updatedAt(knex, table);
    });

    await knex('usuario').insert({
      nome: "dudu",
      cpf: "12345678912",
      telefone: "12300545" 
    });

    await knex.schema.createTable('transacoes', (table)=>{
      table.bigIncrements('id').unsigned();
      table.integer('valor').notNullable();
      table.enum('status', Object.keys(status.default)).notNullable();
      table.string('descricao').nullable();
      table
        .bigInteger('usuarioId')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('usuario')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .bigInteger('contatoId')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('contato')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      createdAt(knex, table);
      updatedAt(knex, table);
    });
};

/**
 * @param {import('knex')} knex
*/
exports.down = async function(knex) {
  await knex.schema.dropTable('contato');
  await knex.schema.dropTable('transacoes');
  await knex.schema.dropTable('usuario');
};
