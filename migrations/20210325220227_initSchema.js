const createdAt = (knex, table) => table.timestamp('createdAt', { precision: 3 })
  .notNullable()
  .defaultTo(knex.fn.now(3));

const updatedAt = (knex, table) => table.timestamp('updatedAt', { precision: 3 })
  .notNullable()
  .defaultTo(knex.raw('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'));

/**
* @param {import('knex').Knex} knex
*/
exports.up = async function(knex) {
    await knex.schema.createTable('contato', (table)=>{
      table.bigIncrements('id').unsigned();
      table.string('nome').notNullable();
      table.string('telefone', 20).notNullable();
      table.unique('telefone');
      createdAt(knex, table);
      updatedAt(knex, table);
    });
};

/**
* @param {import('knex').Knex} knex
*/
exports.down = async function(knex) {
  await knex.schema.dropTable('contato');
};
