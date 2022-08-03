import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

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

//the component that shows up when signing up
function Signup() {
  //this is for the password show
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  //toast is the pop up banner when succeeded with singing up
  const toast = useToast();

  //to navigate the user to their profile after sign up
  const navigate = useNavigate();

  //sets the state of the form
  const [formState, setFormState] = useState({ email: "", password: "" });

  //add user mutation
  const [addUser] = useMutation(ADD_USER);

  //when the form is submited
  const handleFormSubmit = async (event) => {
    //prevents page refresh when submit is clicked
    event.preventDefault();

    //adds user based on form variables
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });

    //retrun auth token to be stored in local storage
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
    //banner pops up when signed up
    toast({
      title: "Signed Up",
      description: "Welcome to Green Beans!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    navigate("/profile");
    window.location.reload(false);
  };

  //sets the formstate whenever something is typed into the form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <Text mt="5" pl="5" fontSize="2xl">
          {" "}
          Signup
        </Text>
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
            <FormLabel htmlFor="username"> Name</FormLabel>
            <Input
              width="47%"
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
            />

            <Input
              width="47%"
              ml="6%"
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
            />
          </Box>

          <Box>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Please enter email"
              onChange={handleChange}
            />
          </Box>
          <Box>
            <FormLabel htmlFor="pwd">Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                id="pwd"
                name="password"
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
            <Button colorScheme="blue" type="submit">
              Signup
            </Button>
          </ButtonGroup>
        </Stack>
      </form>
    </div>
  );
}

export default Signup;
