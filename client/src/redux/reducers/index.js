import { combineReducers } from "redux";
import authReducer from "./auth";
import postReducer from "./posts";
import otherUserReducer from "./otherUser";
// import commentReducer from "./comments";

export const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  otherUser: otherUserReducer,
  // comment: commentReducer,
});
