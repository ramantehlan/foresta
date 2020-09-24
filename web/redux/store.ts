import { createStore } from "redux"
import rootReducer from "./reducers"
import {MakeStore, createWrapper, Context} from 'next-redux-wrapper';

export interface State {
  score: number
}

export const initialState = {
  score: 0 
}


const makeStore: MakeStore<State> = (context: Context) => createStore(rootReducer, initialState)

export const wrapper = createWrapper<State>(makeStore, {debug: true});

