exports.up = function(knex) {
    return knex.schema.hasTable('rooms').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('rooms', (table) => {
                table.increments('room_id').primary(); 
                table.integer('room_number').notNullable().unique(); 
                table
                    .enu('room_type', ['surgery', 'ICU' , 'general'])
                    .notNullable()
                    .defaultTo('general')
                table.integer('capacity').notNullable(); 
                table
                    .enu('availability_type', ['available', 'occupied'])
                    .notNullable()
                    .defaultTo('available'); // Default value
            });
        }
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('rooms');
};
