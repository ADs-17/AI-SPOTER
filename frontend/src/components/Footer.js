import { Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      as="footer"
      justifyContent="center"
      py="5"
      bgColor="#0f031b"
      color="whiteAlpha.900"
    >
      <Text>
        Copyright {new Date().getFullYear()} AISpotr. All Rights Reserved.
      </Text>
    </Flex>
  );
};

export default Footer;
