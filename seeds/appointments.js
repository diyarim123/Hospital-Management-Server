exports.seed = async function (knex) {
  await knex('appointments').del();


  await knex('appointments').insert([
      {
          patient_id: 4,
          doctor_id: 4,
          appointment_date: '2024-12-01',
          appointment_time: '2024-12-01 10:00:00',
          status: 'scheduled',
      },
      {
          patient_id: 6,
          doctor_id: 4,
          appointment_date: '2024-12-02',
          appointment_time: '2024-12-02 14:00:00',
          status: 'completed',
      },
      {
          patient_id: 5,
          doctor_id: 4,
          appointment_date: '2024-12-03',
          appointment_time: '2024-12-03 16:00:00',
          status: 'canceled',
      },
      {
          patient_id: 4,
          doctor_id: 5,
          appointment_date: '2024-12-04',
          appointment_time: '2024-12-04 09:00:00',
          status: 'scheduled',
      },
      {
          patient_id: 5,
          doctor_id: 6,
          appointment_date: '2024-12-05',
          appointment_time: '2024-12-05 13:30:00',
          status: 'scheduled',
      },
  ]);
};
