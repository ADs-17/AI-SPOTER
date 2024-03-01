import {
  Link,
  VStack,
  IconButton,
  InputRightElement,
  Input,
  Button,
  InputGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Container,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { FcFilledFilter, FcClearFilters } from "react-icons/fc";
import { IoChevronDown } from "react-icons/io5";
import { Search2Icon } from "@chakra-ui/icons";
import { listTools } from "../actions/toolActions";
import ShareIcons from "./ShareIcons";

const Sidebar = ({
  onSelectCategory,
  onSelectPricing,
  onSelectSort,
  onSearch,
}) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSort, setSelectedSort] = useState("default");
  const [selectedPricing, setSelectedPricing] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const toolList = useSelector((state) => state.toolList);
  const { loading, error, tools } = toolList;

  useEffect(() => {
    dispatch(listTools());
  }, [dispatch]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <Container>
      {/* Sidebar */}
      <VStack
        align="start"
        spacing="4"
        bgColor="#1a1625"
        p="6"
        borderRadius="lg"
        position="sticky"
        top="15%"
        color="whiteAlpha.900"
      >
        {/* Categories */}
        <Menu>
          <Flex justifyContent="space-between" w="full">
            Category
            {/* Reset Button */}
            <Button
              variant="ghost"
              color="#ba9ffb"
              _hover={{ bgColor: "rgba(144, 205, 244, 0.12)" }}
              size="sm"
              mb="1"
              onClick={() => {
                onSelectCategory(null);
                setSelectedCategory(null);
                onSelectSort("default");
                setSelectedSort("default");
                onSelectPricing("all");
                setSelectedPricing("all");
              }}
            >
              <Icon as={FcClearFilters} boxSize={5} mr="2" />
              Reset
            </Button>
          </Flex>
          <MenuButton
            borderRadius="xl"
            as={Button}
            w="full"
            bgColor="#251f35"
            color="whiteAlpha.600"
            size="md"
            textAlign="left"
            rightIcon={<IoChevronDown />}
            _hover={{
              textDecor: "none",
              bgColor: "#251f35",
            }}
            _expanded={{ bgColor: "#251f35" }}
          >
            {selectedCategory
              ? selectedCategory.toUpperCase()
              : "Choose category"}
          </MenuButton>
          <MenuList
            bgColor="#1a1625"
            border="none"
            boxShadow="rgba(147, 112, 219, 0.3) 0px 0px 0px 2px;"
            color="whiteAlpha.800"
            maxHeight="300px"
            overflowY="auto"
          >
            <MenuItem
              fontSize="sm"
              px="5"
              py="2"
              bgColor={selectedCategory === null ? "#2f0743" : "transparent"}
              _hover={{ bgColor: "#2f0743" }}
              onClick={() => {
                onSelectCategory(null);
                setSelectedCategory(null);
              }}
            >
              ALL
            </MenuItem>
            {Array.from(new Set(tools.map((tool) => tool.category))).map(
              (category) => (
                <MenuItem
                  fontSize="sm"
                  px="5"
                  py="2"
                  bgColor={
                    selectedCategory === category ? "#2f0743" : "transparent"
                  }
                  _hover={{ bgColor: "#2f0743" }}
                  onClick={() => {
                    onSelectCategory(category);
                    setSelectedCategory(category);
                  }}
                >
                  {category.toUpperCase()}
                </MenuItem>
              )
            )}
          </MenuList>
        </Menu>

        {/* Sort */}
        <Menu>
          Sort
          <MenuButton
            borderRadius="xl"
            as={Button}
            w="full"
            bgColor="#251f35"
            color="whiteAlpha.600"
            size="md"
            textAlign="left"
            rightIcon={<IoChevronDown />}
            _hover={{
              textDecor: "none",
              bgColor: "#251f35",
            }}
            _expanded={{ bgColor: "#251f35" }}
          >
            {selectedSort === "default"
              ? "Default"
              : selectedSort === "nameAZ"
              ? "By Name A-Z"
              : selectedSort === "date"
              ? "By Date"
              : "Most Favorite"}
          </MenuButton>
          <MenuList
            bgColor="#1a1625"
            border="none"
            boxShadow="rgba(147, 112, 219, 0.3) 0px 0px 0px 2px;"
            color="whiteAlpha.800"
          >
            <MenuItem
              as={RouterLink}
              bgColor="#1a1625"
              onClick={() => {
                onSelectSort("default");
                setSelectedSort("default");
              }}
            >
              Default
            </MenuItem>
            <MenuItem
              as={RouterLink}
              bgColor="#1a1625"
              onClick={() => {
                onSelectSort("nameAZ");
                setSelectedSort("nameAZ");
              }}
            >
              By Name A-Z
            </MenuItem>
            <MenuItem
              as={RouterLink}
              bgColor="#1a1625"
              onClick={() => {
                onSelectSort("date");
                setSelectedSort("date");
              }}
            >
              By Date
            </MenuItem>
            <MenuItem
              as={RouterLink}
              bgColor="#1a1625"
              onClick={() => {
                onSelectSort("favorite");
                setSelectedSort("favorite");
              }}
            >
              Most Favorite
            </MenuItem>
          </MenuList>
        </Menu>

        {/* SearchBar */}
        <VStack align="start">
          <Text>Search AI Tools</Text>
          <InputGroup mt="10px" size="lg" borderColor="#24243e">
            <Input
              value={searchTerm}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              size="md"
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
                size="md"
                mb="2"
                aria-label="Search database"
                icon={<Search2Icon />}
                color="white"
                bgColor="transparent"
                _hover={{ bgColor: "transparent" }}
              />
            </InputRightElement>
          </InputGroup>
        </VStack>

        {/* Pricing */}
        <Menu>
          Pricing
          <MenuButton
            borderRadius="xl"
            as={Button}
            w="full"
            bgColor="#251f35"
            color="whiteAlpha.600"
            size="md"
            textAlign="left"
            rightIcon={<IoChevronDown />}
            _hover={{
              textDecor: "none",
              bgColor: "#251f35",
            }}
            _expanded={{ bgColor: "#251f35" }}
          >
            {selectedPricing === "all"
              ? "All"
              : selectedPricing === "free"
              ? "Free"
              : selectedPricing === "paid"
              ? "Paid"
              : "Freemium"}
          </MenuButton>
          <MenuList
            bgColor="#1a1625"
            border="none"
            boxShadow="rgba(147, 112, 219, 0.3) 0px 0px 0px 2px;"
            color="whiteAlpha.800"
          >
            <MenuItem
              as={RouterLink}
              bgColor="#1a1625"
              onClick={() => {
                onSelectPricing("all");
                setSelectedPricing("all");
              }}
            >
              All
            </MenuItem>
            <MenuItem
              as={RouterLink}
              bgColor="#1a1625"
              onClick={() => {
                onSelectPricing("free");
                setSelectedPricing("free");
              }}
            >
              Free
            </MenuItem>
            <MenuItem
              as={RouterLink}
              bgColor="#1a1625"
              onClick={() => {
                onSelectPricing("paid");
                setSelectedPricing("paid");
              }}
            >
              Paid
            </MenuItem>
            <MenuItem
              as={RouterLink}
              bgColor="#1a1625"
              onClick={() => {
                onSelectPricing("freemium");
                setSelectedPricing("freemium");
              }}
            >
              Freemium
            </MenuItem>
          </MenuList>
        </Menu>
      </VStack>
    </Container>
  );
};

export default Sidebar;
