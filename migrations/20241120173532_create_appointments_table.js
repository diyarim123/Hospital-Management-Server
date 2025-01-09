exports.up = function(knex) {
    return knex.schema.hasTable('appointments').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('appointments', (table) => {
                table.increments('appointment_id').primary(); 
                table.integer('patient_id')
                    .unsigned()
                    .notNullable()
                    .references('patient_id')
                    .inTable('patients')
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE');
                table.integer('doctor_id')
                    .unsigned()
                    .notNullable()
                    .references('doctor_id')
                    .inTable('doctors')
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE');
                table.dateTime('appointment_time').notNullable();
                table
                    .enu('status', ['scheduled' , 'completed' , 'canceled'])
                    .notNullable()
                    .defaultTo('scheduled');
            });
        }
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('appointments');
};
