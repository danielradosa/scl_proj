import React from "react";
import { createRoot } from "react-dom/client";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const { REACT_APP_GRAPHQL_URL } = process.env;

const httpLink = new HttpLink({
  uri: REACT_APP_GRAPHQL_URL,
});

// set token to headers
const authLink = setContext((_, { headers }) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}` || "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);
