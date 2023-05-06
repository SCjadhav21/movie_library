import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const EditMovie = ({ data, getData, setEdit }) => {
  const [movie, setmovie] = useState({
    posterUrl: data.posterUrl,
    title: data.title,
    director: data.director,
    year: data.year,
  });

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handelChange = (e) => {
    const { name, value } = e.target;

    setmovie({ ...movie, [name]: value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    let res = axios.patch(
      `https://movie-json.onrender.com/library/${data.id}`,
      movie
    );

    res
      .then((r) => {
        console.log(r);
        if (r.status === 200 || r.status === 201) {
          toast({
            title: "Movie Updated",
            description: "movie Edit successfully",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setEdit(false);
          getData();
        } else {
          toast({
            title: "Error",
            description: "Error while Updating",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((e) => {
        console.error(e);
        toast({
          title: "Error",
          description: "Error while Updating",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    onOpen();
  }, []);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setEdit(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{data.title} Movie</ModalHeader>
          <ModalCloseButton onClick={() => setEdit(false)} />
          <ModalBody>
            <form onSubmit={handelSubmit} action="">
              <FormLabel>Title</FormLabel>
              <Input
                isRequired
                name="title"
                type="text"
                onChange={handelChange}
                value={movie.title}
              />
              <FormLabel>Image Url</FormLabel>
              <Input
                isRequired
                name="posterUrl"
                type="url"
                onChange={handelChange}
                value={movie.posterUrl}
              />
              <FormLabel>Director</FormLabel>
              <Input
                isRequired
                name="director"
                onChange={handelChange}
                type="text"
                value={movie.director}
              />
              <FormLabel>Year</FormLabel>
              <Input
                isRequired
                name="year"
                onChange={handelChange}
                type="number"
                value={movie.year}
              />
              <FormLabel></FormLabel>
              <Button
                // m="10px"
                w="100%"
                variant="outline"
                colorScheme="red"
                type="submit"
              >
                Edit Movie
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
                setEdit(false);
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditMovie;
