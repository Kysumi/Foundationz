export async function staticSeeders(knex) {
  await knex("organizations").insert([
    {
      id: "f1a119e2-ace4-11ec-b909-0242ac120002",
      name: "Foundationz",
      created_at: new Date(),
    },
  ]);

  await knex("users").insert([
    {
      id: "7efe2d3a-ace4-11ec-b909-0242ac120002",
      first_name: `abomy`,
      surname: `foote`,
      email: "abomyy@gmail.com",
      password: "$2b$10$js6kXY9eJEe2TUBbAPdC1uhZsBqTrEm22Lm0mVqQYCPISIyhSbmwK",
      created_at: new Date(),
    },
    {
      id: "2e85aec5-1f92-49d2-aa53-0c1ddc279375",
      first_name: `Scott`,
      surname: `Maunder`,
      email: "maunderscott@gmail.com",
      password: "$2b$10$uyQbz63ZP1uda2rF2qeZIuGBiD6Jkjbd0Lz0AphIX4XVwDXWCcAe2",
      created_at: new Date(),
    },
  ]);

  await knex("organization_user").insert([
    {
      user_id: "7efe2d3a-ace4-11ec-b909-0242ac120002",
      organization_id: "f1a119e2-ace4-11ec-b909-0242ac120002",
    },
  ]);
}
