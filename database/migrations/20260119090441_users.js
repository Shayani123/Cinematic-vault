const { table } = require("node:console");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await Promise.all([
    knex.schema.createTable('user' , (table) => {
        table.increments('id').primary().unsigned(),
        table.string('email').notNullable().unique(),
        table.string('password').notNullable(),
        table.string('name').notNullable(),
        table.enu('role' , ['MEMBER' , 'ADMIN']),
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
  ])
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await Promise.all([
    knex.raw('drop table if exists "users" cascade'),
  ]);
};
