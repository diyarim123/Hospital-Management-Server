exports.up = function(knex) {
    return knex.schema.hasTable('patients').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('patients', (table) => {
                table.increments('patient_id').primary();
                table.string('first_name', 255).notNullable();
                table.string('last_name', 255).notNullable();
                table.date('date_of_birth').notNullable();
                table.string('gender', 10);
                table.string('contact_number', 15);
                table.text('address');
                table.string('email', 255).unique();
            });
        }
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('patients');
};


