import React from "react";
import {
  CardBody,
  Card,
  Image,
  Stack,
  Text,
  Heading,
  Flex,
  Link,
  Button,
  Icon,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { IoPencilSharp } from "react-icons/io5";
import { Link as RouterLink } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      bgColor="#312A5F30"
      border="0.1px solid #ba9ffb70"
      boxShadow="0 0 1px rgba(149, 157, 165, 0.8), 0 0 3px rgba(149, 157, 165, 0.5), 0 0 5px rgba(149, 157, 165, 0.3), 0 0 7px rgba(149, 157, 165, 0.2), 0 0 9px rgba(149, 157, 165, 0.1);"
      transition="transform 0.3s ease"
      _hover={{
        transform: "scale(1.03)",
      }}
    >
      <Link href={`/blog/${blog._id}`} _hover={{ textDecoration: "none" }}>
        <CardBody color="whiteAlpha.900">
          <Flex gap={6}>
            <Image
              objectFit="cover"
              w="200px"
              h="160px"
              src={blog.image}
              borderRadius="lg"
            />

            <Stack spacing="3" mt="2">
              {userInfo && userInfo.isAdmin ? (
                <Button
                  size="sm"
                  as={RouterLink}
                  to={`/admin/blog/${blog._id}/edit`}
                  colorScheme="teal"
                  position="absolute"
                  right="1"
                  top="1"
                >
                  <Icon as={IoPencilSharp} color="white" size="sm" />
                </Button>
              ) : null}
              <Heading size="md" fontWeight="semibold" noOfLines={2}>
                {blog.title}
              </Heading>
              <Text
                noOfLines={4}
                color="whiteAlpha.700"
                textAlign="justify"
                size="xs"
                maxH="6em"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {blog.description}
              </Text>
            </Stack>
          </Flex>
        </CardBody>
      </Link>
    </Card>
  );
};

export default BlogCard;
