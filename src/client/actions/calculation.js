import { createActions } from 'redux-actions'

import { calculatePromise, loadConfigPromise } from '../utils/agent'

export const { calculate, loadConfig } = createActions({
  CALCULATE: payload => ({ data: payload, promise: calculatePromise, cache: true }),
  LOAD_CONFIG: payload => ({ data: payload, promise: loadConfigPromise, cache: true, delay: 100 })
})
