import { handleActions } from 'redux-actions'

const initialState = {
  status: 'init',
  payload: null,
}

export default handleActions({
  LOAD_CONFIG_START: (state, action) => ({
    ...state, status: 'start'
  }),
  LOAD_CONFIG_DONE: (state, action) => ({
    ...state, status: 'done', payload: action.payload
  }),
  LOAD_CONFIG_ERROR: (state, action) => ({
    ...state, status: 'error'
  })
}, initialState)
