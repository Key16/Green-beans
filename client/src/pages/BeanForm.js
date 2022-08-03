import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_BEAN } from "../utils/mutations";

import Auth from "../utils/auth";

import {
  Box,
  FormLabel,
  Input,
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
  //taost is banner that pops up when succeeded
  const toast = useToast();
  //sets initial state of form so it can be cleared
  const initialState = {
    title: "",
    description: "",
    image: "",
    donation: "",
  };

  //uses the initial state set above
  const [formState, setFormState] = useState(initialState);

  //to create a new bean mutation
  const [addBean] = useMutation(ADD_BEAN);

  //to navigate to a new page after success
  const navigate = useNavigate();

  //when the form is submited
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    //combines the author first name last name from the Auth token
    const author =
      Auth.getProfile().data.firstName + " " + Auth.getProfile().data.lastName;

    //turns the donation number from string to number
    const donationInt = parseInt(formState.donation);

    //blank value for image so a placeholder image can be uploaded if no image is uploaded
    let savedImage;

    //sets the default image if no image is uploaded
    try {
      if (formState.image) {
        savedImage = formState.image;
      } else {
        savedImage =
          "https://h7.alamy.com/comp/W9P1GN/seamless-pattern-tile-cartoon-with-peas-and-beans-illustration-W9P1GN.jpg";
      }

      //adds the bean using the form variables
      const { data } = await addBean({
        variables: {
          title: formState.title,
          description: formState.description,
          image: savedImage,
          beanAuthor: author,
          donation: donationInt,
        },
      });

      //banner that pops up with bean is crated
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

  //stores the form name and value when text is typed into the form
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  //if the clear button is pressed, clear the form
  const handleClear = () => {
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
                  ></Input>
                </InputGroup>
              </Box>

              {/* This section is for category but is not being used at the moment */}

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
