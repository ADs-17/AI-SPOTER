import { Flex } from "@chakra-ui/react";

const FormContainer = ({ children, width = "md" }) => {
  return (
    <Flex
      direction="column"
      boxShadow="md"
      rounded="md"
      color="whiteAlpha.900"
      backdropFilter="auto"
      backdropContrast="90%"
      border="1px solid rgba(209, 213, 219, 0.3)"
      borderRadius="2xl"
      p="10"
      width={width}
    >
      {children}
    </Flex>
  );
};

export default FormContainer;
