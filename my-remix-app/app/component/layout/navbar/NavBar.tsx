import { Button, Nav, Sidebar } from 'grommet';
import React from 'react';
import * as Icons from 'grommet-icons';
import type { NavItemProps } from '~/component/layout/navbar/NavItem';
import { NavItem } from '~/component/layout/navbar/NavItem';

const config: NavItemProps[] = [
    {
        title: 'Bookings',
        link: '/',
        icon: <Icons.Calendar />,
    },
    {
        title: 'Contacts',
        link: '/contacts',
        icon: <Icons.DocumentUser />,
    },
    {
        title: 'Invoices',
        link: '/invoices',
        icon: <Icons.Notes />,
    },
];

export const NavBar = () => {
    return (
        <Sidebar
            height={'100vh'}
            background="brand"
            pad="small"
            focusIndicator={false}
            footer={
                <Button
                    icon={<Icons.Logout />}
                    hoverIndicator
                    onClick={() => console.log('log out')}
                    label={'Sign out'}
                />
            }
        >
            <Nav gap={'small'}>
                {config.map((item) => (
                    <NavItem key={item.title} {...item} />
                ))}
            </Nav>
        </Sidebar>
    );
};
