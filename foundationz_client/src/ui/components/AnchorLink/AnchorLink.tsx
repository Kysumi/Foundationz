import React from "react";
import { Anchor } from "grommet";
import { Link, LinkProps } from "react-router-dom";
import { AnchorExtendedProps } from "grommet/components/Anchor";

export const AnchorLink: React.FC<AnchorLinkProps> = (props) => {
  return <Anchor as={Link} {...props} />;
};

export type AnchorLinkProps = LinkProps & AnchorExtendedProps;
