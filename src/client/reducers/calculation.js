import { handleActions } from 'redux-actions'

const initialState = {
  config: {
    status: 'init',
    payload: null
  },
  result: {
    status: 'init',
    payload: null
  },
  amount: null,
  term: null
}

export default handleActions({
  LOAD_CONFIG_START: (state, action) => ({
    ...state, config: { status: 'start'}
  }),
  LOAD_CONFIG_DONE: (state, action) => ({
      ...state,
      config: {
        status: 'done',
        payload: action.payload
      },
      amount: action.payload.amountInterval.defaultValue,
      term: action.payload.termInterval.defaultValue
  }),
  LOAD_CONFIG_ERROR: (state, action) => ({
    ...state, config: { status: 'error' }
  }),

  CALCULATE_START: (state, action) => ({
    ...state,
    result: {
      status: 'start'
    },
    amount: action.payload.amount,
    term: action.payload.term
  }),
  CALCULATE_DONE: (state, action) => ({
    ...state, result: { status: 'done', payload: action.payload }
  }),
  CALCULATE_ERROR: (state, action) => ({
    ...state, result: { status: 'error' }
  })
}, initialState)
