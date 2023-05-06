import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  Img,
  Skeleton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

const SingleMovie = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();

  const [data, setData] = useState();
  const [loading, setLoding] = useState(true);

  const getMovie = async (id) => {
    let res = await axios.get(`https://movie-json.onrender.com/movies/${id}`);
    setData(res.data);
    setLoding(false);
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

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getMovie(id);
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
  return (
    <Center
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}
      bgImage={
        "https://images.unsplash.com/photo-1683123852097-c09667eef231?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNTZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
      }
      display={"flex"}
      flexDir={"column"}
      gap={5}
      p={10}
    >
      <Button w="full" onClick={goBack}>
        Go Back
      </Button>
      <Box
        borderRadius={"10%"}
        bgColor={"red.300"}
        color={"white"}
        p="18px"
        boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
        display={"flex"}
        flexDirection="column"
        justifyContent={"space-evenly"}
        justifyItems={"center"}
        w="50%"
        gap={3}
      >
        <Center>
          {" "}
          <Img
            borderRadius={"10%"}
            h="300px"
            w="300px"
            src={data?.posterUrl}
            alt={data?.title}
          />
        </Center>
        <Center>
          {" "}
          <Text
            borderBottom={"1px solid black"}
            fontWeight={"bold"}
            fontSize={"25px"}
          >
            Title: {data?.title}
          </Text>
        </Center>
        <Box p="5px 20px">
          <Text fontSize={"20px"}>Director: {data?.director}</Text>
          <Text fontSize={"20px"}>Year: {data?.year}</Text>
          <Text fontSize={"20px"}>
            Ratings: {Math.floor(Math.random() * 5) + 1} / 5
          </Text>
          <Text fontSize={"20px"}>Cast: {data?.actors}</Text>
          <Text fontSize={"20px"}>Runtime: {data?.runtime} days</Text>
          <Text fontSize={"20px"}>Genre: {data?.genres.join(", ")}</Text>
          <Text fontSize={"20px"}>Synopsis: {data?.plot}</Text>
        </Box>
        <Center>
          {" "}
          <Button
            w="80%"
            variant={"outline"}
            fontWeight={"bold"}
            bgColor={"green"}
            color={"#fff"}
            onClick={() => postMovie(data)}
          >
            Save movie
          </Button>
        </Center>
      </Box>
    </Center>
  );
};

export default SingleMovie;
