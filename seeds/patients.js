exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('patients').del();

  // Inserts seed entries
  await knex('patients').insert([
      {
          first_name: 'Osman',
          last_name: 'Ali',
          date_of_birth: '1990-01-01',
          gender: 'male',
          contact_number: '+9647503457689',
          address: '123 Rasty St, Erbil',
          email: 'osman@gmail.com',
      },
      {
          first_name: 'Mohammed',
          last_name: 'Sleman',
          gender: 'female',
          contact_number: '+9647503457289',
          date_of_birth: '1985-05-15',
          address: '456 Roshnbiry, Duhok',
          email: 'mohammed@gmail.com',
      },
      {
          first_name: 'Ashna',
          last_name: 'Ahmed',
          gender: 'female',
          contact_number: '+9647503457381',
          date_of_birth: '1992-09-20',
          address: '789 Azady, Suleymaniyah',
          email: 'ashna@gmail.com',
      },
  ]);
};
