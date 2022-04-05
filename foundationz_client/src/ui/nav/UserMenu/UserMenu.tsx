import { useLogoutLazyQuery } from "../../../generated/graphql";
import { Avatar, Box, DropButton } from "grommet";
import * as Icons from "grommet-icons";

export const UserMenu = () => {
  const [logout] = useLogoutLazyQuery({});

  return (
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
          <Box pad={"small"} direction="row" onClick={logout}>
            Logout
            <Icons.Logout />
          </Box>
        </Box>
      }
    />
  );
};
