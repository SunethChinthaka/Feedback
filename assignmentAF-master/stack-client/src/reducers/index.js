//root reducer for combine all the reducers
import { combineReducers } from "redux";
import { comment } from "./comment";

export const reducers = combineReducers({
    comment
})