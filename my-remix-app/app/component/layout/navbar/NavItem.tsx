import { AnchorLink } from '~/component/navigation/AnchorLink';
import { Button } from 'grommet';
import type { ReactElement } from 'react';
import React from 'react';

export interface NavItemProps {
    title: string;
    icon: ReactElement;
    link: string;
}

export const NavItem: React.FC<NavItemProps> = ({ title, link, icon }) => {
    return (
        <AnchorLink to={link} alignSelf={'center'} style={{width: '100%'}}>
            <Button margin={'none'} size={'small'} icon={icon} label={title} style={{width: '100%'}} />
        </AnchorLink>
    );
};
