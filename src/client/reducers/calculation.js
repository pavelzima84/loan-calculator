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
<<<<<<< HEAD
  // async load config
  'CALCULATION/LOAD_CONFIG_START': (state, action) => ({
    ...state, config: { status: 'start'}
  }),
  'CALCULATION/LOAD_CONFIG_DONE': (state, action) => ({
=======
  LOAD_CONFIG_START: (state, action) => ({
    ...state, config: { status: 'start'}
  }),
  LOAD_CONFIG_DONE: (state, action) => ({
>>>>>>> d11d39491303890c54f8ab13e2720120bbd9555d
      ...state,
      config: {
        status: 'done',
        payload: action.payload
<<<<<<< HEAD
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
=======
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
>>>>>>> d11d39491303890c54f8ab13e2720120bbd9555d
    },
    amount: action.payload.amount,
    term: action.payload.term
  }),
<<<<<<< HEAD

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
=======
  CALCULATE_DONE: (state, action) => ({
    ...state, result: { status: 'done', payload: action.payload }
  }),
  CALCULATE_ERROR: (state, action) => ({
>>>>>>> d11d39491303890c54f8ab13e2720120bbd9555d
    ...state, result: { status: 'error' }
  })
}, initialState)
