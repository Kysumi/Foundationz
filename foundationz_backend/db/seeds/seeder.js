import { staticSeeders } from "./functionals/static.js";
import { ClearDatabase } from "./functionals/clear.js";
import UserSeeder from "./functionals/user.js";
import ProductSeeder from "./functionals/product.js";
import OrganizationSeeder from "./functionals/organization/organizations.js";
import OrgUserLinkSeeder from "./functionals/organization/orgUserLink.js";
import EmployeeSeeder from "./functionals/employee.js";
import LocationSeeder from "./functionals/locations.js";
import ResourceSeeder from "./functionals/resources.js";
import ContactSeeder from "./functionals/contacts.js";
import BookingSeeder from "./functionals/bookings/bookings.js";
import BookingResourceSeeder from "./functionals/bookings/bookingResources.js";
import AllotmentSeeder from "./functionals/allotments/allotments.js";
import AllotmentRebookSeeder from "./functionals/allotments/allotmentRebooks.js";

const PRODUCT_AMOUNT = 200;
const ORGANIZATION_AMOUNT = 5;
const ORGANIZATION_LINK_MAX_LIMIT = 5;
const USER_AMOUNT = 20;
const LOCATIONS_AMOUNT = 20;
const EMPLOYEE_AMOUNT = 20;
const RESOURCE_AMOUNT = 20;
const BOOKING_AMOUNT = 10;
const CONTACT_AMOUNT = 10;
const ALLOTMENT_AMOUNT = 5;
const ALLOTMENT_REBOOK_AMOUNT = 3;

export const Users = new UserSeeder(USER_AMOUNT).generate();
export const Organizations = new OrganizationSeeder(
  ORGANIZATION_AMOUNT
).generate();
export const OrgUserLinks = new OrgUserLinkSeeder(
  ORGANIZATION_LINK_MAX_LIMIT
).generate();
export const Products = new ProductSeeder(PRODUCT_AMOUNT).generate();

export const Employees = new EmployeeSeeder(EMPLOYEE_AMOUNT).generate();
export const Locations = new LocationSeeder(LOCATIONS_AMOUNT).generate();
export const Resources = new ResourceSeeder(RESOURCE_AMOUNT).generate();

export const Contacts = new ContactSeeder(CONTACT_AMOUNT).generate();
export const Bookings = new BookingSeeder(BOOKING_AMOUNT).generate();
export const BookingsResources = new BookingResourceSeeder(
  BOOKING_AMOUNT
).generate();

export const Allotments = new AllotmentSeeder(ALLOTMENT_AMOUNT).generate();
export const AllotmentRebooks = new AllotmentRebookSeeder(
  ALLOTMENT_REBOOK_AMOUNT
).generate();

export const seed = async (knex) => {
  // Deletes ALL existing entries
  await ClearDatabase(knex);

  ///run the static seeders
  await staticSeeders(knex);

  await knex("organizations").insert(Organizations.get());
  await knex("users").insert(Users.get());
  await knex("organization_user").insert(OrgUserLinks.get());
  await knex("products").insert(Products.get());
  await knex("employees").insert(Employees.get());
  await knex("locations").insert(Locations.get());
  await knex("resources").insert(Resources.get());
  await knex("contacts").insert(Contacts.get());
  await knex("bookings").insert(Bookings.get());
  await knex("booking_resource").insert(BookingsResources.get());
  await knex("allotments").insert(Allotments.get());
  await knex("allotment_rebook").insert(AllotmentRebooks.get());

  return knex;
};
