import {
  GET_POSTS,
  UPDATE_LIKED_POSTS,
  UPDATE_POST,
  UPDATE_USER_POSTS,
} from "../actions/actionVariables";

const initialState = {
  allPosts: [],
  userPosts: [],
};

const postReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        allPosts: payload,
      };
    case UPDATE_LIKED_POSTS:
      return {
        ...state,
        allPosts: state.allPosts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
      };
    case UPDATE_POST:
      return {
        ...state,
        allPosts: state.allPosts.map((post) =>
          post._id === payload.id ? { ...post, ...payload.updatedPost } : post
        ),
      };
    case UPDATE_USER_POSTS:
      return {
        ...state,
        userPosts: payload,
      };

    default:
      return state;
  }
};

export default postReducer;
