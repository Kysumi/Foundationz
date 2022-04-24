import { Nav } from 'grommet'
import React from 'react'
import * as Icons from 'grommet-icons'
import type { NavItemProps } from '~/component/layout/navbar/NavItem'
import { NavItem } from '~/component/layout/navbar/NavItem'

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
]

export const NavBar = () => {
    return (
        <Nav
            direction="row"
            background="brand"
            pad="small"
            alignContent={'center'}
            focusIndicator={false}
        >
            {config.map((item) => (
                <NavItem key={item.title} {...item} />
            ))}
        </Nav>
    )
}
