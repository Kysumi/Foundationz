import BaseSeeder from "../baseSeeder.js";
import { Organizations, Users } from "../../seeder.js";

export default class OrgUserLinkSeeder extends BaseSeeder {
  generate() {
    this.data = Users.get().reduce((current, user) => {
      const links = this.randomNumberPlox();

      return [
        ...current,
        ...Array.from(Array(links)).map(() => {
          return {
            user_id: user.id,
            organization_id: Organizations.random().id,
            created_at: new Date(),
            updated_at: new Date(),
          };
        }),
      ];
    }, []);
    return this;
  }
}
