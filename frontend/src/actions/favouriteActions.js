import axios from "axios";

import {
  FAVOURITE_ADD_ITEM,
  FAVOURITE_REMOVE_ITEM,
} from "../constants/favouriteConstants";

export const addToFavourite = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/tools/${id}`);

  dispatch({
    type: FAVOURITE_ADD_ITEM,
    payload: {
      tool: data._id,
      name: data.name,
      image: data.image,
      charges: data.charges,
      plan: data.plan,
      description: data.description,
      toolUrl: data.toolUrl,
      numReviews: data.numReviews,
      rating: data.rating,
    },
  });

  localStorage.setItem(
    "favouriteTools",
    JSON.stringify(getState().favourite.favouriteTools)
  );
};

export const removeFromFavourite = (id) => (dispatch, getState) => {
  dispatch({ type: FAVOURITE_REMOVE_ITEM, payload: id });

  localStorage.setItem(
    "favouriteTools",
    JSON.stringify(getState().favourite.favouriteTools)
  );
};
