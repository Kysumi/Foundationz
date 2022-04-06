import { v4 } from "uuid";
import BaseSeeder from "../baseSeeder.js";
import { Allotments } from "../../seeder.js";
import { faker } from "@faker-js/faker";

export default class AllotmentRebookSeeder extends BaseSeeder {
  generate() {
    this.data = Allotments.get().reduce((current, allotment) => {
      return [
        ...current,
        ...Array.from(Array(this.randomNumberPlox())).map(() => {
          const start_date = faker.helpers.randomize([
            faker.date.past(1),
            faker.date.soon(10),
          ]);
          const end_date = faker.date.future(1);
          return {
            id: v4(),
            allotment_id: allotment.id,
            start_date: start_date,
            end_date: end_date,
            created_at: new Date(),
            updated_at: new Date(),
          };
        }),
      ];
    }, []);
    return this;
  }
}
