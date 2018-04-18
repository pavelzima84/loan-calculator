import { createActions } from 'redux-actions'

import { calculatePromise, loadConfigPromise } from '../utils/agent'

<<<<<<< HEAD
export const { calculation: { set, calculate, loadConfig } } = createActions({
  CALCULATION: {
    SET: (payload) => payload,
    CALCULATE: [
      (payload) => payload,
      (payload, meta = { promise: calculatePromise, cache: true }) => meta
    ],
    LOAD_CONFIG: [
      (payload) => null,
      (payload, meta = { promise: loadConfigPromise, cache: true }) => meta
    ]
  }
=======
export const { calculate, loadConfig } = createActions({
  CALCULATE: payload => ({ data: payload, promise: calculatePromise, cache: true }),
  LOAD_CONFIG: payload => ({ data: payload, promise: loadConfigPromise, cache: true, delay: 100 })
>>>>>>> d11d39491303890c54f8ab13e2720120bbd9555d
})
