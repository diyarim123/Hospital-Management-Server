exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('medical_records').del();

  // Inserts seed entries
  await knex('medical_records').insert([
      {
          patient_id: 9,
          doctor_id: 12,
          diagnosis: 'Hypertension',
          treatment: 'Lifestyle changes and antihypertensive medication',
          prescription: 'Amlodipine 5mg once daily',
          record_date: '2024-11-28',
      },
      {
          patient_id: 7,
          doctor_id: 13,
          diagnosis: 'Type 2 Diabetes',
          treatment: 'Dietary modifications and insulin therapy',
          prescription: 'Metformin 500mg twice daily, Insulin as prescribed',
          record_date: '2024-11-29',
      },
      {
          patient_id: 8,
          doctor_id: 11,
          diagnosis: 'Fractured Arm',
          treatment: 'Immobilization with a cast and pain management',
          prescription: 'Paracetamol 500mg as needed for pain',
          record_date: '2024-11-30',
      },
      {
          patient_id: 9,
          doctor_id: 11,
          diagnosis: 'Asthma',
          treatment: 'Inhaler therapy and avoiding triggers',
          prescription: 'Salbutamol Inhaler 2 puffs as needed',
          record_date: '2024-12-01',
      },
      {
          patient_id: 7,
          doctor_id: 13,
          diagnosis: 'Migraine',
          treatment: 'Pain management and stress reduction techniques',
          prescription: 'Sumatriptan 50mg as needed for migraine',
          record_date: '2024-12-02',
      },
  ]);
};
