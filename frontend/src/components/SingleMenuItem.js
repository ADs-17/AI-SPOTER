import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const SingleMenuItem = ({ url, icon, label }) => {
  return (
    <Link
      as={RouterLink}
      to={url}
      fontSize="md"
      letterSpacing="wide"
      mr="5"
      display="flex"
      alignItems="center"
      color="whiteAlpha.900"
      fontWeight="500"
      _hover={{ textDecor: "none", color: "#ba9ffb" }}
    >
      {icon}
      {label}
    </Link>
  );
};

export default SingleMenuItem;
