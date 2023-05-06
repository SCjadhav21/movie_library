import React, { useEffect, useState } from "react";

import {
  Box,
  Img,
  Button,
  Input,
  Select,
  SimpleGrid,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Stack,
  Skeleton,
  Heading,
  Center,
  useToast,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovie } from "../redux/actions";
import axios from "axios";

const Movie = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [searchBy, setSearchBy] = useState("");
  const [inputv, setInputv] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const handelClick = () => {
    dispatch(getMovie(searchBy, inputv));
    onClose();
  };

  const postMovie = (el) => {
    let res = axios.post("https://movie-json.onrender.com/library", el);
    res
      .then((r) => {
        if (r.status === 200 || r.status === 201) {
          toast({
            title: "Movie added successfully",
            description: "movie added into your library",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Movie alredy added to library",
            description: "alredy existed",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((e) => {
        toast({
          title: "Movie alredy added to library",
          description: "alredy existed",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.log(e);
      });
  };

  const seeMovie = (id) => {
    navigate(`/${id}`);
  };
  const resetFilters = () => {
    dispatch(getMovie());
    onClose();
    setSearchBy("");
    setInputv("");
  };
  useEffect(() => {
    dispatch(getMovie());
  }, []);

  if (store.loading) {
    return (
      <Stack mt="10%">
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  }

  if (store?.state?.length < 1) {
    return (
      <Box
        minH={"100vh"}
        backgroundImage={
          "https://images.unsplash.com/photo-1535446937720-e4cad0145efe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bW92aWVzJTIwcG9zdGVyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60"
        }
        p="10px 30px"
      >
        {" "}
        <Button m="5px" onClick={resetFilters} colorScheme="teal">
          Reset Filters
        </Button>
        <Center mt="50px" display={"flex"} flexDir={"column"} gap={6}>
          <Heading color={"red"}>Your search did not match any record</Heading>{" "}
          <Img
            h="400px"
            src="https://images.unsplash.com/photo-1609743522653-52354461eb27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bm90JTIwZm91bmR8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60"
          />
        </Center>
      </Box>
    );
  }

  return (
    <Box
      minH={"100vh"}
      backgroundImage={
        "https://images.unsplash.com/photo-1535446937720-e4cad0145efe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bW92aWVzJTIwcG9zdGVyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60"
      }
      p="10px 30px"
    >
      <Button m="5px" ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Filters
      </Button>

      <SimpleGrid
        columns={[1, 2, 3, 4]}
        gap={8}
        justifyContent={"space-evenly"}
      >
        {store?.state?.map((el) => {
          return (
            <Box
              borderRadius={"5%"}
              bgColor={"#fff"}
              p="18px"
              boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
              key={el.id}
              display={"flex"}
              flexDirection="column"
              justifyContent={"space-evenly"}
              justifyItems={"center"}
              w="100%"
              gap={3}
              cursor={"pointer"}
            >
              <Img
                onClick={() => seeMovie(el.id)}
                borderRadius={"10%"}
                h="300px"
                w="300px"
                src={el.posterUrl}
                alt={"Image url expired"}
              />
              <Box onClick={() => seeMovie(el.id)}>
                <Text fontWeight={"bold"} fontSize={"25px"}>
                  Title: {el.title}
                </Text>
                <Text fontSize={"20px"}>Director: {el.director}</Text>
                <Text fontSize={"20px"}>Year: {el.year}</Text>
                <Text fontSize={"20px"}>Genre: {el.genres.join(", ")}</Text>
              </Box>
              <Button onClick={() => postMovie(el)}>Save movie</Button>
            </Box>
          );
        })}
      </SimpleGrid>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search What You Want</DrawerHeader>

          <DrawerBody display={"flex"} flexDir={"column"} gap={5}>
            <Select
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
            >
              <option value="">Search by Keyword</option>
              <option value="title">Search by Title</option>
              <option value="director">Search by Director</option>
              <option value="year">Search by Year</option>
              <option value="genre">Search by Genre</option>
            </Select>
            <Input
              value={inputv}
              onChange={(e) => setInputv(e.target.value)}
              placeholder="search here"
            />
            <Button onClick={handelClick}>Search</Button>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={resetFilters}>
              Reset Filters
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Movie;
