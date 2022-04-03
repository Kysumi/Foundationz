import DataLoader from "dataloader";
import Organization from "@orm/organization/Organization";
import { User } from "@orm/user";

const UserLoaders = {
  organizations: new DataLoader<string, Organization[]>(async (userIds) => {
    return Promise.all(
      userIds.map(
        async (userId) => await User.relatedQuery("organizations").for(userId)
      )
    );
  }),
  byId: new DataLoader<string, User>(async (userIds) => {
    return User.query().findByIds(userIds.slice());
  }),
};

export default { user: UserLoaders };
