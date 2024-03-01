import {
  Box,
  Flex,
  Link,
  Button,
  Stack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { googleLogin } from "../actions/userActions";
import SingleMenuItem from "./SingleMenuItem";
import { logout } from "../actions/userActions";
import { BiHeart } from "react-icons/bi";
import { SiAtom } from "react-icons/si";
import { GiNotebook } from "react-icons/gi";
import { RiAdminFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  let redirect = searchParams.get("redirect") || "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate(redirect);
  //   }
  // }, [navigate, userInfo, redirect]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Flex
      bgColor="#0f031b"
      as="header"
      justifyContent="space-between"
      alignItems="center"
      wrap="wrap"
      py="4"
      px="10"
      w="100%"
      pos="fixed"
      zIndex="9999"
      top="0"
      left="0"
      borderBottom="1px solid #24243e"
    >
      {/* Logo */}
      <Link
        as={RouterLink}
        to="/"
        color="whiteAlpha.800"
        fontWeight="bold"
        size="lg"
        letterSpacing="wide"
        _hover={{ textDecor: "none", color: "white" }}
        px="20px"
        onClick={() => {
          window.scrollTo({ top: "0", behavior: "smooth" });
        }}
      >
        <Image
          objectFit="cover"
          h="60px"
          w="220px"
          src="../assets/logo.png"
          alt="logo"
        />
      </Link>

      {/* Links */}
      <Box
        display="flex"
        width={{ base: "full", md: "550px" }}
        justifyContent="space-evenly"
      >
        <SingleMenuItem
          label="FAVORITES"
          url="/favourite"
          icon={<Icon as={BiHeart} mr="2" boxSize={5} />}
        />
        <SingleMenuItem
          label="BLOG"
          url="/blogs"
          icon={<Icon as={GiNotebook} mr="2" boxSize={5} />}
        />
        <SingleMenuItem
          label="SUBMIT TOOL"
          url="/submitaitool"
          icon={<Icon as={SiAtom} mr="2" boxSize={5} />}
        />
      </Box>

      <Stack direction="row">
        {/* Login */}
        {userInfo ? (
          <Menu>
            <MenuButton
              border="0.3px solid #ba9ffb"
              boxShadow="0 0 2px rgba(149, 157, 165, 0.8), 0 0 4px rgba(149, 157, 165, 0.5), 0 0 6px rgba(149, 157, 165, 0.3), 0 0 8px rgba(149, 157, 165, 0.2), 0 0 10px rgba(149, 157, 165, 0.1);"
              borderRadius="3xl"
              as={Button}
              bgColor="transparent"
              color="whiteAlpha.900"
              size="sm"
              py="5"
              leftIcon={<Avatar src={userInfo.photoURL} size="xs" />}
              rightIcon={<IoChevronDown />}
              _hover={{
                textDecor: "none",
                opacity: "0.9",
                bgColor: "transparent",
              }}
              _expanded={{ bgColor: "transparent" }}
            >
              {userInfo.name}
            </MenuButton>
            <MenuList
              bgColor="#1a1625"
              border="none"
              boxShadow="rgba(147, 112, 219, 0.3) 0px 0px 0px 2px;"
              color="whiteAlpha.900"
            >
              <MenuItem onClick={logoutHandler} bgColor="#1a1625">
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button
            onClick={() => dispatch(googleLogin())}
            color="white"
            bgColor="transparent"
            fontSize="md"
            _hover={{ bgColor: "transparent", color: "#ba9ffb" }}
          >
            <Icon as={FcGoogle} mr="2" boxSize={6} />
            LOGIN
          </Button>
        )}

        {/* Admin Menu */}
        {userInfo && userInfo.isAdmin && (
          <Menu>
            <MenuButton
              as={Button}
              bgColor="transparent"
              color="whiteAlpha.900"
              leftIcon={<RiAdminFill size="22" />}
              rightIcon={<IoChevronDown />}
              _hover={{
                textDecor: "none",
                opacity: "0.8",
                bgColor: "transparent",
              }}
              _expanded={{ bgColor: "transparent" }}
            >
              Manage
            </MenuButton>
            <MenuList
              bgColor="#1a1625"
              border="none"
              boxShadow="rgba(147, 112, 219, 0.3) 0px 0px 0px 2px;"
              color="whiteAlpha.900"
            >
              <MenuItem as={RouterLink} to="/admin/userlist" bgColor="#1a1625">
                All Users
              </MenuItem>
              <MenuItem as={RouterLink} to="/admin/toollist" bgColor="#1a1625">
                All AI Tools
              </MenuItem>
              <MenuItem as={RouterLink} to="/admin/bloglist" bgColor="#1a1625">
                All Blogs
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Stack>
    </Flex>
  );
};

export default Header;
