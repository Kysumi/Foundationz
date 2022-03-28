import knex from "knex";

const k = knex({
  client: "pg",
  useNullAsDefault: true,
  connection: "postgresql://postgres:postgres@localhost:5432/",
});

try {
  console.log("Dropping bombs!");

  await k.raw("DROP DATABASE foundationz");
  await k.raw("CREATE DATABASE foundationz");
  await k.raw("GRANT ALL PRIVILEGES ON DATABASE foundationz TO found;");

  console.log("NUKED BOII");
} catch (e) {
  console.log(e);
} finally {
  await k.destroy();
}
