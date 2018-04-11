import { handleActions } from 'redux-actions'

const initialState = {
  status: 'init',
  payload: {},
  amount: null,
  term: null
}

export default handleActions({
  CALCULATE_START: (state, action) => ({
    ...state, status: 'start', amount: action.payload.amount, term: action.payload.term
  }),
  CALCULATE_DONE: (state, action) => ({
    ...state, status: 'done', payload: action.payload
  }),
  CALCULATE_ERROR: (state, action) => ({
    ...state, status: 'error'
  })
}, initialState)
