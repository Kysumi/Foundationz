import type { NormalizedCacheObject } from '@apollo/client';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

let client: ApolloClient<NormalizedCacheObject> | null = null;

export default function getClient(request: Request) {
    if (client) {
        return client;
    }

    const enchancedFetch = (url: string, init: RequestInit) => {
        return fetch(url, {
            ...init,
            headers: {
                ...init.headers,
                Cookie: request.headers.get('cookie') || '',
            },
        }).then((response) => response);
    };

    client = new ApolloClient({
        cache: new InMemoryCache(),
        ssrMode: true,
        credentials: 'include',
        link: new HttpLink({
            uri: 'http://localhost:4000/graphql',
            credentials: 'same-origin',
            fetch: enchancedFetch,
        }),
    });

    return client;
}
