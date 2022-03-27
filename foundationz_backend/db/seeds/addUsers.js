import { faker } from "@faker-js/faker";
import { v4 } from "uuid";

const PRODUCT_AMOUNT = 200;
const ORGANIZATION_AMOUNT = 5;
const USER_AMOUNT = 20;

function getRand(maxLimit = 100) {
  const rand = Math.random() * maxLimit;
  return Math.floor(rand);
}

function makeNewFakeUser() {
  return {
    id: v4(),
    first_name: `${faker.name.firstName()}`,
    surname: `${faker.name.lastName()}`,
    email: faker.internet.email(),
    created_at: new Date(),
  };
}

function makeNewProduct(orgId) {
  return {
    id: v4(),
    created_at: new Date(),
    name: faker.commerce.productName(),
    organization_id: orgId,
  };
}

function makeNewOrg() {
  return {
    id: v4(),
    created_at: new Date(),
    name: faker.company.companyName(),
  };
}

function makeNewOrganizationUserLink(orgId, userId) {
  return {
    user_id: userId,
    organization_id: orgId,
  };
}

async function staticSeeded(knex) {
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
      email: "aboomy@gmail.com",
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

export const seed = async (knex) => {
  // Deletes ALL existing entries
  await knex("organization_user").del();
  await knex("users").del();
  await knex("products").del();
  await knex("organizations").del();

  await staticSeeded(knex);

  const users = Array.from(Array(USER_AMOUNT)).map(makeNewFakeUser);
  const orgs = Array.from(Array(ORGANIZATION_AMOUNT)).map(makeNewOrg);

  const products = Array.from(Array(PRODUCT_AMOUNT)).map(() => {
    const org = orgs[getRand(orgs.length)];
    return makeNewProduct(org.id);
  });

  const linkUserToOrg = users.map((user) => {
    const org = orgs[getRand(orgs.length)];
    return makeNewOrganizationUserLink(org.id, user.id);
  });

  await knex("organizations").insert(orgs);
  await knex("users").insert(users);
  await knex("organization_user").insert(linkUserToOrg);
  await knex("products").insert(products);

  return knex;
};
