import {
  GET_OTHER_USER,
  GET_OTHER_USER_FOLLOWERS,
  GET_OTHER_USER_FOLLOWINGS,
  UPDATE_OTHER_USER_POST_LIKES,
} from "../actions/actionVariables";

const initialState = {
  otherUser: null,
  otherUserFollowers: null,
  otherUserFollowings: null,
};

const otherUserReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_OTHER_USER:
      return {
        ...state,
        otherUser: payload,
      };
    case UPDATE_OTHER_USER_POST_LIKES:
      return {
        ...state,
        otherUser: state.otherUser
          ? {
              ...state.otherUser,
              posts: state.otherUser.posts.map((post) =>
                post._id === payload.id
                  ? { ...post, likes: payload.likes }
                  : post
              ),
            }
          : null,
      };
    case GET_OTHER_USER_FOLLOWERS:
      return {
        ...state,
        otherUserFollowers: payload,
      };
    case GET_OTHER_USER_FOLLOWINGS:
      return {
        ...state,
        otherUserFollowings: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default otherUserReducer;
