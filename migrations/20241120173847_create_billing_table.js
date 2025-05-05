exports.up = function(knex) {
    return knex.schema.hasTable('billing').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('billing', (table) => {
                table.increments('bill_id').primary();
                table.integer('patient_id') 
                    .unsigned()
                    .notNullable()
                    .references('patient_id')
                    .inTable('patients')
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE');
                table.integer('appointment_id') 
                    .unsigned()
                    .notNullable()
                    .references('appointment_id')
                    .inTable('appointments')
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE');
                table.string('amount', 100).notNullable();
                table.dateTime('bill_date').notNullable();
                table
                    .enu('payment_status', ['Paid' , 'Not Paid' , 'Insurance'])
                    .notNullable()
                    .defaultTo('scheduled');
            });
        }
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('billing');
};
