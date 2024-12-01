exports.up = function(knex) {
    return knex.schema.hasTable('departments').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('departments', (table) => {
                table.increments('department_id').primary();
                table.string('name', 100).notNullable().unique();
                table.text('description');
            });
        }
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('departments');
};
