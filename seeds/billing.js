exports.seed = async function (knex) {

  await knex('billing').del();

  await knex('billing').insert([
      {
          patient_id: 4,
          appointment_id: 14,
          amount: 100.00,
          payment_status: 'paid',
          bill_date: '2024-12-01',
      },
      {
          patient_id: 6,
          appointment_id: 12,
          amount: 50.00,
          payment_status: 'pending',
          bill_date: '2024-12-02',
      },
      {
          patient_id: 5,
          appointment_id: 13,
          amount: 200.00,
          payment_status: 'insurance',
          bill_date: '2024-12-03',
      },
      {
          patient_id: 4,
          appointment_id: 15,
          amount: 150.00,
          payment_status: 'paid',
          bill_date: '2024-12-04',
      },
      {
          patient_id: 5,
          appointment_id: 11,
          amount: 300.00,
          payment_status: 'pending',
          bill_date: '2024-12-05',
      },
  ]);
};
