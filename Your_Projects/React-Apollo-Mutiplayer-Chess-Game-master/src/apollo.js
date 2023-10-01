import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

import AuthGuard from './auth/AuthGuard';

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_GRAPHQL_SERVER}`
});

const wsLink = new WebSocketLink({
  uri: `${process.env.REACT_APP_GRAPHQL_SERVER_WS}`,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: () => {
      const token = AuthGuard.isAuthenticated();
      return {
        Authorization: token ? `Bearer ${token}` : null
      };
    }
  }
});

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = AuthGuard.isAuthenticated();

    if (token) {
      headers = { ...headers, Authorization: token ? `Bearer ${token}` : null };
    }

    return { headers };
  });

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log('GraphQL error', message);

      if (message === 'UNAUTHENTICATED') {
        console.error('Unauthenticated');
        document.location = '/logout';
      }
    });
  }

  if (networkError) {
    console.log('Network error', networkError);

    if (networkError.statusCode === 401 || networkError.statusCode === 400) {
      console.error('Unauthenticated');
      document.location = '/logout';
    }
  }
});

const link = ApolloLink.from([authLink, errorLink, terminatingLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
});

export default client;
