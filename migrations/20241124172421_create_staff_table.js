exports.up = function(knex) {
    return knex.schema.hasTable('staff').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('staff', (table) => {
                table.increments('staff_id').primary();
                table.string('first_name', 50).notNullable(); 
                table.string('last_name', 50).notNullable(); 
                table
                    .enu('role', ['nurse', 'tech'])
                    .notNullable()
                    .defaultTo('nurse'); 
                table.string('gender', 10).notNullable(); 
                table.string('contact_number', 50).notNullable(); 
                table.integer('department_id').unsigned(); 
        
                // Foreign key constraint
                table
                    .foreign('department_id')
                    .references('department_id')
                    .inTable('departments')
                    .onDelete('SET NULL'); 
            });
        }
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('staff');
};
