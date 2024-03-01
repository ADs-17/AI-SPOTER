import { Flex, ToastProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ToolScreen from "./screens/ToolScreen";
import Footer from "./components/Footer";
import FavouriteScreen from "./screens/FavouriteScreen";
import ToolListScreen from "./screens/ToolListScreen";
import UserListScreen from "./screens/UserListScreen";
import ToolEditScreen from "./screens/ToolEditScreen";
import UserEditScreen from "./screens/UserEditScreen";
import BlogListScreen from "./screens/BlogListScreen";
import BlogEditScreen from "./screens/BlogEditScreen";
import AllBlogScreen from "./screens/AllBlogScreen";
import BlogScreen from "./screens/BlogScreen";
import SubmitoolScreen from "./screens/SubmitoolScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Flex direction="column" color="white" as="main" mt="72px" py="6" px="6">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/tool/:id" element={<ToolScreen />} />
          <Route path="/favourite" element={<FavouriteScreen />} />
          <Route path="/favourite/:id" element={<FavouriteScreen />} />
          <Route path="/admin/userlist" element={<UserListScreen />} />
          <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
          <Route path="/admin/toollist" element={<ToolListScreen />} />
          <Route path="/admin/tool/:id/edit" element={<ToolEditScreen />} />
          <Route path="/admin/bloglist" element={<BlogListScreen />} />
          <Route path="/admin/blog/:id/edit" element={<BlogEditScreen />} />
          <Route path="/blogs" element={<AllBlogScreen />} />
          <Route path="/blog/:id" element={<BlogScreen />} />
          <Route path="/submitaitool" element={<SubmitoolScreen />} />
        </Routes>
      </Flex>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
