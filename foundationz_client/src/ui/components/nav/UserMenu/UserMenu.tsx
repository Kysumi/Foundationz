import { Avatar, Box, DropButton, Notification } from "grommet";
import * as Icons from "grommet-icons";
import { useLogoutMutation } from "../../../../generated/graphql";
import React from "react";
import { useNavigate } from "react-router";

export const UserMenu = () => {
  const [logout, { error, reset }] = useLogoutMutation({});
  const nav = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      nav("/login");
    } catch (e) {}
  };

  return (
    <>
      <DropButton
        label={
          <Avatar background="accent-2">
            <Icons.User color="accent-1" />
          </Avatar>
        }
        dropContent={
          <Box pad={"small"} background="light-2">
            <Box pad={"small"} direction="row">
              Users Name:
            </Box>
            <Box pad={"small"} direction="row" onClick={handleLogout}>
              Logout
              <Icons.Logout />
            </Box>
          </Box>
        }
      />
      {error && (
        <Notification
          toast
          status={"critical"}
          title={"Error"}
          message="Something has gone wrong."
          onClose={() => reset()}
        />
      )}
    </>
  );
};
