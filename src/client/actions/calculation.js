import { calculatePromise } from '../utils/agent'
import { createActions } from 'redux-actions'
// import { push } from 'react-router-redux'

export const { calculate } = createActions({
  CALCULATE: payload => ({ data: payload, promise: calculatePromise })
})
