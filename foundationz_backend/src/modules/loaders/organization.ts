import DataLoader from "dataloader";
import { User } from "@orm/user";
import Organization from "@orm/organization/Organization";

const OrganizationLoaders = {
  users: new DataLoader<string, User[]>(async (organizationIds) => {
    return Promise.all(
      organizationIds.map(
        async (organizationId) =>
          await Organization.relatedQuery("users").for(organizationId)
      )
    );
  }),
  byId: new DataLoader<string, Organization>(async (organizationIds) => {
    return Organization.query().findByIds(organizationIds.slice());
  }),
};

export default { organization: OrganizationLoaders };
