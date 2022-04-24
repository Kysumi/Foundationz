import type { AppData } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { gql } from '@apollo/client';
import getClient from '~/graphql/client';

export type Policy<PolicyResult> = (
    request: Request,
    options: {
        success: (
            input: PolicyResult
        ) => Promise<Response> | Response | Promise<AppData> | AppData;
        failure?: () =>
            | Promise<Response>
            | Response
            | Promise<AppData>
            | AppData;
    }
) => Promise<Response> | Response | Promise<AppData> | AppData;

const WHO_AM_I = gql`
    query WhoAmI {
        whoAmI {
            id
            firstName
            surname
            email
            organizations {
                id
            }
        }
    }
`;

interface User {}

export const authenticated: Policy<{ user: User }> = async (
    request,
    { success, failure }
) => {
    try {
        const user = await getClient(request).query({ query: WHO_AM_I });
        return await success({ user: user.data.whoAmI || null });
    } catch (e) {
        const url = new URL(request.url);
        if (url.pathname === '/login') {
            return null;
        }

        if (failure) {
            return failure();
        }

        return redirect('/login');
    }
};
