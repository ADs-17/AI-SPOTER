import {
  Textarea,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Heading,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";
import emailjs from "@emailjs/browser";
import { React, useRef, useState } from "react";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Message from "../components/Message";

const SubmitoolScreen = () => {
  const form = useRef();
  const toast = useToast();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .sendForm(
        "service_9g0lr7f",
        "template_fi8kw9d",
        form.current,
        "j3-485pKvHnZxchBY"
      )
      .then(
        (result) => {
          navigate("/");
          toast({
            title: "Tool Submitted",
            description: "The tool has been submitted and is under approval.",
            status: "success",
            duration: 2000,
          });
        },
        (error) => {
          setIsLoading(false);
          console.log(error.text);
        }
      );
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="center" py="5">
      {!userInfo ? (
        <Message>Login to Submit your AI Tool</Message>
      ) : (
        <FormContainer width="xl">
          <form ref={form} onSubmit={sendEmail}>
            <Heading
              as="h4"
              fontWeight="semibold"
              fontFamily="monospace"
              letterSpacing="widest"
              textAlign="center"
            >
              SUBMIT AI TOOL
            </Heading>
            <Spacer h="10" />

            {/* NAME */}
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                focusBorderColor="#ba9ffb"
                type="text"
                name="from_name"
                placeholder="Enter name"
              />
            </FormControl>
            <Spacer h="6" />

            {/* Email  */}
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                focusBorderColor="#ba9ffb"
                type="email"
                name="to_email"
                placeholder="Enter email address"
              />
            </FormControl>
            <Spacer h="6" />

            {/* TOOL NAME */}
            <FormControl id="toolName" isRequired>
              <FormLabel>Tool Name</FormLabel>
              <Input
                focusBorderColor="#ba9ffb"
                type="text"
                name="tool_name"
                placeholder="Enter Tool Name"
              />
            </FormControl>
            <Spacer h="6" />

            {/* TOOL URL */}
            <FormControl id="toolUrl" isRequired>
              <FormLabel>Tool URL</FormLabel>
              <Input
                focusBorderColor="#ba9ffb"
                type="text"
                name="tool_url"
                placeholder="AI Tool Url"
              />
            </FormControl>
            <Spacer h="6" />

            {/* TOOL CATEGORY */}
            <FormControl id="category" isRequired>
              <FormLabel>Tool Category</FormLabel>
              <Input
                focusBorderColor="#ba9ffb"
                type="text"
                name="tool_category"
                placeholder="Enter Tool category"
              />
            </FormControl>
            <Spacer h="6" />

            {/* TOOL DESCRIPTION */}
            <FormControl id="description" isRequired>
              <FormLabel>Tool Description</FormLabel>
              <Textarea
                focusBorderColor="#ba9ffb"
                type="text"
                name="tool_description"
                placeholder="Enter Tool Description"
              />
            </FormControl>
            <Spacer h="6" />

            <Button
              isLoading={isLoading}
              loadingText="Submitting"
              type="submit"
              color="black"
              bgColor="#ba9ffb"
              _hover={{ bgColor: "#9171f8" }}
              mx="auto"
              display="block"
              w="full"
            >
              SUBMIT TOOL
            </Button>
          </form>
        </FormContainer>
      )}
    </Flex>
  );
};

export default SubmitoolScreen;
