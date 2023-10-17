import {
  LOGIN,
  LOGOUT,
  LOAD_USER,
  UPDATE_AUTH_STATE,
  UPDATE_USER_FOLLOWINGS,
  LOADING,
} from "../actions/actionVariables";

const initialState = {
  token: null,
  user: null,
  loggedIn: null,
  loading: true,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      return {
        ...state,
        token: payload.token,
        user: payload.user,
      };
    case LOAD_USER:
      return {
        ...state,
        token: payload.token,
        user: payload.user,
      };
    case UPDATE_AUTH_STATE:
      return {
        ...state,
        loggedIn: payload,
      };

    case LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
        loggedIn: null,
      };
    case UPDATE_USER_FOLLOWINGS:
      return {
        ...state,
        user: { ...state.user, following: payload },
      };
    case LOADING:
      return {
        ...state,
        loading: payload,
      };

    default:
      return state;
  }
};

export default authReducer;
