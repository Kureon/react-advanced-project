import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box, Container } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Box>
      <Container maxW="xxl">
        <Navigation />
        <Outlet />
      </Container>
    </Box>
  );
};
