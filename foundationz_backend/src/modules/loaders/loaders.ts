import UserLoaders from "@loaders/user";
import OrganizationLoaders from "@loaders/organization";

const Loaders = {
  ...UserLoaders,
  ...OrganizationLoaders,
};

export default Loaders;
