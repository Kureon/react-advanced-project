import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@chakra-ui/react";

export const Navigation = () => {
  const location = useLocation();

  const isNotHomePage = location.pathname !== "/";

  return (
    <nav>
      {isNotHomePage && (
        <Button mt="2" mb="2">
          <Link to="/">&larr; Events</Link>
        </Button>
      )}
    </nav>
  );
};
