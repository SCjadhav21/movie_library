import { Box, Button, Center, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box
      position="sticky"
      top={0}
      w="100%"
      zIndex={10}
      bgImage={
        "https://images.unsplash.com/photo-1527467779599-34448b3fa6a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bm90JTIwZm91bmR8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60"
      }
      p="10px 30px"
      display={"flex"}
      justifyContent={"space-between"}
    >
      <Text
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize="4xl"
        fontWeight="bold"
      >
        SJ Movies
      </Text>
      <Center>
        {" "}
        <Box
          display={"flex"}
          gap={7}
          fontSize={"22px"}
          p="0px 30px"
          justifyContent={"space-between"}
        >
          <Button variant={"outline"} color="blue">
            <Link to="/">Home</Link>
          </Button>
          <Button variant={"outline"} color="blue">
            <Link to="/collection">Library</Link>
          </Button>
        </Box>
      </Center>
    </Box>
  );
};

export default Navbar;
