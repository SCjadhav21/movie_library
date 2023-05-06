import { Error_Set, Loading_Set, Product_Get } from "./types";

let initialState = {
  data: [],
  loading: false,
  error: false,
};

export const ProductReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Product_Get: {
      return {
        state: payload,
        loading: false,
        error: false,
      };
    }
    case Loading_Set: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case Error_Set: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    default: {
      return state;
    }
  }
};
