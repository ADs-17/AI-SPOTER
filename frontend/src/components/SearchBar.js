import {
  Flex,
  Input,
  IconButton,
  Icon,
  Text,
  Image,
  InputGroup,
  InputRightElement,
  Button,
  Link,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { listTools } from "../actions/toolActions";
import Branding from "./Branding";

const SearchBar = ({ onSearch, width = "lg" }) => {
  const dispatch = useDispatch();

  const toolList = useSelector((state) => state.toolList);
  const { loading, error, tools } = toolList;

  useEffect(() => {
    dispatch(listTools());
  }, [dispatch]);

  const uniqueCategories = [...new Set(tools.map((tool) => tool.category))];
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleScroll = (direction) => {
    const scrollWidth = 150; // Adjust this value based on the desired scroll amount
    const newPosition =
      direction === "left"
        ? scrollPosition - scrollWidth
        : scrollPosition + scrollWidth;

    // Ensure newPosition is within bounds
    const newPositionClamped = Math.min(
      Math.max(newPosition, 0),
      (uniqueCategories.length - 1) * scrollWidth
    );

    setScrollPosition(newPositionClamped);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <Flex justifyContent="center" alignContent="center" my="5">
      {/* SearchBar */}
      <InputGroup mt="10px" size="lg" borderColor="#24243e" width={width}>
        <Input
          value={searchTerm}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          variant="filled"
          bgColor="#251f35"
          focusBorderColor="#ba9ffb"
          borderRadius="lg"
          placeholder="Search"
          _hover={{
            borderColor: "whiteAlpha.900",
          }}
        />
        <InputRightElement>
          <IconButton
            size="xl"
            aria-label="Search database"
            icon={<Search2Icon />}
            color="white"
            bgColor="transparent"
            _hover={{ bgColor: "transparent" }}
          />
        </InputRightElement>
      </InputGroup>

      {/* Category */}
      {/* <IconButton
        boxSize={6}
        margin="25px auto"
        as={BsArrowLeft}
        color="white"
        bgColor="transparent"
        _hover={{ bgColor: "rgba(144, 205, 244, 0.12)" }}
        onClick={() => handleScroll("left")}
      />
      <div style={{ overflow: "hidden", width: "80%" }}>
        <Flex
          bgColor="transparent"
          w="full"
          gap="30px"
          flexWrap="nowrap"
          margin="20px auto"
          textOverflow="ellipsis"
          transition="transform 0.3s ease"
          style={{ transform: `translateX(-${scrollPosition}px)` }}
        >
          <Link
            fontSize="xs"
            border="0.5px solid rgba(144, 205, 244, 0.4)"
            borderRadius="full"
            px="5"
            py="2"
            bgColor={selectedCategory === null ? "#2f0743" : "transparent"}
            color={selectedCategory === null ? "white" : "whiteAlpha.800"}
            _hover={{ bgColor: "#2f0743" }}
            onClick={() => {
              onSelectCategory(null);
              setSelectedCategory(null);
            }}
          >
            ALL
          </Link>
          {uniqueCategories.map((category) => (
            <Link
              fontSize="xs"
              border="0.5px solid rgba(144, 205, 244, 0.4)"
              borderRadius="full"
              px="5"
              py="2"
              bgColor={
                selectedCategory === category ? "#2f0743" : "transparent"
              }
              color={selectedCategory === category ? "white" : "whiteAlpha.800"}
              _hover={{ bgColor: "#2f0743" }}
              key={category}
              onClick={() => {
                onSelectCategory(category);
                setSelectedCategory(category);
              }}
            >
              {category.toUpperCase()}
            </Link>
          ))}
        </Flex>
      </div>
      <IconButton
        boxSize={6}
        margin="25px auto"
        as={BsArrowRight}
        color="white"
        bgColor="transparent"
        _hover={{ bgColor: "rgba(144, 205, 244, 0.12)" }}
        onClick={() => handleScroll("right")}
      /> */}
    </Flex>
  );
};

export default SearchBar;
