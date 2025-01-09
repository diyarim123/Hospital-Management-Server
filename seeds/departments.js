exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('departments').del();

  // Inserts seed entries
  await knex('departments').insert([
      {
        department_name: 'Emergency',
        description: 'Handles urgent medical cases and emergencies requiring immediate care.'
      },
      {
        department_name: 'Neurology',
        description: 'Focuses on brain, spinal cord, and nervous system disorders.'
      },
      {
        department_name: 'Pediatrics',
        description: 'Provides healthcare for infants, children, and adolescents.'
      },
  ]);
};





