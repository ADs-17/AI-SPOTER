import React from "react";
import {
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Image,
  Spacer,
  Text,
  Link,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import { createBlogReview, listBlogDetails } from "../actions/blogActions";
import { BLOG_REVIEW_CREATE_RESET } from "../constants/blogConstants";

const BlogScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const [rating, setRating] = useState();
  const [comment, setComment] = useState("");

  const blogDetails = useSelector((state) => state.blogDetails);
  const { loading, error, blog } = blogDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const blogReviewCreate = useSelector((state) => state.blogReviewCreate);
  const { success: successReviewCreate, error: errorReviewCreate } =
    blogReviewCreate;

  useEffect(() => {
    if (successReviewCreate) {
      alert("Review submitted");
      setRating(0);
      setComment("");
      dispatch({ type: BLOG_REVIEW_CREATE_RESET });
    }
    dispatch(listBlogDetails(id));
  }, [id, dispatch, successReviewCreate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createBlogReview(id, { rating, comment }));
  };

  return (
    <>
      <Flex justifyContent="center" alignContent="center" w="full" my="10">
        <Flex w="65%" direction="column" gap={4}>
          <Heading textAlign="center" as="h2" fontSize="4xl" mb="4">
            {blog.title}
          </Heading>
          <Flex justifyContent="center" m="5">
            <Image
              w="600px"
              h="350px"
              objectFit="cover"
              src={blog.image}
              borderRadius="md"
            />
          </Flex>

          <Text
            textAlign="justify"
            fontSize="md"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></Text>
        </Flex>
      </Flex>
    </>
  );
};

export default BlogScreen;
