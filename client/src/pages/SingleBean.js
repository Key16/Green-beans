import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_BEAN } from "../utils/queries";
import Auth from "../utils/auth";

import {
  Box,
  Wrap,
  Spacer,
  Text,
  Button,
  ButtonGroup,
  Divider,
  Spinner,
} from "@chakra-ui/react";

const Beans = () => {
  const { beanId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_BEAN, {
    // pass URL parameter
    variables: { beanId: beanId },
  });

  const bean = data?.bean || {};
  console.log("data :>> ", data);
  console.log("bean :>> ", bean);

  function Authentication() {
    if (Auth.loggedIn() && bean.donation) {
      return (
        <ButtonGroup gap="3">
          <Button variant="outline" mr="2" colorScheme="teal">
            Fund this Bean
          </Button>
        </ButtonGroup>
      );
    } else if (bean.donation) {
      return (
        <div>
          <Text fontSize="xl">
            To fund this bean you must be
            <Text color="teal">
              <Link to="/login">logged in </Link>{" "}
            </Text>
          </Text>{" "}
        </div>
      );
    }
  }

  return (
    <div>
      {loading ? (
        <Spinner
          m="3"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
      ) : (
        <div>
          <Wrap py={30} mx="10" mt="10" mb="5" spacing="30px">
            <Box width={["100%", "75%", "50%"]} bg="white" key={bean._id}>
              {bean.image ? (
                <img src={bean.image} alt={bean.title} />
              ) : (
                <img
                  src="https://h7.alamy.com/comp/W9P1GN/seamless-pattern-tile-cartoon-with-peas-and-beans-illustration-W9P1GN.jpg"
                  alt={bean.title}
                />
              )}
            </Box>
            <Spacer />
            <Box
              width={[
                "100%",
                "75%", // 0-30em
                "40%", // 30em-48em
              ]}
              bg="white"
            >
              <Text fontSize="3xl">{bean.title}</Text>
              <Text as="i" fontSize="md">
                Posted by {bean.beanAuthor} on {bean.createdAt}
              </Text>
              <Divider />
              <Text py={10} fontSize="2xl">
                {bean.description}
              </Text>
              <Box width={["100%"]} height="160px">
                {bean.donation ? (
                  <Text mb="3" fontSize="2xl">
                    {" "}
                    Bean amount ${bean.donation}{" "}
                  </Text>
                ) : null}{" "}
                {Authentication()}
              </Box>
            </Box>
          </Wrap>

          <Wrap py={30} m="10" spacing="30px">
            <Spacer />
          </Wrap>
        </div>
      )}
    </div>
  );
};

export default Beans;
