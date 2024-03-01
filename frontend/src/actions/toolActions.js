import axios from "axios";

import {
  TOOL_CREATE_FAIL,
  TOOL_CREATE_REQUEST,
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
  TOOL_REVIEW_CREATE_SUCCESS,
  TOOL_UPDATE_FAIL,
  TOOL_UPDATE_REQUEST,
  TOOL_UPDATE_SUCCESS,
} from "../constants/toolConstants";

export const listTools = () => async (dispatch) => {
  try {
    dispatch({ type: TOOL_LIST_REQUEST });

    const { data } = await axios.get(`/api/tools`);

    dispatch({ type: TOOL_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: TOOL_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listToolDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TOOL_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/tools/${id}`);

    dispatch({ type: TOOL_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: TOOL_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteTool = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TOOL_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/tools/${id}`, config);

    dispatch({ type: TOOL_DELETE_SUCCESS });
  } catch (err) {
    dispatch({
      type: TOOL_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createTool = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TOOL_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/tools`, {}, config);

    dispatch({ type: TOOL_CREATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: TOOL_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateTool = (tool) => async (dispatch, getState) => {
  try {
    dispatch({ type: TOOL_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/tools/${tool._id}`, tool, config);

    dispatch({ type: TOOL_UPDATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: TOOL_UPDATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createToolReview =
  (toolId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: TOOL_REVIEW_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/tools/${toolId}/reviews`,
        review,
        config
      );

      dispatch({ type: TOOL_REVIEW_CREATE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: TOOL_REVIEW_CREATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
