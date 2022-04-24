import { Box } from 'grommet'
import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

type LoaderData = { booking: string }

export const loader: LoaderFunction = async ({ params }) => {
    console.log(params)
    return {
        booking: params.bookingId,
    }
}

export default function BookingRoute() {
    const data = useLoaderData<LoaderData>()
    return (
        <Box>
            yayayyaya:
            {data.booking}
        </Box>
    )
}
