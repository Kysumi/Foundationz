import { staticSeeders } from "./functionals/static.js";
import { ClearDatabase } from "./functionals/clear.js";
import UserSeeder from "./functionals/user.js";
import ProductSeeder from "./functionals/product.js";
import OrganizationSeeder from "./functionals/organization/organizations.js";
import OrgUserLinkSeeder from "./functionals/organization/orgUserLink.js";

const PRODUCT_AMOUNT = 200;
const ORGANIZATION_AMOUNT = 5;
const USER_AMOUNT = 20;
const ORGANIZATION_LINK_MAX_LIMIT = 5;

export const Users = new UserSeeder(USER_AMOUNT).generate();
export const Organizations = new OrganizationSeeder(
  ORGANIZATION_AMOUNT
).generate();
export const OrgUserLinks = new OrgUserLinkSeeder(
  ORGANIZATION_LINK_MAX_LIMIT
).generate();
export const Products = new ProductSeeder(PRODUCT_AMOUNT).generate();

export const seed = async (knex) => {
  // Deletes ALL existing entries
  await ClearDatabase(knex);

  ///run the static seeders
  await staticSeeders(knex);

  await knex("organizations").insert(Organizations.get());
  await knex("users").insert(Users.get());
  await knex("organization_user").insert(OrgUserLinks.get());
  await knex("products").insert(Products.get());

  return knex;
};
