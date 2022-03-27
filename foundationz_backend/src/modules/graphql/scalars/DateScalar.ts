import { scalarType } from "nexus";
import { GraphQLScalarSerializer, Kind } from "graphql";

export const DateScalar = scalarType({
  name: "Date",
  asNexusMethod: "date",
  description: "Date custom scalar type",

  parseValue(value) {
    return new Date(value as string);
  },

  serialize(value) {
    return (value as Date).getTime();
  },

  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }

    return null;
  },
});
