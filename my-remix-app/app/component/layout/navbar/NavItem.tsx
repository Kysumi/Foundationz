import { AnchorLink } from '~/component/navigation/AnchorLink';
import { Box } from 'grommet';
import type { ReactElement } from 'react';
import React from 'react';

export interface NavItemProps {
    title: string;
    icon: ReactElement;
    link: string;
}

export const NavItem: React.FC<NavItemProps> = ({ title, link, icon }) => {
    return (
        <AnchorLink to={link} alignSelf={'center'}>
            <Box direction={'row'} pad={'small'} background={'accent-1'}>
                <Box pad={{ right: 'small' }}>{title}</Box>
                {icon}
            </Box>
        </AnchorLink>
    );
};
