// Action Types
export const INCREMENT_SCORE = "INCREMENT_SCORE"
export const SET_USERNAME = "SET_USERNAME"

// ACTION CREATOR
export const incrementScore = () => ({
  type: INCREMENT_SCORE
})

export const setUsername = (text) => ({
  type: SET_USERNAME,
  value: text
})

