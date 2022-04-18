import { arg, enumType, extendType, nonNull, stringArg } from "nexus";
import { UserInputError } from "apollo-server";

export const ResourceEnumType = enumType({
  name: "ResourceType",
  members: ["Employee", "Product", "Location"],
  description: "The type of Resource",
});

export const GetResources = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("getResources", {
      args: {
        organizationId: nonNull(
          stringArg({ description: "id of the organization" })
        ),
        resourceType: nonNull(
          arg({
            type: "ResourceType",
            description: "Type of resources to filter to",
          })
        ),
      },
      type: "Resource",

      // TODO ACL logic to ensure user has permission to query this
      resolve: async (_, { resourceType, organizationId }, { loaders }) => {
        const organization = await loaders.organization.byId.load(
          organizationId
        );

        if (!organization) {
          throw new UserInputError("OrganizationId is not valid");
        }

        const query = organization.$relatedQuery("resources");

        switch (resourceType) {
          case "Employee":
            query.innerJoin(
              "employees",
              "resources.employeeId",
              "employees.id"
            );
            break;
          case "Product":
            query.innerJoin("products", "resources.employeeId", "products.id");
            break;
          case "Location":
            query.innerJoin(
              "locations",
              "resources.employeeId",
              "locations.id"
            );
            break;
        }

        return query;
      },
    });
  },
});
