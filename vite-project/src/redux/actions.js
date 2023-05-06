import { Error_Set, Loading_Set, Product_Get } from "./types";

import axios from "axios";

export const getMovie = (searchBy, inputv) => async (dispatch) => {
  dispatch({ type: Loading_Set });

  try {
    let res;
    if (searchBy && inputv) {
      res = await axios.get(
        `https://movie-json.onrender.com/movies?${searchBy}=${inputv}`
      );
    } else if (searchBy == "" && inputv) {
      res = await axios.get(
        `https://movie-json.onrender.com/movies?q=${inputv}`
      );
    } else {
      res = await axios.get(`https://movie-json.onrender.com/movies`);
    }

    dispatch({ type: Product_Get, payload: res.data });
  } catch {
    dispatch({ type: Error_Set });
  }
};
