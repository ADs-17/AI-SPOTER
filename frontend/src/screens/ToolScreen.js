import React from "react";
import {
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Image,
  Text,
  Link,
  Icon,
  Stack,
  useToast,
  Badge,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import { googleLogin } from "../actions/userActions";
import { createToolReview, listToolDetails } from "../actions/toolActions";
import { addToFavourite } from "../actions/favouriteActions";
import { TOOL_REVIEW_CREATE_RESET } from "../constants/toolConstants";
import { BsBookmarkHeart } from "react-icons/bs";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import ShareIcons from "../components/ShareIcons";
import Rating from "../components/Ratings";

const ToolScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { id } = useParams();

  const [rating, setRating] = useState();
  const [comment, setComment] = useState("");

  const toolDetails = useSelector((state) => state.toolDetails);
  const { loading, error, tool } = toolDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const toolReviewCreate = useSelector((state) => state.toolReviewCreate);
  const { success: successReviewCreate, error: errorReviewCreate } =
    toolReviewCreate;

  useEffect(() => {
    if (successReviewCreate) {
      alert("Review submitted");
      setRating(0);
      setComment("");
      dispatch({ type: TOOL_REVIEW_CREATE_RESET });
    }
    dispatch(listToolDetails(id));
  }, [id, dispatch, successReviewCreate]);

  const addToFavouriteHandler = () => {
    if (userInfo) {
      dispatch(addToFavourite(id));

      toast({
        title: `${tool.name} has been added to your favorites.`,
        status: "success",
        duration: 2000,
      });
    } else {
      dispatch(googleLogin());
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createToolReview(id, { rating, comment }));
  };

  return (
    <>
      <Flex mb="5" mt="5" px="10">
        <Button
          as={RouterLink}
          to="/"
          variant="solid"
          bg="#ba9ffb"
          _hover={{ bgColor: "#9171f8" }}
        >
          Go Back
        </Button>
      </Flex>

      <Grid templateColumns="3fr 5fr 1fr" gap="10" px="10" my="5">
        {/* Column 1 */}
        <Image src={tool.image} alt={tool.name} borderRadius="md" />

        {/* Column 2 */}
        <Flex direction="column">
          <Flex direction="row" gap={8}>
            <Heading as="h2" fontSize="4xl" mb="3">
              {tool.name}
            </Heading>
            <Link href={tool.toolUrl} target="_blank">
              <Button
                variant="solid"
                color="black"
                bgColor="#ba9ffb"
                size="sm"
                _hover={{ bgColor: "#9171f8" }}
              >
                Visit
                <Icon as={HiArrowTopRightOnSquare} boxSize={5} ml="2" />
              </Button>
            </Link>
            <Button
              onClick={addToFavouriteHandler}
              bg="gray.800"
              size="sm"
              textTransform="uppercase"
              letterSpacing="wide"
              variant="ghost"
              color="whiteAlpha.800"
              _hover={{ bgColor: "#2f0743" }}
            >
              Add to Favourite
            </Button>
          </Flex>
          <Rating
            value={tool.rating}
            color="yellow.500"
            text={`${tool.numReviews} reviews`}
          />

          <Stack
            direction="row"
            gap={5}
            my="3"
            color="teal"
            fontWeight="bold"
            fontSize="4xl"
          >
            <Heading as="h6">{tool.plan}</Heading>
            <Heading as="h6">{tool.charges}</Heading>
          </Stack>
          <Box mb="4">
            <Badge variant="outline" colorScheme="cyan" fontSize="md">
              {tool.category}
            </Badge>
          </Box>
        </Flex>

        {/* Column 3 */}
        <Flex direction="row" gap={8}>
          <IconButton
            size="xs"
            color="white"
            bgColor="transparent"
            _hover={{ bgColor: "rgba(144, 205, 244, 0.12)" }}
            as={BsBookmarkHeart}
          />

          <ShareIcons />
        </Flex>
      </Grid>

      <Flex justifyContent="center" my="5">
        <Text
          w="70%"
          textAlign="justify"
          dangerouslySetInnerHTML={{ __html: tool.description }}
        ></Text>
      </Flex>
    </>
  );
};

export default ToolScreen;
