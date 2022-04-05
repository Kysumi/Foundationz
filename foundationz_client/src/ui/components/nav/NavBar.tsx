import { Nav } from "grommet";
import { UserMenu } from "./UserMenu/UserMenu";
import styled from "styled-components";
import React from "react";
import * as Icons from "grommet-icons";
import { AnchorLink } from "../AnchorLink/AnchorLink";

const Calendar = styled(Icons.Calendar)`
  margin-left: 10px;
`;

const User = styled(Icons.DocumentUser)`
  margin-left: 10px;
`;

const Booking = () => {
  return (
    <AnchorLink to={"/bookings"} alignSelf={"center"}>
      Bookings
      <Calendar />
    </AnchorLink>
  );
};

const Contact = () => {
  return (
    <AnchorLink to={"/contacts"} alignSelf={"center"}>
      Contacts
      <User />
    </AnchorLink>
  );
};

const UserMenuContainer = styled.div`
  margin-left: auto;
`;

export const NavBar = () => {
  return (
    <Nav
      direction="row"
      background="brand"
      pad="small"
      alignContent={"center"}
      focusIndicator={false}
    >
      <Booking />
      <Contact />
      <UserMenuContainer>
        <UserMenu />
      </UserMenuContainer>
    </Nav>
  );
};
