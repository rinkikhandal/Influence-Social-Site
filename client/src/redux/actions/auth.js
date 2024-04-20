import axiosInstance from "../../utils/axios";
import {
  LOGIN,
  LOGOUT,
  LOAD_USER,
  UPDATE_AUTH_STATE,
  LOADING,
  GET_POSTS,
} from "./actionVariables";

export const loginUser = (data) => {
  return async (dispatch) => {
    try {
      // console.log("logging in...");
      const res = await axiosInstance.post("/auth/login", data);
      let { token, user } = await res.data;

      localStorage.setItem("token", token);

      axiosInstance.defaults.headers = {
        Authorization: `Bearer ${token}`,
      };
      dispatch({
        type: UPDATE_AUTH_STATE,
        payload: true,
      });
      dispatch({
        type: LOGIN,
        payload: { token, user },
      });
    } catch (error) {
      dispatch({ type: UPDATE_AUTH_STATE, payload: false });
    } finally {
      dispatch({ type: LOADING, payload: false });
    }
  };
};

export const signInUser = (data) => {
  return async (dispatch) => {
    try {
      // console.log("signing in...");
      const res = await axiosInstance.post("/auth/signup", data);
      // console.log(res);
      const { password } = data;

      const { email } = res.data;

      dispatch(loginUser({ email, password }));
    } catch (error) {
      // console.log("Sign-up error:", error);
      dispatch({ type: UPDATE_AUTH_STATE, payload: false });
    } finally {
      dispatch({ type: LOADING, payload: false });
    }
  };
};

export const loadUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch({
        type: UPDATE_AUTH_STATE,
        payload: false,
      });
      return;
    }
    // validating user ======
    const res = await axiosInstance.get(`/auth/validate/${token}`);
    const { user } = res.data;

    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    dispatch({
      type: UPDATE_AUTH_STATE,
      payload: true,
    });

    dispatch({
      type: LOAD_USER,
      payload: { user, token },
    });
    // ===getting all posts=====
    const resPost = await axiosInstance("/posts");
    dispatch({
      type: GET_POSTS,
      payload: resPost.data,
    });
  } catch (error) {
    localStorage.removeItem("token");
    dispatch({ type: UPDATE_AUTH_STATE, payload: false });

    // console.log("Load user error:", error);
  } finally {
    dispatch({ type: LOADING, payload: false });
  }
};

export const logoutUser = () => {
  return async (dispatch) => {
    localStorage.removeItem("token");
    dispatch({ type: UPDATE_AUTH_STATE, payload: false });
    dispatch({ type: LOGOUT });
  };
};
