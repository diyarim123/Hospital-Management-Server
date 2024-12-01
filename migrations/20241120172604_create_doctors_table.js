exports.up = function(knex) {
    return knex.schema.hasTable('doctors').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('doctors', (table) => {
                table.increments('doctor_id').primary(); 
                table.string('first_name', 50).notNullable();
                table.string('last_name', 50).notNullable();
                table.string('specialization', 50).notNullable();
                table.string('gender', 10).notNullable(); 
                table.string('contact_number', 50).notNullable(); 
                table.integer('department_id') // Foreign key to departments
                    .unsigned()
                    .references('department_id')
                    .inTable('departments')
                    .onDelete('SET NULL')
                    .onUpdate('CASCADE');
            });
        }
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('doctors');
};
