exports.seed = async function (knex) {

  await knex('billing').del();

  await knex('billing').insert([
      {
          patient_id: 9,
          appointment_id: 27,
          amount: 100.00,
          payment_status: 'paid',
          bill_date: '2024-12-01',
      },
      {
          patient_id: 8,
          appointment_id: 29,
          amount: 50.00,
          payment_status: 'pending',
          bill_date: '2024-12-02',
      },
      {
          patient_id: 9,
          appointment_id: 28,
          amount: 200.00,
          payment_status: 'insurance',
          bill_date: '2024-12-03',
      },
      {
          patient_id: 7,
          appointment_id: 30,
          amount: 150.00,
          payment_status: 'paid',
          bill_date: '2024-12-04',
      },
      {
          patient_id: 8,
          appointment_id: 26,
          amount: 300.00,
          payment_status: 'pending',
          bill_date: '2024-12-05',
      },
  ]);
};
