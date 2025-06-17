import React from 'react';
import App from '../App';
import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client';

export const link = createHttpLink({
    uri: 'https://gql.dev.sajankumarv.tech/graphql',
});

export const client = new ApolloClient({
    cache: new InMemoryCache({}),
    link,
});

export const Page: React.FC = () => {
    return (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    );
};
