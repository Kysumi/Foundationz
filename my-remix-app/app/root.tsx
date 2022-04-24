import { Links, Outlet, useLoaderData } from '@remix-run/react'
import { Grommet } from 'grommet'
import { GlobalTheme } from '~/GlobalTheme'
import { LiveReload } from './component/LiveReload'
import { NavBar } from '~/component/layout/navbar/navbar'
import styles from '~/index.css'
import { LoaderFunction } from '@remix-run/node'

export const loader: LoaderFunction = async ({ params, request }) => {
    console.log(request.headers.get('Cookie'))
    return { user: null }

    // let session = await getSession(request.headers.get('Cookie'))
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
    ]
}

export default function App() {
    const { user } = useLoaderData()

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <Links />
                <title>Foundationz</title>
                {typeof document === 'undefined' ? '__STYLES__' : null}
            </head>

            <body>
                <Grommet theme={GlobalTheme}>
                    <LiveReload />
                    {user && <NavBar />}

                    <Outlet />
                </Grommet>
            </body>
        </html>
    )
}
