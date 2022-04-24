import { Box, Button, Card, FormField, TextInput } from 'grommet'
import { ActionFunction, json, redirect } from '@remix-run/node'

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const data = Object.fromEntries(form)
    console.log(data)

    const email = form.get('email')
    const password = form.get('password')

    // we do this type check to be extra sure and to make TypeScript happy
    // we'll explore validation next!
    if (typeof email !== 'string' || typeof password !== 'string') {
        return json(
            {
                formError: 'Missing input details',
            },
            { status: 400 }
        )
    }

    const fields = { email, password }

    console.log(email, password)

    return redirect(`/`)
}

export default function Login() {
    return (
        <Box fill pad={'large'}>
            <Box width={'large'} margin={'auto'}>
                <Card background="brand" pad={'xlarge'}>
                    <form method="post">
                        <FormField htmlFor="email" label="email" name={'email'}>
                            <TextInput name={'email'} type={'email'} />
                        </FormField>
                        <FormField htmlFor="password" label="password">
                            <TextInput name={'password'} type={'password'} />
                        </FormField>
                        <Box direction="row" gap="medium" pad={'medium'}>
                            <Button
                                type="submit"
                                primary
                                size={'large'}
                                label="Submit"
                            />
                        </Box>
                    </form>
                </Card>
            </Box>
        </Box>
    )
}
