/* global ml */
import { Box, Container, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";

const Newsletter = () => {
  useEffect(() => {
    // MailerLite Universal Script
    (function (w, d, e, u, f, l, n) {
      w[f] =
        w[f] ||
        function () {
          (w[f].q = w[f].q || []).push(arguments);
        };
      l = d.createElement(e);
      l.async = 1;
      l.src = u;
      n = d.getElementsByTagName(e)[0];
      n.parentNode.insertBefore(l, n);
    })(
      window,
      document,
      "script",
      "https://assets.mailerlite.com/js/universal.js",
      "ml"
    );

    // Set your MailerLite account ID
    ml("account", "697286");
  }, []);

  return (
    <Container
      w="full"
      mt="20"
      p="0"
      borderRadius="xl"
      boxShadow="0 0 3px rgba(149, 157, 165, 0.8), 0 0 6px rgba(149, 157, 165, 0.5), 0 0 9px rgba(149, 157, 165, 0.3), 0 0 12px rgba(149, 157, 165, 0.2), 0 0 15px rgba(149, 157, 165, 0.1);"
    >
      <div className="ml-embedded" data-form="CY4xtb"></div>
    </Container>
  );
};

export default Newsletter;
