import { makeVar } from "@apollo/client";
import { LoggedInUserFragment, useWhoAmIQuery } from "../generated/graphql";
import { useNavigate } from "react-router";

export const currentUser = makeVar<LoggedInUserFragment | undefined>(undefined);

export const useCurrentUser = () => {
  const nav = useNavigate();
  const user = currentUser();

  if (!user) {
    console.error("User not present");
    nav("/login");
  }

  return user as LoggedInUserFragment;
};

export const useCheckCurrentUser = () => {
  const { data, ...rest } = useWhoAmIQuery({
    fetchPolicy: "network-only",
  });

  if (data?.whoAmI) {
    currentUser(data?.whoAmI);
  }

  return {
    data,
    ...rest,
  };
};
