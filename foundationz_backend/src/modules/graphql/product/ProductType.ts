import { objectType } from "nexus";
import Product from "@orm/Product/Product";

export const ProductType = objectType({
  name: "Product",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("name");
    t.field("resource", {
      type: "Resource",
      async resolve({ id }) {
        const product = await Product.query().findById(id);
        return product?.$relatedQuery("resource") || null;
      },
    });
  },
});
