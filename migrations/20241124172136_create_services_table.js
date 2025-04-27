exports.up = function(knex) {
    return knex.schema.hasTable('services').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('services', (table) => {
                table.increments('service_id').primary();
                table.string('service_name', 100).notNullable();
                table.string('description').notNullable();
                table.string('cost', 100).notNullable();
            });
        }
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('services');
};
