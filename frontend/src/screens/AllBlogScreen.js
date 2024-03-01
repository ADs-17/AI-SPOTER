import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Flex, Box, Button, Heading } from "@chakra-ui/react";
import { listBlogs } from "../actions/blogActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";

const AllBlogScreen = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const blogList = useSelector((state) => state.blogList);
  const { loading, error, blogs } = blogList;

  useEffect(() => {
    dispatch(listBlogs());
  }, [dispatch]);

  // Pagination logic
  const indexOfLastBlog = currentPage * itemsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Heading m="3" fontWeight="semibold">
        Blogs
      </Heading>
      {/* Tool Cards */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Grid templateColumns="2fr 2fr" gap="6" m="5">
          {currentBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </Grid>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={blogs.length}
        itemsPerPage={itemsPerPage}
        paginate={paginate}
      />
    </>
  );
};

export default AllBlogScreen;
