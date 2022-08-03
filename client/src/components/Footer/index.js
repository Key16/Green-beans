import React from "react";

import { Box, Spacer, Text, Wrap, Button } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

function Footer() {
  //location wont show back button if its home page
  const location = useLocation();

  //to navigate to other back pages
  const navigate = useNavigate();
  return (
    <div className="footer">
      <div className="return">
        {" "}
        {location.pathname !== "/" && (
          <Button colorScheme="white" onClick={() => navigate(-1)}>
            &larr; Go Back
          </Button>
        )}
      </div>

      <Wrap py={10}>
        <Box
          width={[
            "100%", // 0-30em
            "25%", // 48em-62em
          ]}
          ml="5"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3077/3077450.png"
            alt="beansprout"
          />
        </Box>
        <Spacer />
        <Box
          width={[
            "100%", // 0-30em

            "25%", // 48em-62em
          ]}
          mt="2"
        >
          <Text fontSize="2xl">Support</Text>
          <Text fontSize="lg">FAQs</Text>
          <Text fontSize="lg">Support Centre</Text>
        </Box>
        <Box
          width={[
            "100%", // 0-30em
            "20%", // 30em-48em
          ]}
          mt="2"
        >
          <Text fontSize="2xl">Company</Text>
          <Text fontSize="lg">About</Text>
          <Text fontSize="lg">Careers</Text>
          <Text fontSize="lg">Privacy policy</Text>
        </Box>

        <Box w="180px" />
      </Wrap>
    </div>
  );
}

export default Footer;
