import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import users from "./users";
import menu from "./menu";

const rootReducer = combineReducers({
  users,
  menu
});
const index = createStore(rootReducer, applyMiddleware(thunk, logger));

export default index;
