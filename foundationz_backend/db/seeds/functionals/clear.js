export async function ClearDatabase(knex) {
  await knex("allotments").del();
  await knex("allotment_rebook").del();
  await knex("booking_resource").del();
  await knex("bookings").del();
  await knex("resources").del();
  await knex("organization_user").del();
  await knex("users").del();
  await knex("products").del();
  await knex("organizations").del();
}
