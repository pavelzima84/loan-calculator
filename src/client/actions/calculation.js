import { createActions } from 'redux-actions'

import { calculatePromise, loadConfigPromise } from '../utils/agent'

export const { calculation: { set, calculate, loadConfig } } = createActions({
  CALCULATION: {
    SET: payload => payload,
    CALCULATE: [
      payload => payload,
      (payload, meta = {}) => ({ promise: calculatePromise, cache: true, ...meta })
    ],
    LOAD_CONFIG: [
      payload => null,
      (payload, meta = {}) => ({ promise: loadConfigPromise, cache: true, ...meta })
    ]
  }
})
