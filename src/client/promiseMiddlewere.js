import { createAction, createActions } from 'redux-actions'

import * as Cache from './utils/cache'
import { isCancel } from './utils/agent'

export default ({ dispatch, getState }) => next => action => {
  let {
      type,
      payload: actionPayload,
      meta = {}
    } = action,
    resultData,
    cacheKey

  if (!meta.promise) {
    // Normal action: pass it on
    return next(action)
  }

  const
    promise = meta.promise,
    cache = meta.cache,
    types = [`${type}_START`, `${type}_DONE`, `${type}_ERROR`]

  if (cache) {
    cacheKey = Cache.createKey(type, actionPayload)
    resultData = Cache.get(cacheKey)

    if (resultData) {
      const cacheAction = createAction(`${type}_DONE`, payload => payload)
      next(cacheAction(resultData))
      return Promise.resolve(resultData)
    }
  }

  const [startType, doneType, errorType] = types,
    startAction = createAction(startType, payload => payload),
    doneAction = createAction(doneType, data => data),
    errorAction = createAction(errorType, (data, status) => ({ data, status }))

  next(startAction(actionPayload))

  return promise(actionPayload, meta.cancelToken)
    .then(
      response => {
        resultData = response.data

        if (cache) {
          Cache.set(cacheKey, resultData)
        }

        next(doneAction(resultData))

        return resultData
      },
      error => {
        let toReturn = null
        if (isCancel(error)) {
          // do nothing now...
          // console.log('Request canceled', error.message)
        } else {
          // something is wrong...
          next(errorAction(error.response.data, error.response.status))
          toReturn = Promise.reject(error.response)
        }

        return toReturn
      }
    )
}
