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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoAdd, IoPencilSharp, IoTrashBinSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { createTool, deleteTool, listTools } from "../actions/toolActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { TOOL_CREATE_RESET } from "../constants/toolConstants";
import SearchBar from "../components/SearchBar";

const ToolListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const toolList = useSelector((state) => state.toolList);
  const { loading, error, tools } = toolList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const toolDelete = useSelector((state) => state.toolDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = toolDelete;

  const toolCreate = useSelector((state) => state.toolCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    tool: createdTool,
  } = toolCreate;

  useEffect(() => {
    dispatch({ type: TOOL_CREATE_RESET });

    if (!userInfo.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/tool/${createdTool._id}/edit`);
    } else {
      dispatch(listTools());
    }
  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdTool]);

  const filteredTools = tools.filter((tool) =>
    searchTerm
      ? tool.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteTool(id));
    }
  };

  const createToolHandler = () => {
    dispatch(createTool());
  };

  return (
    <>
      <Flex m="10" alignItems="center" justifyContent="space-between">
        <Heading as="h1" fontSize="3xl">
          AI Tools
        </Heading>

        <SearchBar onSearch={setSearchTerm} />

        <Button onClick={createToolHandler} colorScheme="teal">
          <Icon as={IoAdd} mr="2" fontSize="xl" fontWeight="bold" /> Create AI
          Tool
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
                <Th>ID</Th>
                <Th>NAME</Th>
                <Th>PRICE</Th>
                <Th>CHARGES</Th>
                <Th>CATEGORY</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredTools.map((tool) => (
                <Tr key={tool._id}>
                  <Td>{tool._id}</Td>
                  <Td>{tool.name}</Td>
                  <Td>{tool.plan}</Td>
                  <Td>{tool.charges}</Td>
                  <Td>{tool.category}</Td>
                  <Td>
                    <Flex justifyContent="flex-end" alignItems="center">
                      <Button
                        mr="4"
                        as={RouterLink}
                        to={`/admin/tool/${tool._id}/edit`}
                        colorScheme="teal"
                      >
                        <Icon as={IoPencilSharp} color="white" size="sm" />
                      </Button>
                      <Button
                        mr="4"
                        colorScheme="red"
                        onClick={() => deleteHandler(tool._id)}
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

export default ToolListScreen;
