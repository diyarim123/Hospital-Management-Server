/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("room_assignments").del();

  // Inserts seed entries
  await knex("room_assignments").insert([
    {
      room_id: 1, 
      patient_id: 5,
      doctor_id: 4, 
      start_time: "2024-11-30 10:00:00",
      end_time: "2024-11-30 12:00:00",
    },
    {
      room_id: 2,
      patient_id: 4,
      doctor_id: 6,
      start_time: "2024-11-30 14:00:00",
      end_time: "2024-11-30 16:00:00",
    },
    {
      room_id: 3,
      patient_id: 6,
      doctor_id: 5,
      start_time: "2024-12-01 09:00:00",
      end_time: "2024-12-01 11:00:00",
    },
  ]);
};
