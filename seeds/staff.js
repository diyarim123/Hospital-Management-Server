exports.seed = async function (knex) {
  await knex('staff').del();


  await knex('staff').insert([
      {
          first_name: 'Heleen',
          last_name: 'Ali',
          role: 'Nurse',
          gender: "Female",
          contact_number: '+9647514378394',
          department_id : 3
      },
      {
          first_name: 'Rawa',
          last_name: 'Saeed',
          role: 'Technician',
          gender: "Male",
          contact_number: '+9647514378567',
          department_id : 1
      },
      {
          first_name: 'Bahroz',
          last_name: 'Ahmed',
          role: 'Nurse',
          gender: "Male",
          contact_number: '+9647726591356',
          department_id : 2
      },
      {
          first_name: 'Rawaz',
          last_name: 'Ibrahim',
          role: 'Technician',
          gender: "Male",
          contact_number: '+9647514678394',
          department_id : 3
      },
      {
          first_name: 'Shaima',
          last_name: 'Hussain',
          role: 'Nurse',
          gender: "Female",
          contact_number: '+9647514378394',
          department_id : 2
      },
  ]);
};
