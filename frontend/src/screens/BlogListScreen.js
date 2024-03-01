import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoAdd, IoPencilSharp, IoTrashBinSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { createBlog, deleteBlog, listBlogs } from "../actions/blogActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { BLOG_CREATE_RESET } from "../constants/blogConstants";
import SearchBar from "../components/SearchBar";

const BlogListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const blogList = useSelector((state) => state.blogList);
  const { loading, error, blogs } = blogList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const blogDelete = useSelector((state) => state.blogDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = blogDelete;

  const blogCreate = useSelector((state) => state.blogCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    blog: createdBlog,
  } = blogCreate;

  useEffect(() => {
    dispatch({ type: BLOG_CREATE_RESET });

    if (!userInfo.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/blog/${createdBlog._id}/edit`);
    } else {
      dispatch(listBlogs());
    }
  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdBlog]);

  const filteredBlogs = blogs.filter((blog) =>
    searchTerm
      ? blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteBlog(id));
    }
  };

  const createBlogHandler = () => {
    dispatch(createBlog());
  };

  return (
    <>
      <Flex m="10" alignItems="center" justifyContent="space-between">
        <Heading as="h1" fontSize="3xl">
          AISpotr Blogs
        </Heading>

        <SearchBar onSearch={setSearchTerm} />

        <Button onClick={createBlogHandler} colorScheme="teal">
          <Icon as={IoAdd} mr="2" fontSize="xl" fontWeight="bold" /> Create New
          Blog
        </Button>
      </Flex>

      {loadingDelete && <Loader />}
      {errorDelete && <Message type="error">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message type="error">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Box
          bgColor="transparent"
          rounded="lg"
          shadow="lg"
          px="5"
          py="5"
          border="1px"
          borderColor="whiteAlpha.500"
        >
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>IMAGE</Th>
                <Th>ID</Th>
                <Th>TITLE</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredBlogs.map((blog) => (
                <Tr key={blog._id}>
                  <Td>
                    <Image
                      src={blog.image}
                      borderRadius="lg"
                      height="20"
                      width="full"
                      objectFit="cover"
                    />
                  </Td>
                  <Td>{blog._id}</Td>
                  <Td>{blog.title}</Td>
                  <Td>
                    <Flex justifyContent="flex-end" alignItems="center">
                      <Button
                        mr="4"
                        as={RouterLink}
                        to={`/admin/blog/${blog._id}/edit`}
                        colorScheme="teal"
                      >
                        <Icon as={IoPencilSharp} color="white" size="sm" />
                      </Button>
                      <Button
                        mr="4"
                        colorScheme="red"
                        onClick={() => deleteHandler(blog._id)}
                      >
                        <Icon as={IoTrashBinSharp} color="white" size="sm" />
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </>
  );
};

export default BlogListScreen;
