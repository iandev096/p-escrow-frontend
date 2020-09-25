import React from "react";
import { Box } from "@chakra-ui/core";
import { Navbar } from "./nav/Navbar";
import { ScrollTopButton } from "./ScrollTopButton";

interface Props {}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Box backgroundColor="gray.100" minW="100%" minH="100vh" overflowX='hidden'>
      <Navbar />
      {children}
      <ScrollTopButton />
    </Box>
  );
};
