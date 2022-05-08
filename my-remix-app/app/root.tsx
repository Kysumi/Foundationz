import { Links, Outlet, Scripts, useLoaderData } from '@remix-run/react';
import { Box, Card, Grid, Grommet, Heading, Text } from 'grommet';
import { GlobalTheme } from '~/GlobalTheme';
import { LiveReload } from './component/LiveReload';
import styles from '~/index.css';
import type { LoaderFunction } from '@remix-run/node';
import { authenticated } from '~/auth/auth';
import { NavBar } from '~/component/layout/navbar/NavBar';
import React from 'react'

export const loader: LoaderFunction = async ({ params, request }) => {
    return authenticated(request, {
        success: async (data) => {
            return data;
        },
    });
};

export function ErrorBoundary({ error }) {
    console.error(error);
    return (
        <html>
            <head>
                <title>Oh no!</title>
                <Links />
                {typeof document === 'undefined' ? '__STYLES__' : null}
            </head>
            <body>
                <Grommet theme={GlobalTheme}>
                    <Box fill pad={'large'}>
                        <Box width={'xlarge'} margin={'auto'}>
                            <Card background="brand" pad={'xlarge'}>
                                <Heading>Something went wrong</Heading>
                                <Text>We are already working on fixing it</Text>
                            </Card>
                        </Box>
                    </Box>
                </Grommet>
            </body>
        </html>
    );
}

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: styles,
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Montserrat&display=optional',
        },
    ];
}

export default function App() {
    const data = useLoaderData();
    const user = data?.user;
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <Links />
                <title>Foundationz</title>
                {typeof document === 'undefined' ? '__STYLES__' : null}
            </head>

            <body>
                <Scripts />
                <Grommet theme={GlobalTheme}>
                    <LiveReload />
                    <Box flex direction='row' height={'100vh'}>
                        {user && (
                            <Box width={'small'}>
                                <NavBar />
                            </Box>
                        )}
                        <Outlet />
                    </Box>
                </Grommet>
            </body>
        </html>
    );
}
