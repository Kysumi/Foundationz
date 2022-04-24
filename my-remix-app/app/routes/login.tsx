import { Box, Button, Card, FormField, TextInput } from 'grommet';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { authenticated } from '~/auth/auth';

const LOGIN = `
    mutation Mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            email
            firstName
            surname
        }
    }
`;

export const loader: LoaderFunction = async ({ params, request }) => {
    return authenticated(request, {
        success: async () => {
            return redirect('/');
        },
        failure: async () => {
            return null;
        },
    });
};

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const data = Object.fromEntries(form);

    const email = form.get('email');
    const password = form.get('password');

    // we do this type check to be extra sure and to make TypeScript happy
    // we'll explore validation next!
    if (typeof email !== 'string' || typeof password !== 'string') {
        return json(
            {
                formError: 'Missing input details',
            },
            { status: 400 }
        );
    }

    try {
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: LOGIN,
                variables: {
                    email,
                    password,
                },
            }),
        });

        if (response.status !== 200) {
            return json(
                {
                    formError: 'Invalid credentials',
                },
                {
                    status: 400,
                }
            );
        }

        return redirect(`/`, { headers: response.headers });
    } catch (e) {
        console.log(e);
        return json(
            {
                formError: 'Missing input details',
            },
            {
                status: 400,
            }
        );
    }
};

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
    );
}
