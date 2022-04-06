import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
} from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Grommet } from "grommet";
import { GlobalTheme } from "./ui/theme/GlobalTheme";
import { Route, Routes } from "react-router";
import { Login } from "./ui/pages/Login";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <Grommet theme={GlobalTheme}>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<App />} />
            </Routes>
          </div>
        </Grommet>
      </ApolloProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
