exports.seed = async function (knex) {
  await knex('appointments').del();


  await knex('appointments').insert([
      {
          patient_id: 8,
          doctor_id: 11,
          appointment_time: '2024-12-01 10:00:00',
          status: 'scheduled',
      },
      {
          patient_id: 9,
          doctor_id: 13,
          appointment_time: '2024-12-02 14:00:00',
          status: 'completed',
      },
      {
          patient_id: 7,
          doctor_id: 12,
          appointment_time: '2024-12-03 16:00:00',
          status: 'canceled',
      },
      {
          patient_id: 8,
          doctor_id: 13,
          appointment_time: '2024-12-04 09:00:00',
          status: 'scheduled',
      },
      {
          patient_id: 7,
          doctor_id: 11,
          appointment_time: '2024-12-05 13:30:00',
          status: 'scheduled',
      },
  ]);
};
