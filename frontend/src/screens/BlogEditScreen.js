import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Spacer,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { listBlogDetails, updateBlog } from "../actions/blogActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { BLOG_UPDATE_RESET } from "../constants/blogConstants";

const BlogEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id: blogId } = useParams();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  const blogDetails = useSelector((state) => state.blogDetails);
  const { loading, error, blog } = blogDetails;

  const blogUpdate = useSelector((state) => state.blogUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = blogUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BLOG_UPDATE_RESET });
      navigate(`/admin/blogList`);
    } else {
      if (!blog.title || blog._id !== blogId) {
        dispatch(listBlogDetails(blogId));
      } else {
        setTitle(blog.title);
        setImage(blog.image);
        setDescription(blog.description);
        setContent(blog.content || "");
      }
    }
  }, [dispatch, navigate, blogId, blog, successUpdate]);

  const handleQuillChange = (value) => {
    setContent(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateBlog({
        _id: blogId,
        title,
        image,
        description,
        content,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(`/api/uploads`, formData, config);
      setImage(data);
      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  };

  return (
    <>
      <Link as={RouterLink} to="/admin/bloglist">
        Go Back
      </Link>

      <Flex w="full" alignItems="center" justifyContent="center" py="5">
        <FormContainer width="2xl">
          <Heading as="h1" mb="8" fontSize="3xl">
            Edit Blog
          </Heading>

          {loadingUpdate && <Loader />}
          {errorUpdate && <Message type="error">{errorUpdate}</Message>}

          {loading ? (
            <Loader />
          ) : error ? (
            <Message type="error">{error}</Message>
          ) : (
            <form onSubmit={submitHandler}>
              {/* TITLE */}
              <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  placeholder="Blog Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <Spacer h="3" />

              {/* IMAGE */}
              <FormControl id="image">
                <FormLabel>Featured Image</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter image url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                OR
                <Input type="file" onChange={uploadFileHandler} />
              </FormControl>
              <Spacer h="3" />

              {/* DESCRIPTION */}
              <FormControl id="description" isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <Spacer h="3" />

              {/* FORMATTED CONTENT (using Quill) */}
              <FormControl id="formattedContent" isRequired>
                <FormLabel>Content</FormLabel>
                <ReactQuill
                  style={{ background: "#ffffff", color: "black" }}
                  value={content}
                  modules={modules}
                  onChange={handleQuillChange}
                  placeholder="Blog content..."
                />
              </FormControl>
              <Spacer h="3" />

              <Button
                type="submit"
                isLoading={loading}
                colorScheme="teal"
                mt="4"
              >
                Update
              </Button>
            </form>
          )}
        </FormContainer>
      </Flex>
    </>
  );
};

export default BlogEditScreen;
