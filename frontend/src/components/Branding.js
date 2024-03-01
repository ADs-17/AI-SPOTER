import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const Branding = () => {
  return (
    <Flex wrap="wrap" margin="5px auto" w="60%">
      <Flex justifyContent="center" w="full" wrap="wrap">
        <Image w="sm" src="../assets/logoText.png" alt="logo" />
        <Text
          letterSpacing="4px"
          fontWeight="550"
          fontFamily="sans-serif"
          fontSize="md"
          color="whiteAlpha.800"
          textTransform="uppercase"
        >
          Mapping the Future with Intelligent Solutions.
        </Text>
      </Flex>
    </Flex>
  );
};

export default Branding;
