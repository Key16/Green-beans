import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ChakraProvider } from "@chakra-ui/react";

import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Beans from "./pages/Beans";
import BeanForm from "./pages/BeanForm";
import SingleBean from "./pages/SingleBean";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import { StoreProvider } from "./utils/GlobalState";
// import Success from "./pages/Success";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
//
function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Router>
          <div>
            <StoreProvider>
              <Nav />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/beans" element={<Beans />} />
                <Route path="/beans/:beanId" element={<SingleBean />} />
                <Route path="/beanform" element={<BeanForm />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NoMatch />} />
              </Routes>
              <Footer />
            </StoreProvider>
          </div>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
