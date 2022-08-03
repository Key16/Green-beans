import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

// import ProductList from "../components/ProductList";
// import CategoryMenu from "../components/CategoryMenu";
// import Cart from "../components/Cart";
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

function Signup() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();

  const navigate = useNavigate();

  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("formState :>> ", formState);
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
    toast({
      title: "Signed Up",
      description: "Welcome to Green Beans!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    navigate("/profile");
  };

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
