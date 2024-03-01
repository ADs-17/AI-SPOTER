import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Link, Box, Button, Flex } from "@chakra-ui/react";
import { listTools } from "../actions/toolActions";
import SearchBar from "../components/SearchBar";
import ToolCard from "../components/ToolCard";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";
import Newsletter from "../components/Newsletter";
import Pagination from "../components/Pagination";
import Branding from "../components/Branding";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPricing, setSelectedPricing] = useState("all");
  const [selectedSort, setSelectedSort] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 24; // Change the no of tools you wants to show per page

  const toolList = useSelector((state) => state.toolList);
  const { loading, error, tools } = toolList;

  useEffect(() => {
    dispatch(listTools());
  }, [dispatch]);

  const filteredTools = tools
    .filter((tool) =>
      selectedCategory ? tool.category === selectedCategory : true
    )
    .filter((tool) =>
      selectedPricing === "all"
        ? true
        : selectedPricing === "free"
        ? tool.plan === "Free"
        : selectedPricing === "paid"
        ? tool.plan === "Paid"
        : tool.plan === "Freemium"
    )

    .filter((tool) =>
      searchTerm
        ? tool.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    )
    .sort((a, b) => {
      if (selectedSort === "nameAZ") {
        return a.name.localeCompare(b.name);
      } else if (selectedSort === "date") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (selectedSort === "favorite") {
        // ...
      } else {
        return a.id - b.id;
      }
    });

  // Pagination logic
  const indexOfLastTool = currentPage * itemsPerPage;
  const indexOfFirstTool = indexOfLastTool - itemsPerPage;
  const currentTools = filteredTools.slice(indexOfFirstTool, indexOfLastTool);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Flex direction="column" justifyContent="center">
        <Branding />
        <SearchBar
          onSelectCategory={setSelectedCategory}
          onSearch={setSearchTerm}
          width="3xl"
        />
      </Flex>

      <Grid templateColumns="1fr 3fr" gap="8">
        {/* Sidebar */}
        <Sidebar
          onSelectCategory={setSelectedCategory}
          onSelectPricing={setSelectedPricing}
          onSelectSort={setSelectedSort}
          onSearch={setSearchTerm}
        />
        {/* Tool Cards */}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message type="error">{error}</Message>
        ) : (
          <Grid templateColumns="1fr 1fr 1fr" gap="8">
            {currentTools.map((tool) => (
              <ToolCard key={tool._id} tool={tool} />
            ))}
          </Grid>
        )}
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={filteredTools.length}
          itemsPerPage={itemsPerPage}
          paginate={paginate}
        />
      </Grid>
      {/* Newsletter */}
      <Newsletter />
    </>
  );
};

export default HomeScreen;
