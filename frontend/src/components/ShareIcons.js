import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  useClipboard,
  Text,
  Icon,
} from "@chakra-ui/react";
import { BiShareAlt } from "react-icons/bi";
import { FaFacebook, FaTwitter, FaLinkedin, FaPinterest } from "react-icons/fa";
import { MdOutlineContentCopy } from "react-icons/md";

const ShareIcons = () => {
  const currentToolPageUrl = window.location.href;
  const { onCopy, hasCopied } = useClipboard(currentToolPageUrl);

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentToolPageUrl
      )}`,
      "_blank"
    );
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        currentToolPageUrl
      )}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
        currentToolPageUrl
      )}`,
      "_blank"
    );
  };

  const shareOnPinterest = () => {
    window.open(
      `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
        currentToolPageUrl
      )}`,
      "_blank"
    );
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        size="xs"
        bgColor="transparent"
        color="whiteAlpha.900"
        aria-label="Share"
        icon={<BiShareAlt size="md" />}
        _hover={{
          opacity: "0.8",
          bgColor: "transparent",
        }}
        _expanded={{ bgColor: "transparent" }}
      />
      <MenuList
        bgColor="#1a1625"
        border="none"
        boxShadow="rgba(147, 112, 219, 0.3) 0px 0px 0px 2px;"
        color="whiteAlpha.900"
      >
        <Flex justifyContent="center" direction="column" gap={4}>
          <Flex justifyContent="space-around">
            <IconButton
              size="xs"
              color="white"
              bgColor="transparent"
              _hover={{ bgColor: "rgba(144, 205, 244, 0.12)" }}
              as={FaFacebook}
              onClick={shareOnFacebook}
            />
            <IconButton
              size="xs"
              color="white"
              bgColor="transparent"
              _hover={{ bgColor: "rgba(144, 205, 244, 0.12)" }}
              as={FaTwitter}
              onClick={shareOnTwitter}
            />
            <IconButton
              size="xs"
              color="white"
              bgColor="transparent"
              _hover={{ bgColor: "rgba(144, 205, 244, 0.12)" }}
              as={FaLinkedin}
              onClick={shareOnLinkedIn}
            />
            <IconButton
              size="xs"
              color="white"
              bgColor="transparent"
              _hover={{ bgColor: "rgba(144, 205, 244, 0.12)" }}
              as={FaPinterest}
              onClick={shareOnPinterest}
            />
          </Flex>
          <IconButton
            size="xs"
            color="white"
            bgColor="transparent"
            _hover={{ bgColor: "transparent" }}
            icon={
              hasCopied ? (
                <Text>✓ COPIED!</Text>
              ) : (
                <Flex>
                  <Icon as={MdOutlineContentCopy} boxSize={4} mr={2} />
                  COPY URL
                </Flex>
              )
            }
            onClick={onCopy}
          />
        </Flex>
      </MenuList>
    </Menu>
  );
};

export default ShareIcons;
