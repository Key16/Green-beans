import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
// import BeanList from "../components/BeanList";
// import CategoryMenu from "../components/CategoryMenu";
// import BeanForm from "../components/BeanForm";
import { useMutation } from "@apollo/client";

import { ADD_BEAN } from "../utils/mutations";
// import { QUERY_USER } from "../components/utils/queries";

import Auth from "../utils/auth";

import {
  Box,
  FormLabel,
  Input,
  Select,
  Text,
  Stack,
  Button,
  useToast,
  ButtonGroup,
  Textarea,
  InputLeftAddon,
  InputGroup,
} from "@chakra-ui/react";

const BeanForm = () => {
  const toast = useToast();
  const initialState = {
    title: "",
    description: "",
    image: "",
    donation: "0",
  };

  const [formState, setFormState] = useState(initialState);

  const [addBean] = useMutation(ADD_BEAN);

  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log("Auth.getProfile().data, :>> ", Auth.getProfile().data);

    const author =
      Auth.getProfile().data.firstName + " " + Auth.getProfile().data.lastName;

    const donationInt = parseInt(formState.donation);
    let savedImage;

    console.log("formState :>> ", formState);

    console.log("author :>> ", author);
    try {
      if (formState.image) {
        savedImage = formState.image;
      } else {
        savedImage =
          "https://h7.alamy.com/comp/W9P1GN/seamless-pattern-tile-cartoon-with-peas-and-beans-illustration-W9P1GN.jpg";
      }

      const { data } = await addBean({
        variables: {
          title: formState.title,
          description: formState.description,
          image: savedImage,
          beanAuthor: author,
          donation: donationInt,
        },
      });
      console.log("data :>> ", data);
      toast({
        title: "Bean Created",
        description: "Thank you for creating your bean!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      navigate("/beans");
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("name :>> ", name);
    console.log("value :>> ", value);
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleClear = () => {
    // const { name, value } = event.target;
    console.log("formState :>> ", formState);
    setFormState(initialState);
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <div>
          <Text mt="5" pl="5" fontSize="2xl">
            {" "}
            Create a Bean
          </Text>
          <form onSubmit={handleFormSubmit}>
            <Stack
              width={[
                // 0-30em
                "90%", // 30em-48em
              ]}
              pb={55}
              mx="5"
              mt="5"
              mb={15}
              spacing="24px"
              onSubmit={handleFormSubmit}
            >
              <Box>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  name="title"
                  value={formState.title}
                  onChange={handleChange}
                  placeholder="Title of your Bean"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="description">Bean description</FormLabel>
                <Textarea
                  name="description"
                  onChange={handleChange}
                  value={formState.description}
                  placeholder="Clean up a local beach for the community, or arrange an activity to go plogging! (Hiking whilst cleaning up the path)"
                  size="sm"
                />
              </Box>
              <Box width={["100%", "30%"]}>
                <FormLabel>Funds needed</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="$" />
                  <Input
                    type="number"
                    name="donation"
                    value={formState.donation}
                    onChange={handleChange}
                    min={0}
                  ></Input>
                </InputGroup>
              </Box>
              {/* <Box width={["100%", "72"]}>
            <FormLabel htmlFor="owner">Select Category</FormLabel>
            <Select
              value={category}
              onChange={handleCategoryChange}
              id="owner"
              defaultValue="Clean Up"
            >
              <option value="Clean Up">Clean Up</option>
              <option value="Restoration">Restoration</option>
              <option value="Green Energy">Green Energy</option>

              <option value="Other">Other</option>
            </Select>
          </Box> */}
              <FormLabel htmlFor="Image">Image</FormLabel>
              <Input
                name="image"
                value={formState.image}
                onChange={handleChange}
                id="Image"
                placeholder="Image URL"
              />
              <ButtonGroup>
                <Button variant="outline" onClick={handleClear} mr={3}>
                  Clear
                </Button>
                <Button colorScheme="blue" type="submit">
                  Create Bean
                </Button>
              </ButtonGroup>
            </Stack>
          </form>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default BeanForm;
