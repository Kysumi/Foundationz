import React from 'react'
import { Anchor } from 'grommet'
import type { AnchorExtendedProps } from 'grommet/components/Anchor'
import type { LinkProps } from '@remix-run/react'
import { Link } from '@remix-run/react'

export const AnchorLink: React.FC<AnchorLinkProps> = (props) => {
    return <Anchor as={Link} {...props} />
}

export type AnchorLinkProps = LinkProps & AnchorExtendedProps
