import { objectType } from "nexus";

export const OrganizationType = objectType({
    name: "Organization",
    definition(t) {
        t.nonNull.string("id");
        t.nonNull.string("name");
    }
});