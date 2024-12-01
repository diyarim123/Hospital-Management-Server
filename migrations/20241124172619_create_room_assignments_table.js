exports.up = function(knex) {
    return knex.schema.hasTable('room_assignments').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('room_assignments', (table) => {
                table.increments('assignment_id').primary(); 
                table.integer('room_id').unsigned().notNullable(); 
                table.integer('patient_id').unsigned().notNullable(); 
                table.integer('doctor_id').unsigned().notNullable(); 
                table.datetime('start_time').notNullable(); 
                table.datetime('end_time').notNullable();   
        
                // Foreign key constraints
                table
                    .foreign('room_id')
                    .references('room_id')
                    .inTable('rooms')
                    .onDelete('CASCADE');
                table
                    .foreign('patient_id')
                    .references('patient_id')
                    .inTable('patients')
                    .onDelete('CASCADE'); 
                table
                    .foreign('doctor_id')
                    .references('doctor_id')
                    .inTable('doctors')
                    .onDelete('CASCADE'); 
            });
        }
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('room_assignments');
};
