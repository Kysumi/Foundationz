import { v4 } from "uuid";
import { faker } from "@faker-js/faker";

let generatedResources = [];

export function generateResources(amount = 10) {
  if (generatedResources.length > 0) {
    return generatedResources;
  }
  generatedResources = Array.from(Array(amount)).map(() => {
    return {
      id: v4(),
      created_at: new Date(),
      name: faker.company.companyName(),
    };
  });

  return generatedResources;
}

export function randomResource() {
  return generatedResources[getRand(generatedResources.length)];
}
