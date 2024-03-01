import {
  FAVOURITE_ADD_ITEM,
  FAVOURITE_REMOVE_ITEM,
} from "../constants/favouriteConstants";

export const favouriteReducer = (state = { favouriteTools: [] }, action) => {
  switch (action.type) {
    case FAVOURITE_ADD_ITEM:
      const item = action.payload;
      const existsItem = state.favouriteTools.find((i) => i.tool === item.tool);

      if (existsItem) {
        return {
          ...state,
          favouriteTools: state.favouriteTools.map((i) =>
            i.tool === existsItem.tool ? item : i
          ),
        };
      } else {
        return { ...state, favouriteTools: [...state.favouriteTools, item] };
      }
    case FAVOURITE_REMOVE_ITEM:
      return {
        ...state,
        favouriteTools: state.favouriteTools.filter(
          (i) => i.tool !== action.payload
        ),
      };
    default:
      return state;
  }
};
