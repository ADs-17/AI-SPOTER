import {
  TOOL_CREATE_FAIL,
  TOOL_CREATE_REQUEST,
  TOOL_CREATE_RESET,
  TOOL_CREATE_SUCCESS,
  TOOL_DELETE_FAIL,
  TOOL_DELETE_REQUEST,
  TOOL_DELETE_SUCCESS,
  TOOL_DETAILS_FAIL,
  TOOL_DETAILS_REQUEST,
  TOOL_DETAILS_SUCCESS,
  TOOL_LIST_FAIL,
  TOOL_LIST_REQUEST,
  TOOL_LIST_SUCCESS,
  TOOL_REVIEW_CREATE_FAIL,
  TOOL_REVIEW_CREATE_REQUEST,
  TOOL_REVIEW_CREATE_RESET,
  TOOL_REVIEW_CREATE_SUCCESS,
  TOOL_UPDATE_FAIL,
  TOOL_UPDATE_REQUEST,
  TOOL_UPDATE_RESET,
  TOOL_UPDATE_SUCCESS,
} from "../constants/toolConstants";

export const toolListReducer = (state = { tools: [] }, action) => {
  switch (action.type) {
    case TOOL_LIST_REQUEST:
      return { loading: true, tools: [] };
    case TOOL_LIST_SUCCESS:
      return { loading: false, tools: action.payload };
    case TOOL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const toolDetailsReducer = (
  state = { tool: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case TOOL_DETAILS_REQUEST:
      return { ...state, loading: true };
    case TOOL_DETAILS_SUCCESS:
      return { loading: false, tool: action.payload };
    case TOOL_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const toolDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TOOL_DELETE_REQUEST:
      return { loading: true };
    case TOOL_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TOOL_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const toolCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TOOL_CREATE_REQUEST:
      return { loading: true };
    case TOOL_CREATE_SUCCESS:
      return { loading: false, success: true, tool: action.payload };
    case TOOL_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TOOL_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const toolUpdateReducer = (state = { tool: {} }, action) => {
  switch (action.type) {
    case TOOL_UPDATE_REQUEST:
      return { ...state, loading: true };
    case TOOL_UPDATE_SUCCESS:
      return { loading: false, success: true, tool: action.payload };
    case TOOL_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TOOL_UPDATE_RESET:
      return { tool: {} };
    default:
      return state;
  }
};

export const toolReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TOOL_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case TOOL_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true };
    case TOOL_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TOOL_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
