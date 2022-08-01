import React, { useEffect } from "react";
// import { useStoreContext } from "../../utils/GlobalState";
import { useQuery } from "@apollo/client";
import { QUERY_BEANS } from "../../utils/queries";
// import { idbPromise } from '../../utils/helpers';
// import spinner from '../../assets/spinner.gif';
import { Link } from "react-router-dom";

import { Box, Wrap, Text, Image } from "@chakra-ui/react";

function BeanList() {
  //   const [state, dispatch] = useStoreContext();

  //   const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_BEANS);
  let bean;
  let donation;

  if (data) {
    bean = data.beans;
  }

  console.log("this is the loading", loading);
  console.log("data :>> ", data);

  console.log("bean :>> ", bean);

  //   useEffect(() => {
  //     if (data) {
  //       console.log("this is data for query beans", data);
  //     }
  //   }, [data, loading, dispatch]);

  //   function filterBeans() {
  //     if (!currentCategory) {
  //       return state.products;
  //     }

  //     return state.products.filter(
  //       (product) => product.category._id === currentCategory
  //     );
  //   }

  //       {loading ? <img src={spinner} alt="loading" /> : null}

  //   );

  return (
    <div>
      <Text mt="5" pl="5" fontSize="2xl">
        {" "}
        All Beans
      </Text>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <>
          {bean.length ? (
            <Wrap pb="10" mx={6} spacing="30px">
              {bean.map((beans) => (
                <Box
                  width={["100%", "30%"]}
                  bg="white"
                  border="1px"
                  borderColor="gray.200"
                  px={2}
                  key={beans._id}
                >
                  <Link to={`/beans/${beans._id}`}>
                    <Image
                      boxSize="xs"
                      objectFit="cover"
                      src={beans.image}
                      alt={beans.title}
                    />
                    <Text fontSize="3xl">{beans.title}</Text>
                    <Text fontSize="xl">
                      Posted by {beans.beanAuthor}
                      <Text fontSize="15">on {beans.createdAt}</Text>
                    </Text>
                    <Text mt="5" pr="2">
                      {beans.description}
                      {beans.donation ? (
                        <h1> Bean Fund $ {beans.donation} </h1>
                      ) : null}
                    </Text>
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
