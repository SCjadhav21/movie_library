import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Movie from "../page/movie";
import SingleMovie from "../page/singleMovie";
import Library from "../page/Library";

const AllRoutes = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Movie />} />
        <Route path="/:id" element={<SingleMovie />} />
        <Route path="/collection" element={<Library />} />
      </Routes>
    </Box>
  );
};

export default AllRoutes;
