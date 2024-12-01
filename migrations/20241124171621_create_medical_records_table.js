exports.up = function(knex) {
    return knex.schema.hasTable('medical_records').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('medical_records', (table) => {
                table.increments('record_id').primary(); 
                table.integer('patient_id').unsigned().notNullable(); 
                table.integer('doctor_id').unsigned().notNullable();
                table.text('diagnosis').notNullable();
                table.text('treatment').notNullable(); 
                table.text('prescription');
                table.date('record_date').notNullable();

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
    return knex.schema.dropTableIfExists('medical_records');
};
