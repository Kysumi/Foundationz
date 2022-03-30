import { Request } from "express";
import { getUser } from "@auth/getUser";
import { User } from "@orm/user";
import DataLoader from "dataloader";
import Organization from "@orm/organization/Organization";
import { SessionData } from "@auth/auth";

interface CustomRequest extends Request {
  session: SessionData;
}

export interface Context {
  user?: User;
  session: SessionData;
  loaders: typeof loaders;
}

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

export const context = async ({ req }: { req: CustomRequest }) => {
  if (req.session.userid) {
    user = await getUser(req.session.userid);
  }
  return {
    user,
    session: req.session,
    loaders,
  };
};
