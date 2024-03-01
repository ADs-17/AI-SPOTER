import { Alert, AlertIcon, AlertTitle, Flex } from "@chakra-ui/react";

const Message = ({ type = "info", children }) => {
  return (
    <Flex justifyContent="center">
      <Alert status={type} bgColor="transparent">
        <AlertIcon />
        <AlertTitle textAlign="center">{children}</AlertTitle>
      </Alert>
    </Flex>
  );
};

export default Message;
