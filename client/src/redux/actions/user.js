import axiosInstance from "../../utils/axios";
import {
  GET_OTHER_USER,
  GET_OTHER_USER_FOLLOWERS,
  GET_OTHER_USER_FOLLOWINGS,
  UPDATE_USER_FOLLOWINGS,
} from "./actionVariables";

export const followUser = (userToFollowId) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(`/user/follow/${userToFollowId}`);
    dispatch({
      type: UPDATE_USER_FOLLOWINGS,
      payload: res.data.mainUserFollowings,
    });
  } catch (error) {
    console.log(error);
  }
};

export const unFollowUser = (userToUnFollowId) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(`/user/unfollow/${userToUnFollowId}`);
    dispatch({
      type: UPDATE_USER_FOLLOWINGS,
      payload: res.data.mainUserFollowings,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = (userId) => async (dispatch) => {
  try {
    const resUser = await axiosInstance.get(`/user/${userId}`);
    dispatch({ type: GET_OTHER_USER, payload: resUser.data });
  } catch (error) {
    console.log(error);
  }
};

export const getFollowers = (userId) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/user/followers/${userId}`);
    dispatch({ type: GET_OTHER_USER_FOLLOWERS, payload: res.data.followers });
  } catch (error) {
    console.log(error);
  }
};

export const getFollowings = (userId) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/user/followings/${userId}`);
    dispatch({ type: GET_OTHER_USER_FOLLOWINGS, payload: res.data.followings });
  } catch (error) {
    console.log(error);
  }
};
