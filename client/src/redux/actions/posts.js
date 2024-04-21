import axiosInstance from "../../utils/axios";
import {
  GET_POSTS,
  UPDATE_LIKED_POSTS,
  UPDATE_OTHER_USER_POST_LIKES,
  UPDATE_USER_POSTS,
} from "./actionVariables";

export const fetchAllPosts = () => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance.get("/posts");
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const likePosts = (id) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/post/like/${id}`);
    dispatch({ type: UPDATE_LIKED_POSTS, payload: { id, likes: res.data } });
    dispatch({
      type: UPDATE_OTHER_USER_POST_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    console.log(error);
  }
};

export const unLikePosts = (id) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/post/unlike/${id}`);
    dispatch({ type: UPDATE_LIKED_POSTS, payload: { id, likes: res.data } });
    dispatch({
      type: UPDATE_OTHER_USER_POST_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserPosts = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/post`);
    dispatch({ type: UPDATE_USER_POSTS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
