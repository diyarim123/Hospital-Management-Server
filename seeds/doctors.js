exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('doctors').del();

  // Inserts seed entries
  await knex('doctors').insert([
      {
          first_name: 'Dr. Hemn',
          last_name: 'Ali',
          specialization: 'Cardiologist',
          gender: 'female',
          contact_number: '+9647709873245',
          department_id: 1, 
      },
      {
          first_name: 'Dr. Brwa',
          last_name: 'Sdiq',
          specialization: 'Neurologist',
          gender: 'male',
          contact_number: '+9647709873256',
          department_id: 2,
      },
      {
          first_name: 'Dr. Sarah',
          last_name: 'Aziz',
          specialization: 'Pediatrician',
          gender: 'female',
          contact_number: '+9647709873231',
          department_id: 3, 
      },
  ]);
};
