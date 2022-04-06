import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from "apollo-server-plugin-base";
import { GraphQLServiceContext } from "apollo-server-core";
import cookie from "cookie";
import { CookieData } from "@graphql/context";

export class ApolloCookies implements ApolloServerPlugin {
  async serverWillStart(service: GraphQLServiceContext): Promise<void> {
    console.info("Apollo cookie plugin running.");
  }

  async requestDidStart(): Promise<GraphQLRequestListener> {
    return {
      willSendResponse: async function (requestContext) {
        const { setCookies = [] } = requestContext.context;

        if (!Array.isArray(requestContext.context.setCookies)) {
          console.warn("setCookies is missing from context");
        }

        if (setCookies.length > 1) {
          throw new Error(
            "Apollo server is limited to setting one cookie at a time."
          );
        }

        setCookies.forEach((currentCookie: CookieData) => {
          let cookieString = cookie.serialize(
            currentCookie.name,
            currentCookie.value,
            currentCookie.options
          );
          requestContext.response.http?.headers.set("Set-Cookie", cookieString);
        });
      },
    };
  }
}
