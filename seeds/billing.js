exports.seed = async function (knex) {

  await knex('billing').del();

  await knex('billing').insert([
      {
          patient_id: 30,
          appointment_id: 53,
          amount: "25$",
          payment_status: 'Paid',
          bill_date: '2024-12-01',
      },
      {
          patient_id: 26,
          appointment_id: 54,
          amount: "50$",
          payment_status: 'Not Paid',
          bill_date: '2024-12-02',
      },
      {
          patient_id: 24,
          appointment_id: 56,
          amount: "200$",
          payment_status: 'Insurance',
          bill_date: '2024-12-03',
      },
      {
          patient_id: 20,
          appointment_id: 55,
          amount: "150$",
          payment_status: 'Paid',
          bill_date: '2024-12-04',
      },
      {
          patient_id: 10,
          appointment_id: 57,
          amount: "300$",
          payment_status: 'Insurance',
          bill_date: '2024-12-05',
      },
  ]);
};
