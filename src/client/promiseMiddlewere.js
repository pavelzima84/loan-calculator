import { createAction, createActions } from 'redux-actions'

import * as Cache from './utils/cache'

export default ({ dispatch, getState }) => {
  return next => action => {
    let {
        type,
        payload,
        meta = {}
      } = action,
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
      cacheKey = Cache.createKey(type, payload)
      const resultData = Cache.get(cacheKey)

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

    next(startAction(payload))

    return promise(payload).then(
      response => {
        const resultData = response.data

        if (cache) {
          Cache.set(cacheKey, resultData)
        }

        next(doneAction(resultData))

        return resultData
      },
      error => {
        next(errorAction(error.response.data, error.response.status))
        return Promise.reject(error.response)
      }
    )
  }
}