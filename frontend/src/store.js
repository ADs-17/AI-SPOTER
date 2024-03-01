import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  toolCreateReducer,
  toolDeleteReducer,
  toolDetailsReducer,
  toolListReducer,
  toolReviewCreateReducer,
  toolUpdateReducer,
} from "./reducers/toolReducer";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducer";
import {
  blogCreateReducer,
  blogDeleteReducer,
  blogDetailsReducer,
  blogListReducer,
  blogReviewCreateReducer,
  blogUpdateReducer,
} from "./reducers/blogReducer";
import { favouriteReducer } from "./reducers/favouriteReducer";

const reducer = combineReducers({
  favourite: favouriteReducer,
  toolList: toolListReducer,
  toolDetails: toolDetailsReducer,
  toolDelete: toolDeleteReducer,
  toolCreate: toolCreateReducer,
  toolUpdate: toolUpdateReducer,
  toolReviewCreate: toolReviewCreateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  blogList: blogListReducer,
  blogDetails: blogDetailsReducer,
  blogDelete: blogDeleteReducer,
  blogCreate: blogCreateReducer,
  blogUpdate: blogUpdateReducer,
  blogReviewCreate: blogReviewCreateReducer,
});

const favouriteToolsFromStorage = localStorage.getItem("favouriteTools")
  ? JSON.parse(localStorage.getItem("favouriteTools"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// const shippingAddressFromStorage = localStorage.getItem("")
//   ? JSON.parse(localStorage.getItem(""))
//   : {};

// const paymentMethodFromStorage = localStorage.getItem("")
//   ? JSON.parse(localStorage.getItem(""))
//   : "";

const initialState = {
  favourite: {
    favouriteTools: favouriteToolsFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
