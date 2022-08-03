import React from "react";

import { useQuery } from "@apollo/client";
import { QUERY_BEANS } from "../../utils/queries";

import { Link } from "react-router-dom";

import { Box, Wrap, Text, Image, Spinner } from "@chakra-ui/react";

function BeanList() {
  const { loading, data } = useQuery(QUERY_BEANS);
  let bean;

  if (data) {
    bean = data.beans;
  }

  return (
    <div>
      <Text mt="5" mb="5" pl="5" fontSize="2xl">
        {" "}
        All Beans
      </Text>
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
        <>
          {bean.length ? (
            <Wrap pb="10" mx={6} spacing="35px">
              {bean.map((beans) => (
                <Box
                  width={["100%", "45%", "30%"]}
                  bg="white"
                  border="1px"
                  borderColor="gray.200"
                  key={beans._id}
                >
                  <Link to={`/beans/${beans._id}`}>
                    <Image
                      boxSize="xs"
                      width={"100%"}
                      objectFit="cover"
                      src={beans.image}
                      alt={beans.title}
                    />

                    <Text px={2} fontSize="3xl">
                      {beans.title}
                    </Text>
                    <Text px={2} fontSize="xl">
                      Posted by {beans.beanAuthor}
                    </Text>
                    <Text px={2} fontSize="15">
                      on {beans.createdAt}
                    </Text>
                    {beans.donation ? (
                      <Text px={2} mt="5" pr="2">
                        {" "}
                        Bean Fund $ {beans.donation}{" "}
                      </Text>
                    ) : null}
                  </Link>
                </Box>
              ))}{" "}
            </Wrap>
          ) : (
            <h1> there are no beans </h1>
          )}{" "}
        </>
      )}
    </div>
  );
}

export default BeanList;
