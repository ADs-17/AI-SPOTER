import React from "react";
import {
  CardBody,
  Card,
  Image,
  Stack,
  Text,
  Heading,
  Divider,
  CardFooter,
  Button,
  ButtonGroup,
  Link,
  Icon,
  useToast,
  Flex,
  Badge,
  Box,
} from "@chakra-ui/react";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { IoPencilSharp } from "react-icons/io5";
import { BsClipboard2Heart } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import Rating from "./Ratings";
import { addToFavourite } from "../actions/favouriteActions";
import { googleLogin } from "../actions/userActions";

const ToolCard = ({ tool }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate;
  const toast = useToast();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addToFavouriteHandler = () => {
    if (userInfo) {
      dispatch(addToFavourite(tool._id));

      toast({
        title: "Added to Favorites",
        description: `${tool.name} has been added to your favorites.`,
        status: "success",
        duration: 2000,
      });
    } else {
      dispatch(googleLogin());
    }
  };
  return (
    <Card
      maxW="sm"
      bgColor="#1a1625"
      overflow="hidden"
      transition="transform 0.3s ease"
      _hover={{
        transform: "scale(1.05)",
      }}
    >
      <Link href={`/tool/${tool._id}`} _hover={{ textDecoration: "none" }}>
        <Image
          objectFit="cover"
          w="full"
          h="180px"
          src={tool.image}
          alt={tool.name}
        />

        <CardBody color="whiteAlpha.900">
          <Stack spacing="3">
            {userInfo && userInfo.isAdmin ? (
              <Button
                size="sm"
                as={RouterLink}
                to={`/admin/tool/${tool._id}/edit`}
                colorScheme="teal"
                position="absolute"
                right="3"
              >
                <Icon as={IoPencilSharp} color="white" size="sm" />
              </Button>
            ) : null}
            <Heading size="md">{tool.name}</Heading>
            <Rating
              value={tool.rating}
              color="yellow.500"
              text={`${tool.numReviews} reviews`}
            />
            <Text
              fontSize="xs"
              textAlign="justify"
              noOfLines={3}
              dangerouslySetInnerHTML={{ __html: tool.description }}
              style={{ hyphens: "auto" }}
            ></Text>
            <Flex justifyContent="space-between">
              <Text color="#ba9ffb" fontSize="lg">
                {tool.charges ? tool.charges : tool.plan}
              </Text>
              <Box>
                <Badge variant="outline" colorScheme="teal" fontSize="xs">
                  {tool.category}
                </Badge>
              </Box>
            </Flex>
          </Stack>
        </CardBody>
      </Link>
      <Divider color="whiteAlpha.200" />
      <CardFooter>
        <Stack direction="row" spacing={14}>
          <Link href={tool.toolUrl} target="_blank">
            <Button
              variant="solid"
              color="black"
              bgColor="#ba9ffb"
              size="sm"
              _hover={{ bgColor: "#9171f8" }}
            >
              Visit
              <Icon as={HiArrowTopRightOnSquare} boxSize={4} ml="2" />
            </Button>
          </Link>

          <Button
            onClick={addToFavouriteHandler}
            variant="ghost"
            color="#ba9ffb"
            size="sm"
            _hover={{ bgColor: "rgba(144, 205, 244, 0.12)" }}
          >
            Favourite
            <Icon as={BsClipboard2Heart} boxSize={4} ml="2" />
          </Button>
        </Stack>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;
