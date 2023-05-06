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
  Td,
  Tr,
  Tbody,
  Th,
  Thead,
  TableCaption,
  Table,
  TableContainer,
  Tfoot,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

const Library = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [searchBy, setSearchBy] = useState("");
  const [inputv, setInputv] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const [data, setData] = useState();
  const [loading, setLoding] = useState(true);

  const getCollection = async (id) => {
    let res = await axios.get(`https://movie-json.onrender.com/library`);
    setData(res.data);
    setLoding(false);
  };

  const deleteMovie = (id) => {
    let res = confirm(`Are you sure you want to delete`);
    if (res) {
      let responce = axios.delete(
        `https://movie-json.onrender.com/library/${id}`
      );
      responce
        .then((r) => {
          if (r.status === 200 || r.status === 201) {
            toast({
              title: "Movie deleted successfully",
              description: "movie removed from your library",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            getCollection();
          } else {
            toast({
              title: "error",
              description: "Error while deleting",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        })
        .catch((e) => {
          toast({
            title: "error",
            description: "Error while deleting",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  if (loading) {
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

  // if (store?.state?.length < 1) {
  //   return (
  //     <Box
  //       minH={"100vh"}
  //       backgroundImage={
  //         "https://images.unsplash.com/photo-1535446937720-e4cad0145efe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bW92aWVzJTIwcG9zdGVyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60"
  //       }
  //       p="10px 30px"
  //     >
  //       {" "}
  //       <Button m="5px" onClick={resetFilters} colorScheme="teal">
  //         Reset Filters
  //       </Button>
  //       <Center mt="50px" display={"flex"} flexDir={"column"} gap={6}>
  //         <Heading color={"red"}>Your search did not match any record</Heading>{" "}
  //         <Img
  //           h="400px"
  //           src="https://images.unsplash.com/photo-1609743522653-52354461eb27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bm90JTIwZm91bmR8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60"
  //         />
  //       </Center>
  //     </Box>
  //   );
  // }

  return (
    <Box
      minH={"100vh"}
      // bgColor={"white.100"}
      backgroundImage={
        "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHdoaXRlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60"
      }
      p="10px 30px"
    >
      <Button m="5px" ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Filters
      </Button>

      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Sr.No</Th>
              <Th>Image</Th>
              <Th>Title</Th>
              <Th>Director</Th>
              <Th>Year</Th>
              <Th>Genre</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((el, index) => {
              return (
                <Tr key={el.id}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <Img
                      onClick={() => seeMovie(el.id)}
                      borderRadius={"10%"}
                      h="60px"
                      w="100px"
                      src={el.posterUrl}
                      alt={"Image url expired"}
                    />
                  </Td>

                  <Td>{el.title}</Td>
                  <Td> {el.director}</Td>
                  <Td> {el.year}</Td>
                  <Td> {el.genres.join(", ")}</Td>

                  <Td>
                    <Button variant={"outline"} colorScheme="blue">
                      Edit
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      onClick={() => deleteMovie(el.id)}
                      variant={"outline"}
                      colorScheme="blue"
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
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
            {/* <Button onClick={handelClick}>Search</Button> */}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            {/* <Button colorScheme="blue" onClick={resetFilters}>
              Reset Filters
            </Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Library;
