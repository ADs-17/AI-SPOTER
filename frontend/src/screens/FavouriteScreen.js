import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Link,
  Select,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { IoTrashBinSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  Link as RouterLink,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import {
  addToFavourite,
  removeFromFavourite,
} from "../actions/favouriteActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Ratings";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";

const FavouriteScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const [searchParams] = useSearchParams();
  let qty = searchParams.get("qty");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const favourite = useSelector((state) => state.favourite);
  const { loading, error, favouriteTools } = favourite;

  useEffect(() => {
    if (id) {
      dispatch(addToFavourite(id, +qty));
    }
  }, [dispatch, id, qty]);

  const removeFromFavouriteHandler = (id) => {
    dispatch(removeFromFavourite(id));
  };

  return (
    <Box>
      <Box margin="2rem 5rem">
        <Heading mb="8" fontWeight="semibold">
          Favorites
        </Heading>
        <Flex justifyContent="center">
          {!userInfo ? (
            <Message>Login to see your Favourite AI Tools</Message>
          ) : favouriteTools.length === 0 ? (
            <Message>No AI Tools in Favorites</Message>
          ) : (
            <Flex direction="column" width="full">
              {favouriteTools.map((item) => (
                <Grid
                  key={item.tool}
                  size="100%"
                  alignItems="center"
                  justifyContent="space-around"
                  py="4"
                  px="2"
                  rounded="lg"
                  gap={20}
                  _hover={{ bgColor: "#1a1625" }}
                  templateColumns="2fr 3fr  1fr"
                >
                  {/* Tool Image */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    borderRadius="lg"
                    height="40"
                    width="full"
                    objectFit="cover"
                  />

                  <Flex direction="column">
                    <Flex direction="row" gap={8}>
                      <Heading
                        as="h2"
                        fontWeight="semibold"
                        fontSize="2xl"
                        mb="4"
                      >
                        <Link
                          as={RouterLink}
                          to={`/tool/${item.tool}`}
                          _hover={{ textDecor: "none" }}
                        >
                          {item.name}
                        </Link>
                      </Heading>
                      <Link href={item.toolUrl} target="_blank">
                        <Button
                          variant="solid"
                          color="black"
                          bgColor="#ba9ffb"
                          _hover={{ bgColor: "#9171f8" }}
                          size="sm"
                        >
                          Visit
                          <Icon
                            as={HiArrowTopRightOnSquare}
                            boxSize={4}
                            ml="2"
                          />
                        </Button>
                      </Link>
                    </Flex>

                    <Rating
                      value={item.rating}
                      color="yellow.500"
                      text={`${item.numReviews} reviews`}
                    />

                    <Heading
                      as="h5"
                      fontSize="2xl"
                      fontWeight="bold"
                      color="teal.500"
                      my="5"
                      mb="4"
                    >
                      {item.charges > 1 ? item.charges : item.plan}
                    </Heading>
                  </Flex>

                  {/* Delete Button */}
                  <Button
                    type="button"
                    colorScheme="red"
                    width="10"
                    onClick={() => removeFromFavouriteHandler(item.tool)}
                  >
                    <Icon as={IoTrashBinSharp} />
                  </Button>
                </Grid>
              ))}
            </Flex>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default FavouriteScreen;
