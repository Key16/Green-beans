import React from "react";
import { Text } from "@chakra-ui/react";

//catchall page
const NoMatch = () => {
  return (
    <div>
      <Text minHeight="200" m="5" fontSize="4xl">
        Oops this page doesn't exist.
      </Text>
      <Text minHeight="10" m="6" fontSize="xl">
        Click Go Back below or select options above
      </Text>
    </div>
  );
};

export default NoMatch;
