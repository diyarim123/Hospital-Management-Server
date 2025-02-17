/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('users', function(table) {
        table.enum('role', ['admin', 'doctor', 'patient', 'staff']).notNullable().defaultTo('patient');
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('users', function(table) {
        table.dropColumn('role');
    });
};
