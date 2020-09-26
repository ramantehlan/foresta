import { createStore, applyMiddleware, compose } from "redux"
import rootReducer from "./reducers"
import {MakeStore, createWrapper, Context} from 'next-redux-wrapper';
import {devToolsEnhancer} from "remote-redux-devtools"

export interface State {
  username: string,
  score: number
}

export const initialState = {
  username: "",
  score: 0 
}


const makeStore: MakeStore<State> = (context: Context) => createStore(rootReducer, initialState)

export const wrapper = createWrapper<State>(makeStore, {debug: true});

