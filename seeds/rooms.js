/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("rooms").del();


  await knex("rooms").insert([
    {
      room_id: 1,
      room_number: 101,
      room_type: "general",
      capacity: 2,
      availability_type: "available",
    },
    {
      room_id: 2,
      room_number: 102,
      room_type: "ICU",
      capacity: 1,
      availability_type: "occupied",
    },
    {
      room_id: 3,
      room_number: 103,
      room_type: "surgery",
      capacity: 1,
      availability_type: "available",
    },
    {
      room_id: 4,
      room_number: 104,
      room_type: "general",
      capacity: 4,
      availability_type: "occupied",
    },
  ]);
};
