import { Flex, Spinner } from "@chakra-ui/react";
import { AtomSpinner } from "react-epic-spinners";

const Loader = () => {
  return (
    <Flex alignItems="center" justifyContent="center" h="50vh">
      {/* <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      /> */}
      <AtomSpinner size={120} color="#ba9ffb" animationDelay={5} />
    </Flex>
  );
};

export default Loader;
