/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('services').del();

  // Inserts seed entries
  await knex('services').insert([
    {
      service_name: 'X-ray',
      cost: 50.00,
      description: 'Radiology imaging service to examine internal structures.',
    },
    {
      service_name: 'Blood Test',
      cost: 20.00,
      description: 'Laboratory testing of blood samples for diagnostics.',
    },
    {
      service_name: 'MRI Scan',
      cost: 200.00,
      description: 'Magnetic Resonance Imaging for detailed internal body scans.',
    },
    {
      service_name: 'Surgery',
      cost: 1000.00,
      description: 'Operative procedures for treating injuries or diseases.',
    },
    {
      service_name: 'Pediatric Check-up',
      cost: 30.00,
      description: 'Routine medical check-ups for children.',
    },
  ]);
};
