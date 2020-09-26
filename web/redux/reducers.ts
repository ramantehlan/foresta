import {combineReducers} from "redux"
import * as actions from "./actions"

export const scoreReducer = (state = 0, action) => {
  switch(action.type) {
    case actions.INCREMENT_SCORE:
      return state + 10
    default:
      return state
  }
}

export const usernameReducer = (state = "", action) => {
  switch(action.type) {
    case actions.SET_USERNAME:
      return action.value
    default:
      return state;
  }
}

const rootReducer = combineReducers({
    username: usernameReducer,
    score: scoreReducer
});

export default rootReducer;

