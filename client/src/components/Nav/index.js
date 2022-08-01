import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Stack,
  useToast,
  Text,
} from "@chakra-ui/react";

function Nav() {
  function Authentication() {
    if (Auth.loggedIn()) {
      return (
        <ButtonGroup gap="3">
          <Button mr="2" colorScheme="blackAlpha">
            <Link to="/profile">Profile</Link>
          </Button>
        </ButtonGroup>
      );
    }
  }

  function AuthStatus() {
    const toast = useToast();
    if (Auth.loggedIn()) {
      return (
        <Breadcrumb separator="/">
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Link to="/beans">Beans</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link
              to="/"
              onClick={() => {
                console.log("logged out");
                Auth.logout();
                toast({
                  title: "Logged Out",
                  description: "You've been successfully logged out",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
              }}
            >
              Log Out
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
      );
    } else {
      return (
        <Breadcrumb separator="/">
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/beans">Beans</Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Link to="/login">Login</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/signup">Sign Up</Link>
          </BreadcrumbItem>
        </Breadcrumb>
      );
    }
  }

  return (
    <div className="navbar">
      <Stack direction="column">
        <Box
          className="topnavbar"
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          py={10}
          bgImage="https://images.unsplash.com/photo-1487017931017-0e0d9e02bb0c"
          bgPosition="center"
          bgRepeat="no-repeat"
        >
          <Box
            width={[
              "100%", // 0-30em
              "20%", // 30em-48em
            ]}
            color="white"
            mt="2"
            mb="2"
            pl="2"
          >
            <Text fontSize="2xl">
              {" "}
              <Link to="/beans">Green Beans</Link>
            </Text>
          </Box>
          <ButtonGroup gap="3">
            <Button colorScheme="teal">
              <Link to="/beanform">Grow A Bean</Link>
            </Button>

            {Authentication()}
          </ButtonGroup>
        </Box>
      </Stack>

      <div className="breadNav">{AuthStatus()}</div>
    </div>
  );
}

export default Nav;
