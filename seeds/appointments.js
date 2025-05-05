exports.seed = async function (knex) {
  await knex('appointments').del();


  await knex('appointments').insert([
      {
          patient_id: 28,
          doctor_id: 23,
          appointment_time: '2024-12-01 10:00:00',
          status: 'scheduled',
      },
      {
          patient_id: 26,
          doctor_id: 22,
          appointment_time: '2024-12-02 14:00:00',
          status: 'completed',
      },
      {
          patient_id: 20,
          doctor_id: 14,
          appointment_time: '2024-12-03 16:00:00',
          status: 'canceled',
      },
      {
          patient_id: 10,
          doctor_id: 12,
          appointment_time: '2024-12-04 09:00:00',
          status: 'scheduled',
      },
      {
          patient_id: 30,
          doctor_id: 16,
          appointment_time: '2024-12-05 13:30:00',
          status: 'scheduled',
      },
  ]);
};
