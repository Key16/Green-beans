import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

import {
  Box,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Stack,
  Button,
  useToast,
  ButtonGroup,
} from "@chakra-ui/react";

function Login(props) {
  //sets initial state for form
  const [formState, setFormState] = useState({ email: "", password: "" });

  //login mutation
  const [login, { error }] = useMutation(LOGIN);

  //set state for password show field
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  //toast shows a little banner when scueeded
  const toast = useToast();

  //to navigate to profile after login
  const navigate = useNavigate();

  //after form submit
  const handleFormSubmit = async (event) => {
    //prevents page refresh
    event.preventDefault();
    //passes form variables to login mutation
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });

      //returns token to store in local storage
      const token = mutationResponse.data.login.token;
      Auth.login(token);
      //pops up a banner if logged in
      toast({
        title: "Logged In",
        description: "Welcome back to Green Beans!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      // navigate("/profile");
      window.location.assign("/profile");
    } catch (e) {
      console.log(e);
    }
  };

  //setes the formstate everytime something is typed into the form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div>
      <Text mt="5" pl="5" fontSize="2xl">
        {" "}
        Login
      </Text>
      <form onSubmit={handleFormSubmit}>
        <Stack
          width={[
            "90%", // 0-30em
            "50%", // 30em-48em
          ]}
          pb={55}
          mx="5"
          mt="5"
          mb={15}
          spacing="24px"
        >
          <Box>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Please enter email"
              onChange={handleChange}
            />
          </Box>
          <Box>
            <FormLabel htmlFor="pwd">Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                id="pwd"
                minLength="5"
                name="password"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                onChange={handleChange}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>

          <ButtonGroup>
            <Button variant="outline" mr={3}>
              <Link to="/signup">Sign Up</Link>
            </Button>
            <Button colorScheme="blue" type="submit">
              Login
            </Button>
          </ButtonGroup>
          {error ? (
            <div>
              <p className="error-text">
                The provided credentials are incorrect
              </p>
            </div>
          ) : null}
        </Stack>
      </form>
    </div>
  );
}

export default Login;
