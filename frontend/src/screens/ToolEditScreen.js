import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Spacer,
} from "@chakra-ui/react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { listToolDetails, updateTool } from "../actions/toolActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { TOOL_UPDATE_RESET } from "../constants/toolConstants";

const ToolEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id: toolId } = useParams();

  const [name, setName] = useState("");
  const [charges, setCharges] = useState("");
  const [image, setImage] = useState("");
  const [plan, setPlan] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [application, setApplication] = useState("");
  const [toolUrl, setToolUrl] = useState("");
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

  const toolDetails = useSelector((state) => state.toolDetails);
  const { loading, error, tool } = toolDetails;

  const toolUpdate = useSelector((state) => state.toolUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = toolUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: TOOL_UPDATE_RESET });
      navigate(`/admin/toolList`);
    } else {
      if (!tool.name || tool._id !== toolId) {
        dispatch(listToolDetails(toolId));
      } else {
        setName(tool.name);
        setCharges(tool.charges);
        setImage(tool.image);
        setPlan(tool.plan);
        setCategory(tool.category);
        setDescription(tool.description);
        setApplication(tool.application);
        setToolUrl(tool.toolUrl);
      }
    }
  }, [dispatch, navigate, toolId, tool, successUpdate]);

  const handleQuillChange = (value) => {
    setDescription(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateTool({
        _id: toolId,
        name,
        charges,
        image,
        plan,
        category,
        description,
        application,
        toolUrl,
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
      <Link as={RouterLink} to="/admin/toollist">
        Go Back
      </Link>

      <Flex w="full" alignItems="center" justifyContent="center" py="5">
        <FormContainer width="2xl">
          <Heading as="h1" mb="8" fontSize="3xl">
            Edit AI Tool
          </Heading>

          {loadingUpdate && <Loader />}
          {errorUpdate && <Message type="error">{errorUpdate}</Message>}

          {loading ? (
            <Loader />
          ) : error ? (
            <Message type="error">{error}</Message>
          ) : (
            <form onSubmit={submitHandler}>
              {/* NAME */}
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <Spacer h="3" />

              {/* IMAGE */}
              <FormControl id="image">
                <FormLabel>Tool Image</FormLabel>
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

              {/* PLAN */}
              <FormControl id="plan" isRequired>
                <FormLabel>Plan</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter brand"
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                />
              </FormControl>
              <Spacer h="3" />

              {/* CHARGES */}
              <FormControl id="charges">
                <FormLabel>Charges</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter price"
                  value={charges}
                  onChange={(e) => setCharges(e.target.value)}
                />
              </FormControl>
              <Spacer h="3" />

              {/* CATEGORY */}
              <FormControl id="category" isRequired>
                <FormLabel>Category</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </FormControl>
              <Spacer h="3" />

              {/* APPLICATION*/}
              <FormControl id="application" isRequired>
                <FormLabel>Application</FormLabel>
                <Input
                  type="text"
                  placeholder="AI Tool Application"
                  value={application}
                  onChange={(e) => setApplication(e.target.value)}
                />
              </FormControl>
              <Spacer h="3" />

              {/* TOOL URL */}
              <FormControl id="toolUrl" isRequired>
                <FormLabel>toolUrl</FormLabel>
                <Input
                  type="text"
                  placeholder="AI Tool Url"
                  value={toolUrl}
                  onChange={(e) => setToolUrl(e.target.value)}
                />
              </FormControl>

              {/* DESCRIPTION */}
              <FormControl id="description" isRequired>
                <FormLabel>Description</FormLabel>
                <ReactQuill
                  style={{ background: "#ffffff", color: "black" }}
                  value={description}
                  modules={modules}
                  onChange={handleQuillChange}
                  placeholder="Enter description"
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

export default ToolEditScreen;
