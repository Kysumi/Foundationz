import { objectType } from "nexus";

export const StandardMessage = objectType({
  name: "Message",
  definition(t) {
    t.nonNull.string("message");
  },
});