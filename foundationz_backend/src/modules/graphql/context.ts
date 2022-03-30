import { Request } from "express";
import { getUser } from "@auth/getUser";
import { User } from "@orm/user";
import DataLoader from "dataloader";
import Organization from "@orm/organization/Organization";

const loaders = {
  loadOrganizationFromUserId: new DataLoader<string, Organization[]>(
    async (userIds) => {
      return Promise.all(
        userIds.map(
          async (userId) => await User.relatedQuery("organizations").for(userId)
        )
      );
    }
  ),
  loadsUsersFromOrganisationId: new DataLoader<string, User[]>(
    async (organizationIds) => {
      return Promise.all(
        organizationIds.map(
          async (organizationId) =>
            await Organization.relatedQuery("users").for(organizationId)
        )
      );
    }
  ),
};

export interface Context {
  user?: User;
  loaders: typeof loaders;
}

export const context = async ({ req }: { req: Request }) => {
  const token = req.headers.authorization ? req.headers.authorization : "";
  const user = await getUser(token);

  return {
    user,
    loaders,
  };
};
