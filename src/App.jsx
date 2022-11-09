import "./styles.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Posts from "./Posts";
import { setContext } from "apollo-link-context";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import IsAuthenticated from "./components/IsAuthenticated";
import LogoutButton from "./components/logoutButton";

const { REACT_APP_GRAPHQL_URL } = process.env;

const httpLink = new HttpLink({ uri: REACT_APP_GRAPHQL_URL });

const authlink = setContext(async (req, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const link = authlink.concat(httpLink);
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          {/* Public routes */}

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}

          <Route
            element={
              <>
                <LogoutButton />
                <IsAuthenticated />
              </>
            }
          >
            <Route element={<Posts />} path="/dashboard" />
          </Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
