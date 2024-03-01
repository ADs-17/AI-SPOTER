import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

const Pagination = ({ currentPage, totalItems, itemsPerPage, paginate }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePaginationClick = (page) => {
    paginate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box mt={4} gridColumn="span 2" textAlign="center">
      <Button
        variant="outline"
        color="#ba9ffb"
        borderColor="#ba9ffb"
        mx={2}
        onClick={() => {
          if (currentPage > 1) {
            handlePaginationClick(currentPage - 1);
          }
        }}
        disabled={currentPage === 1}
      >
        <BiSolidLeftArrow />
      </Button>
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        const startRange = Math.max(1, currentPage - 2);
        const endRange = Math.min(startRange + 4, totalPages);

        if (page >= startRange && page <= endRange) {
          return (
            <Button
              key={page}
              variant="outline"
              mx={2}
              onClick={() => handlePaginationClick(page)}
              color={currentPage === page ? "#ba9ffb" : "gray.500"}
              borderColor={currentPage === page ? "#ba9ffb" : "gray.500"}
            >
              {page}
            </Button>
          );
        }
      })}
      <Button
        variant="outline"
        color="#ba9ffb"
        borderColor="#ba9ffb"
        mx={2}
        onClick={() => {
          if (currentPage < totalPages) {
            handlePaginationClick(currentPage + 1);
          }
        }}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        <BiSolidRightArrow />
      </Button>
    </Box>
  );
};

export default Pagination;
