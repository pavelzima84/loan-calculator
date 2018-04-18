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
  // async load config
  'CALCULATION/LOAD_CONFIG_START': (state, action) => ({
    ...state, config: { status: 'start' }
  }),
  'CALCULATION/LOAD_CONFIG_DONE': (state, action) => ({
    ...state,
    config: {
      status: 'done',
      payload: action.payload
    }
  }),
  'CALCULATION/LOAD_CONFIG_ERROR': (state, action) => ({
    ...state, config: { status: 'error' }
  }),

  // sync set
  'CALCULATION/SET': (state, action) => ({
    ...state,
    result: {
      status: 'invalid'
    },
    amount: action.payload.amount,
    term: action.payload.term
  }),

  // async calculate
  'CALCULATION/CALCULATE_START': (state, action) => ({
    ...state,
    result: {
      status: 'start'
    }
  }),
  'CALCULATION/CALCULATE_DONE': (state, action) => ({
    ...state, result: { status: 'done', payload: action.payload }
  }),
  'CALCULATION/CALCULATE_ERROR': (state, action) => ({
    ...state, result: { status: 'error' }
  })
}, initialState)
