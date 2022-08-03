import React, { useEffect } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";

import { QUERY_USER } from "../utils/queries";
import { REMOVE_BEAN } from "../utils/mutations";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_BEANS } from "../utils/actions";

import Auth from "../utils/auth";

import {
  Box,
  Wrap,
  Image,
  Text,
  Button,
  Divider,
  Spinner,
} from "@chakra-ui/react";

const Profile = () => {
  const [state, dispatch] = useStoreContext();

  const { loading, data } = useQuery(QUERY_USER);

  const { beans } = state;

  console.log("data :>> ", data);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_BEANS,
        beans: data.user.bean,
      });
    }
    console.log("this is data from useeffect :>> ", data);
  }, [data, dispatch]);

  const [removeBean, { error }] = useMutation(REMOVE_BEAN);

  // const navigate = useNavigate();

  const store = useStoreContext();
  console.log("store :>> ", store);

  let user;

  const deleteBean = async (event, beanId) => {
    console.log("event :>> ", event);
    console.log("beanId :>> ", beanId);
    event.preventDefault();
    // console.log('object :>> ', object);
    try {
      await removeBean({
        variables: { beanId: beanId },
      });
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <Spinner
        m="3"
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.500"
        size="xl"
      />
    );
  } else if (data) {
    user = data.user;
  }

  return (
    <div>
      {Auth.loggedIn() ? (
        <Wrap
          width={[
            "90%", // 0-30em
            "70%", // 30em-48em
          ]}
          py={30}
          m="8"
          spacing="30px"
        >
          <Text fontSize="2xl"> Welcome {user.firstName}!</Text>
          <Divider />
          {user.bean.length ? (
            <div>
              <Text mb="3" fontSize="xl">
                {" "}
                Your projects below
              </Text>
              {user.bean.map((bean) => (
                <Box
                  width={[
                    "100%", // 0-30em
                  ]}
                  bg="white"
                  border="1px"
                  borderColor="gray.200"
                  p={4}
                  mb={5}
                  key={bean._id}
                >
                  <Image
                    boxSize="xs"
                    objectFit="cover"
                    src={bean.image}
                    alt={bean.title}
                    width="100%"
                  />
                  <Text fontSize="2xl">{bean.title}</Text>
                  <Text fontSize="lg">{bean.description}</Text>
                  <br></br>
                  {bean.donation ? (
                    <Text fontSize="lg"> Bean Fund $ {bean.donation} </Text>
                  ) : null}
                  <Text as="i" fontSize="sm">
                    Posted on {bean.createdAt}{" "}
                  </Text>
                  <br></br>
                  <Button onClick={(e) => deleteBean(e, bean._id)}>
                    Delete
                  </Button>
                </Box>
              ))}
            </div>
          ) : (
            <Box>
              Looks like you have no beans!
              <br></br>
              <br></br>
              <Button colorScheme="teal" mr={3}>
                <Link to="/beanform">Grow a Bean</Link>
              </Button>
            </Box>
          )}
        </Wrap>
      ) : (
        <Navigate to="/login" />
      )}
      ;
    </div>
  );
};

export default Profile;
