export async function clearDatabase(knex) {
  await knex("allotment_rebook").del();
  await knex("booking_resource").del();
  await knex("resources").del();
  await knex("organization_user").del();
  await knex("users").del();
  await knex("products").del();
  await knex("employees").del();

  ///NO CHANGE ORDER
  await knex("allotments").del();
  await knex("booking_types").del();
  await knex("bookings").del();
  await knex("locations").del();
  await knex("contacts").del();
  await knex("organizations").del();
}
