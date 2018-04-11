import { loadConfigPromise } from '../utils/agent'
import { createActions } from 'redux-actions'
import { push } from 'react-router-redux'

export const { loadConfig } = createActions({
  LOAD_CONFIG: payload => ({ data: payload, promise: loadConfigPromise })
})
