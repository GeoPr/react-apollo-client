import React from 'react';
import { render } from 'react-dom';
import { StateProvider } from './state/state';
import App from './components/App';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './index.scss';

const client = new ApolloClient({
  uri: 'http://localhost:2121/graphql',
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <StateProvider>
      <App />
    </StateProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);
