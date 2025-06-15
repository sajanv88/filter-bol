import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    ApolloProvider,
} from '@apollo/client';
import './index.css';
import App from './App.tsx';

export const link = createHttpLink({
    uri: 'https://gql.dev.sajankumarv.tech/graphql',
});

export const client = new ApolloClient({
    cache: new InMemoryCache({}),
    link,
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </StrictMode>
);
